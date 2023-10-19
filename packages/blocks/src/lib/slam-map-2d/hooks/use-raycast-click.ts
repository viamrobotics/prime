import * as THREE from 'three';
import { useThrelte } from '@threlte/core';
import { createEventDispatcher, onMount } from 'svelte';

interface Events {
  /** Fires when the user clicks on the canvas */
  click: THREE.Vector3;
}

const EPSILON = 0.001;

export const useRaycastClick = () => {
  const { renderer, camera } = useThrelte();
  const dispatch = createEventDispatcher<Events>();

  const raycaster = new THREE.Raycaster();
  const pointerDown = new THREE.Vector2();
  const pointerUp = new THREE.Vector2();
  const plane = new THREE.Plane();
  plane.normal.set(0, 0, -1);

  const handleDown = (event: PointerEvent) => {
    const canvas = renderer.domElement;
    const rect = canvas.getBoundingClientRect();
    pointerDown.x = ((event.clientX - rect.x) / canvas.clientWidth) * 2 - 1;
    pointerDown.y = -(((event.clientY - rect.y) / canvas.clientHeight) * 2) + 1;
  };

  const handleUp = (event: MouseEvent) => {
    const canvas = renderer.domElement;
    const rect = canvas.getBoundingClientRect();
    pointerUp.x = ((event.clientX - rect.x) / canvas.clientWidth) * 2 - 1;
    pointerUp.y = -(((event.clientY - rect.y) / canvas.clientHeight) * 2) + 1;

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
