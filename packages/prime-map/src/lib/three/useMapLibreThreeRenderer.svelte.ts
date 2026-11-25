import { MercatorCoordinate, type CustomLayerInterface } from 'maplibre-gl';
import { Line, Matrix4, Vector3, type Camera, type Scene } from 'three';

import { useMapLibre } from '../MapLibre/useMapLibre.svelte.ts';
import { lngLatToCartesian, mercatorToCartesian } from '../projection.ts';
import { readLngLatUserData } from './lng-lat-user-data.ts';

let layerCount = 0;

/**
 * Renders a Three.js scene inside the enclosing `<MapLibre>` map, as a custom layer. Each call
 * adds its own layer, and adds it again after the map loads a new style.
 *
 * Each map draw copies the map's projection onto `camera.current`, looking at the visible map's
 * center, so the scene renders from the map viewer's point of view. Then it places every object
 * whose `userData.lngLat` holds a `{ lng, lat }`, at that point's offset in meters from the
 * center on the x, z plane. A `THREE.Line` takes a list of points and draws through them.
 *
 * Call it during the initialization of a component rendered inside a `<MapLibre>`.
 *
 * @param scene The scene to render.
 * @param camera A plain `THREE.Camera`. A perspective or orthographic camera sets a projection
 * that maplibre-gl's would fight.
 * @param render Called on each map draw with the scene and camera. Render the scene here.
 */
export const useMapLibreThreeRenderer = (
	scene: Scene,
	camera: { current: Camera },
	render: (scene: Scene, camera: Camera) => void
): void => {
	const context = useMapLibre();
	const cameraTransform = new Matrix4();
	const cameraMatrix = new Matrix4();
	const scale = new Matrix4();
	const rotation = new Matrix4().multiplyMatrices(
		new Matrix4().makeRotationX(-0.5 * Math.PI),
		new Matrix4().makeRotationY(Math.PI)
	);

	layerCount += 1;
	const layerId = `prime-map-scene-${layerCount}`;

	$effect(() => {
		const map = context.map;

		const layer: CustomLayerInterface = {
			id: layerId,
			type: 'custom',
			renderingMode: '3d',
			render(_, { modelViewProjectionMatrix }) {
				const mercator = MercatorCoordinate.fromLngLat(map.getCenter(), 0);
				const mercatorScale = mercator.meterInMercatorCoordinateUnits();
				const { x: cx, y: cy } = mercatorToCartesian(mercator, mercatorScale);

				scale.makeScale(mercatorScale, mercatorScale, -mercatorScale);
				cameraTransform
					.multiplyMatrices(scale, rotation)
					.setPosition(mercator.x, mercator.y, mercator.z);

				camera.current.projectionMatrix = cameraMatrix
					.fromArray(modelViewProjectionMatrix)
					.multiply(cameraTransform);

				scene.traverse((object) => {
					const lngLat = readLngLatUserData(object.userData.lngLat);

					if (lngLat === undefined) {
						return;
					}

					if (Array.isArray(lngLat)) {
						if (object instanceof Line) {
							object.geometry.setFromPoints(
								lngLat.map((value) => {
									const { x: ox, y: oy } = lngLatToCartesian(value, mercatorScale);
									return new Vector3(cx - ox, 0, cy - oy);
								})
							);
							object.computeLineDistances();
						}
					} else {
						const { x: ox, y: oy } = lngLatToCartesian(lngLat, mercatorScale);
						object.position.set(cx - ox, 0, cy - oy);
					}
				});

				render(scene, camera.current);
				map.triggerRepaint();
			}
		};

		// A new style drops every custom layer, so add this one back after each style load.
		const addLayer = () => {
			if (!map.getLayer(layerId)) {
				map.addLayer(layer);
			}
		};

		addLayer();
		map.on('style.load', addLayer);

		return () => {
			map.off('style.load', addLayer);
			if (map.getLayer(layerId)) {
				map.removeLayer(layerId);
			}
		};
	});
};
