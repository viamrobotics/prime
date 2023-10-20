import * as THREE from 'three';
import { useThrelte } from '@threlte/core';
import { createEventDispatcher, onMount } from 'svelte';
import { normalizeDeviceCoordinates } from './normalize-device-coordinates';

interface Events {
  /**
   * Fires when the user clicks on the canvas, and reports
   * the intersection of a ray cast from the mouse coordinate
   * to an infinite xy plane at z=0.
   */
  click: THREE.Vector3;
}

const EPSILON = 0.001;

export const useRaycastClick = () => {
  const dispatch = createEventDispatcher<Events>();
  const { renderer, camera } = useThrelte();
  const canvas = renderer.domElement;
  const raycaster = new THREE.Raycaster();
  const pointerDown = new THREE.Vector2();
  const pointerUp = new THREE.Vector2();
  const plane = new THREE.Plane();
  plane.normal.set(0, 0, -1);

  const handleDown = (event: PointerEvent) => {
    normalizeDeviceCoordinates(canvas, event.clientX, event.clientY, pointerDown);
  };

  const handleUp = (event: MouseEvent) => {
    normalizeDeviceCoordinates(canvas, event.clientX, event.clientY, pointerUp);

    const pointerMoved = pointerDown.sub(pointerUp).lengthSq() > EPSILON;

    if (pointerMoved) {
      return;
    }

    const vec3 = new THREE.Vector3();

    raycaster.setFromCamera(pointerUp, camera.current);
    raycaster.ray.intersectPlane(plane, vec3);

    dispatch('click', vec3);
  };

  onMount(() => {
    renderer.domElement.addEventListener('pointerdown', handleDown);
    renderer.domElement.addEventListener('click', handleUp);

    return () => {
      renderer.domElement.addEventListener('pointerdown', handleUp);
      renderer.domElement.removeEventListener('click', handleUp);
    };
  });
};
