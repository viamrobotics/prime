/**
 * Provides interactivity as described in @threlte/extras,
 * but carries out necessary camera and screen-space transforms
 * to be compatible with the map camera.
 */

import * as THREE from 'three';
import { interactivity } from '@threlte/extras';
import { useThrelte } from '@threlte/core';
import type { MapMouseEvent } from 'maplibre-gl';
import { useMapLibre } from '$lib/maplibre/hooks';
import { onDestroy } from 'svelte';

export const interactivityPlugin = () => {
  const { camera } = useThrelte();
  const { map } = useMapLibre();

  let point: { x: number; y: number } = { x: 0, y: 0 };

  const setPoint = (event: MapMouseEvent) => {
    point = event.point;
  };

  map.on('mousemove', setPoint);

  onDestroy(() => map.off('mousemove', setPoint));

  const cameraPosition = new THREE.Vector3();
  const mousePosition = new THREE.Vector3();
  const viewDirection = new THREE.Vector3();
  const camInverseProjection = new THREE.Matrix4();

  interactivity({
    target: map.getCanvas(),
    filter: (hits) => {
      // Only return the first hit
      return hits.slice(0, 1);
    },
    compute: (_, state) => {
      state.pointer.update((vec2) => {
        vec2.x = (point.x / map.transform.width) * 2 - 1;
        vec2.y = -(point.y / map.transform.height) * 2 + 1;
        return vec2;
      });

      const { current } = state.pointer;

      camInverseProjection.copy(camera.current.projectionMatrix).invert();
      cameraPosition.set(0, 0, 0).applyMatrix4(camInverseProjection);
      mousePosition
        .set(current.x, current.y, 1)
        .applyMatrix4(camInverseProjection);
      viewDirection.copy(mousePosition).sub(cameraPosition).normalize();

      state.raycaster.set(cameraPosition, viewDirection);
    },
  });
};
