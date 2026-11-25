import type { Map } from 'maplibre-gl';

import { LngLat } from 'maplibre-gl';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from 'vitest/browser';

import '../../../../test/tailwind.css';
import type { MapLibreContext } from '../useMapLibre.svelte.ts';
import EventProbe from './fixtures/EventProbe.svelte';
import MapWithEventProbe from './fixtures/MapWithEventProbe.svelte';
import BoundMap from './fixtures/BoundMap.svelte';
import MapWithProbe from './fixtures/MapWithProbe.svelte';
import OrphanProbe from './fixtures/OrphanProbe.svelte';
import { blockMapNetwork } from '../../../../test/map-network.ts';

const LOAD_TIMEOUT = { timeout: 10_000 };

const waitForContext = async (
	onContext: ReturnType<typeof vi.fn<(c: MapLibreContext) => void>>
) => {
	await vi.waitFor(() => expect(onContext).toHaveBeenCalled(), LOAD_TIMEOUT);
	const [context] = onContext.mock.calls[0];
	return context;
};

describe('useMapLibre', () => {
	beforeEach(() => {
		blockMapNetwork();
		vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('throws outside a <MapLibre>', () => {
		expect(() => render(OrphanProbe)).toThrow(
			'useMapLibre is a context sensitive hook that must be used inside a <MapLibre> component.'
		);
	});

	it('gives children the map and the props once the map loads', async () => {
		const onContext = vi.fn<(c: MapLibreContext) => void>();
		render(MapWithProbe, {
			props: { zoom: 4, center: new LngLat(10, 20), satellite: true, onContext }
		});

		const context = await waitForContext(onContext);

		expect(context.map.getZoom()).toBe(4);
		expect(context.zoom).toBe(4);
		expect(context.center.lng).toBeCloseTo(10);
		expect(context.mapProvider).toBe('open-street');
		expect(context.maxZoom).toBe(21);
		expect(context.apiKey).toBeUndefined();
		await expect.element(page.getByTestId('satellite')).toHaveTextContent('true');
	});

	it('follows the camera when the map moves', async () => {
		const onContext = vi.fn<(c: MapLibreContext) => void>();
		render(MapWithProbe, { props: { zoom: 4, onContext } });
		const context = await waitForContext(onContext);

		context.map.jumpTo({ center: [30, 10], zoom: 6 });

		await expect.element(page.getByTestId('zoom')).toHaveTextContent('6');
		await expect.element(page.getByTestId('lng')).toHaveTextContent('30');
	});

	it('follows a changed zoom prop', async () => {
		const onContext = vi.fn<(c: MapLibreContext) => void>();
		const screen = render(MapWithProbe, { props: { zoom: 4, onContext } });
		const context = await waitForContext(onContext);

		await screen.rerender({ zoom: 7 });

		await expect.element(page.getByTestId('zoom')).toHaveTextContent('7');
		expect(context.map.getZoom()).toBe(7);
	});

	it('reports the canvas size after a resize', async () => {
		const onContext = vi.fn<(c: MapLibreContext) => void>();
		render(MapWithProbe, { props: { onContext } });

		await waitForContext(onContext);

		await expect.element(page.getByTestId('width')).toHaveTextContent('400');
	});

	it('shows the OpenStreetMap satellite layer for a satellite prop', async () => {
		const onContext = vi.fn<(c: MapLibreContext) => void>();
		render(MapWithProbe, { props: { satellite: true, onContext } });
		const context = await waitForContext(onContext);

		expect(context.map.getLayoutProperty('satellite', 'visibility')).toBe('visible');
	});

	it('lets a child write satellite', async () => {
		const onContext = vi.fn<(c: MapLibreContext) => void>();
		render(MapWithProbe, { props: { onContext } });
		const context = await waitForContext(onContext);

		context.satellite = true;

		await expect.element(page.getByTestId('satellite')).toHaveTextContent('true');
	});
});

describe('MapLibre bindings', () => {
	const renderBound = async () => {
		const onCreate = vi.fn<(map: Map) => void>();
		const screen = render(BoundMap, { props: { onCreate } });
		await vi.waitFor(() => expect(onCreate).toHaveBeenCalled(), LOAD_TIMEOUT);
		const [map] = onCreate.mock.calls[0];
		return { screen, map };
	};

	beforeEach(() => {
		blockMapNetwork();
		vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('writes the camera back through bind:center and bind:zoom', async () => {
		const { map } = await renderBound();

		map.jumpTo({ center: [30, 10], zoom: 6 });

		await expect.element(page.getByTestId('bound-lng')).toHaveTextContent('30');
		await expect.element(page.getByTestId('bound-zoom')).toHaveTextContent('6');
	});

	it('moves the camera when the bound zoom changes', async () => {
		const { map } = await renderBound();

		await page.getByRole('button', { name: 'Zoom to 8' }).click();

		await vi.waitFor(() => expect(map.getZoom()).toBe(8));
	});

	it('writes a satellite control back through bind:satellite', async () => {
		await renderBound();

		await page.getByRole('checkbox', { name: 'Satellite' }).click();

		await expect.element(page.getByTestId('bound-satellite')).toHaveTextContent('true');
	});

	it('shows satellite imagery when the bound satellite changes', async () => {
		const { map } = await renderBound();

		await page.getByRole('button', { name: 'Show satellite' }).click();

		await vi.waitFor(() =>
			expect(map.getLayoutProperty('satellite', 'visibility')).toBe('visible')
		);
		await expect.element(page.getByRole('checkbox', { name: 'Satellite' })).toBeChecked();
	});

	it('removes the map once it unmounts', async () => {
		const { screen, map } = await renderBound();
		const remove = vi.spyOn(map, 'remove');

		screen.unmount();

		await vi.waitFor(() => expect(remove).toHaveBeenCalledOnce());
	});
});

describe('useMapLibreEvent', () => {
	beforeEach(() => {
		blockMapNetwork();
		vi.spyOn(console, 'error').mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('throws outside a <MapLibre>', () => {
		expect(() => render(EventProbe, { props: { onMove: vi.fn() } })).toThrow(
			/inside a <MapLibre> component/
		);
	});

	it('calls the listener on the event and stops once the caller unmounts', async () => {
		const onMove = vi.fn();
		const onCreate = vi.fn();
		const screen = render(MapWithEventProbe, { props: { listening: true, onMove, onCreate } });
		await vi.waitFor(() => expect(onCreate).toHaveBeenCalled(), LOAD_TIMEOUT);
		const [map] = onCreate.mock.calls[0];

		map.jumpTo({ center: [5, 5] });
		expect(onMove).toHaveBeenCalled();

		await screen.rerender({ listening: false });
		onMove.mockClear();
		map.jumpTo({ center: [6, 6] });

		expect(onMove).not.toHaveBeenCalled();
	});
});
