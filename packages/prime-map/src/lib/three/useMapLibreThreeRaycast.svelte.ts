import type { MapMouseEvent } from 'maplibre-gl';

import { Matrix4, Vector2, Vector3, type Camera, type Raycaster } from 'three';

import { useMapLibre } from '../MapLibre/useMapLibre.svelte.ts';

/**
 * Raycasts against Three.js objects drawn on the enclosing `<MapLibre>` map by
 * `useMapLibreThreeRenderer`. `pointer` follows the mouse over the map in normalized device
 * coordinates, and `compute` aims a raycaster from the camera through it.
 *
 * Call it during the initialization of a component rendered inside a `<MapLibre>`.
 *
 * @param camera The camera `useMapLibreThreeRenderer` updates.
 */
export const useMapLibreThreeRaycast = (camera: { current: Camera }) => {
	const context = useMapLibre();

	const pointer = new Vector2();

	const handleMouseMove = (event: MapMouseEvent) => {
		// `event.point` is measured against the canvas, so normalize by the canvas' own CSS size.
		const canvas = context.map.getCanvas();
		pointer.set(
			(event.point.x / canvas.clientWidth) * 2 - 1,
			-(event.point.y / canvas.clientHeight) * 2 + 1
		);
	};

	$effect(() => {
		const map = context.map;
		map.on('mousemove', handleMouseMove);
		return () => {
			map.off('mousemove', handleMouseMove);
		};
	});

	const cameraPosition = new Vector3();
	const mousePosition = new Vector3();
	const viewDirection = new Vector3();
	const inverseProjection = new Matrix4();

	const compute = (raycaster: Raycaster) => {
		inverseProjection.copy(camera.current.projectionMatrix).invert();
		cameraPosition.set(0, 0, 0).applyMatrix4(inverseProjection);
		mousePosition.set(pointer.x, pointer.y, 1).applyMatrix4(inverseProjection);
		viewDirection.copy(mousePosition).sub(cameraPosition).normalize();

		raycaster.set(cameraPosition, viewDirection);
	};

	return { compute, pointer };
};
