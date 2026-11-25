import type { Map } from 'maplibre-gl';
import type { Camera, Scene } from 'three';

import { Matrix4, Raycaster } from 'three';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';

import '../../../../test/tailwind.css';
import { blockMapNetwork } from '../../../../test/map-network.ts';
import { useMapLibreThreeRaycast, useMapLibreThreeRenderer } from '../../three.ts';
import MapWithThree from './fixtures/MapWithThree.svelte';
import type { ThreeProbeState } from './fixtures/three-probe.ts';

const LOAD_TIMEOUT = { timeout: 10_000 };

const customLayers = (map: Map) =>
	map.getLayersOrder().filter((id) => map.getLayer(id)?.type === 'custom');

const renderThree = async (probes = 1) => {
	const onCreate = vi.fn<(map: Map) => void>();
	const onReady = vi.fn<(state: ThreeProbeState) => void>();
	const draw = vi.fn<(scene: Scene, camera: Camera) => void>();
	const screen = render(MapWithThree, {
		props: { rendering: true, probes, onCreate, onReady, render: draw }
	});
	await vi.waitFor(() => expect(onReady).toHaveBeenCalled(), LOAD_TIMEOUT);
	const [map] = onCreate.mock.calls[0];
	const [state] = onReady.mock.calls[0];
	return { screen, map, state, draw };
};

describe('the ./three entry', () => {
	it('exports the renderer and the raycast hooks', () => {
		expect(useMapLibreThreeRenderer).toBeTypeOf('function');
		expect(useMapLibreThreeRaycast).toBeTypeOf('function');
	});
});

describe('useMapLibreThreeRenderer', () => {
	beforeEach(() => {
		blockMapNetwork();
		vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('adds a custom layer and removes it when the caller unmounts', async () => {
		const { screen, map } = await renderThree();

		expect(customLayers(map)).toHaveLength(1);

		await screen.rerender({ rendering: false });

		expect(customLayers(map)).toEqual([]);
	});

	it('gives each caller its own layer', async () => {
		const { map } = await renderThree(2);

		await vi.waitFor(() => expect(customLayers(map)).toHaveLength(2));
	});

	it('adds its layer again after the map loads a new style', async () => {
		const { map } = await renderThree();
		const [layerId] = customLayers(map);

		map.setStyle({ version: 8, sources: {}, layers: [] }, { diff: false });

		await vi.waitFor(() => expect(customLayers(map)).toEqual([layerId]), LOAD_TIMEOUT);
	});

	it('calls render with the scene and a camera holding the map projection', async () => {
		const { state, draw } = await renderThree();

		await vi.waitFor(() => expect(draw).toHaveBeenCalled(), LOAD_TIMEOUT);

		expect(draw).toHaveBeenCalledWith(state.scene, state.camera);
		expect(state.camera.projectionMatrix.equals(new Matrix4())).toBe(false);
	});

	it('places a { lng, lat } object at its offset in meters from the map center', async () => {
		const { state, draw } = await renderThree();

		await vi.waitFor(() => expect(draw).toHaveBeenCalled(), LOAD_TIMEOUT);

		// 0.001 degrees east of a center on the equator, on maplibre-gl's sphere.
		expect(state.point.position.x).toBeCloseTo(-111.195, 2);
		expect(state.point.position.y).toBe(0);
		expect(state.point.position.z).toBeCloseTo(0, 6);
	});

	it('draws a line through a list of points', async () => {
		const { state, draw } = await renderThree();

		await vi.waitFor(() => expect(draw).toHaveBeenCalled(), LOAD_TIMEOUT);

		const positions = state.line.geometry.getAttribute('position');
		expect(positions.count).toBe(2);
		expect(positions.getX(0)).toBeCloseTo(0, 6);
		expect(positions.getX(1)).toBeCloseTo(-111.195, 2);
	});

	it('leaves an object without userData.lngLat where it is', async () => {
		const { state, draw } = await renderThree();

		await vi.waitFor(() => expect(draw).toHaveBeenCalled(), LOAD_TIMEOUT);

		expect(state.unplaced.position.toArray()).toEqual([7, 7, 7]);
	});
});

describe('useMapLibreThreeRaycast', () => {
	beforeEach(() => {
		blockMapNetwork();
		vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	const moveMouse = (map: Map, xFraction: number, yFraction: number) => {
		const canvas = map.getCanvas();
		const rect = canvas.getBoundingClientRect();
		canvas.dispatchEvent(
			new MouseEvent('mousemove', {
				bubbles: true,
				clientX: rect.left + rect.width * xFraction,
				clientY: rect.top + rect.height * yFraction
			})
		);
	};

	it('tracks the mouse over the map in normalized device coordinates', async () => {
		const { map, state } = await renderThree();

		moveMouse(map, 0.25, 0.25);

		expect(state.raycast.pointer.x).toBeCloseTo(-0.5, 1);
		expect(state.raycast.pointer.y).toBeCloseTo(0.5, 1);
	});

	it('aims a raycaster from the camera through the pointer', async () => {
		const { map, state, draw } = await renderThree();
		await vi.waitFor(() => expect(draw).toHaveBeenCalled(), LOAD_TIMEOUT);
		moveMouse(map, 0.5, 0.5);
		const raycaster = new Raycaster();

		state.raycast.compute(raycaster);

		expect(raycaster.ray.direction.length()).toBeCloseTo(1);
		expect(raycaster.ray.origin.toArray().every(Number.isFinite)).toBe(true);
		// The camera looks down at the map, so a ray through the center points down.
		expect(raycaster.ray.direction.y).toBeLessThan(0);
	});

	it('stops tracking once the caller unmounts', async () => {
		const { screen, map, state } = await renderThree();

		await screen.rerender({ rendering: false });
		moveMouse(map, 0.25, 0.25);

		expect(state.raycast.pointer.toArray()).toEqual([0, 0]);
	});
});
