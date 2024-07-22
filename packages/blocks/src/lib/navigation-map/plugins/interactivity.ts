/**
 * Provides interactivity as described in @threlte/extras,
 * but carries out necessary camera and screen-space transforms
 * to be compatible with the map camera.
 */

import { interactivity, type Intersection } from '@threlte/extras';
import { useThrelte } from '@threlte/core';
import { useMapLibre, maplibreRaycastPlugin } from '$lib';

export const interactivityPlugin = () => {
  const { camera } = useThrelte();
  const { map } = useMapLibre();
  const { pointer, compute } = maplibreRaycastPlugin(camera);

  interactivity({
    target: map.getCanvas(),
    filter: (hits: Intersection[]) => {
      // Only return the first hit
      return hits.slice(0, 1);
    },
    compute: (_, state) => {
      state.pointer.update((vec2) => {
        vec2.copy(pointer);
        return vec2;
      });

      compute(state.raycaster);
    },
  });
};
