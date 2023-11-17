/**
 * This plugin carries out two functions:
 *
 * - It syncs the projection matrix of a mapbibre-gl camera to a THREE.Camera in order to render objects
 *   from the perspective of the map viewer. The camera is set to look at the current center of the visible map.
 *
 * - It manages the position of any THREE.Object3D that has a `userData.lngLat` property. The position
 *   is determined by calculating the difference of the map's center lng,lat and the object's lng,lat and then
 *   making an approximate transform to an x,z plane offset in meters.
 */

import * as THREE from 'three';
import { onDestroy } from 'svelte';
import { useRender, useThrelte } from '@threlte/core';
import { MercatorCoordinate } from 'maplibre-gl';
import { useMapLibre, type LngLat } from '$lib';

export interface Props {
  lnglat?: LngLat;
}

export const renderPlugin = () => {
  const { scene, camera, renderer } = useThrelte();
  const { map } = useMapLibre();

  /**
   * Threlte's default camera enforces projection settings
   * that we don't want since we're syncing with the maplibre camera,
   * so we create a new one with no projection assumptions.
   */
  camera.set(new THREE.Camera());

  const cameraTransform = new THREE.Matrix4();
  const cameraMatrix = new THREE.Matrix4();
  const scale = new THREE.Matrix4();
  const rotation = new THREE.Matrix4().multiplyMatrices(
    new THREE.Matrix4().makeRotationX(-0.5 * Math.PI),
    new THREE.Matrix4().makeRotationY(Math.PI)
  );

  map.addLayer({
    id: 'scene-layer',
    type: 'custom',
    renderingMode: '3d',
    render(_, viewProjectionMatrix) {
      const center = map.getCenter();
      const mercator = MercatorCoordinate.fromLngLat(center, 0);
      const mercatorScale = mercator.meterInMercatorCoordinateUnits();
      const cx = mercator.x / mercatorScale;
      const cy = mercator.y / mercatorScale;

      scale.makeScale(mercatorScale, mercatorScale, -mercatorScale);
      cameraTransform
        .multiplyMatrices(scale, rotation)
        .setPosition(mercator.x, mercator.y, mercator.z);

      camera.current.projectionMatrix = cameraMatrix
        .fromArray(viewProjectionMatrix)
        .multiply(cameraTransform);

      const lngLatToPosition = (lngLat: LngLat): [number, number, number] => {
        const mercatorOffset = MercatorCoordinate.fromLngLat(lngLat, 0);
        const ox = mercatorOffset.x / mercatorScale;
        const oy = mercatorOffset.y / mercatorScale;
        return [cx - ox, 0, cy - oy];
      };

      scene.traverse((object) => {
        const { lngLat } = object.userData as {
          lngLat?: LngLat | LngLat[] | undefined;
        };

        if (!lngLat) {
          return;
        }

        if (Array.isArray(lngLat)) {
          (object as THREE.Mesh).geometry.setFromPoints(
            lngLat.map((ll) => new THREE.Vector3(...lngLatToPosition(ll)))
          );
          if (object instanceof THREE.Line) {
            object.computeLineDistances();
          }
        } else {
          object.position.set(...lngLatToPosition(lngLat));
        }
      });

      renderer.render(scene, camera.current);
      map.triggerRepaint();
    },
  });

  useRender(() => {
    /**
     * Take over the Threlte renderer.
     * We want to render in sync with map camera updates.
     */
  });

  onDestroy(() => {
    map.removeLayer('scene-layer');
  });
};
