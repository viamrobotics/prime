import { onMount } from 'svelte';
import { type Camera, type Raycaster, Vector2, Vector3, Matrix4 } from 'three';
import type { MapMouseEvent } from 'maplibre-gl';
import { useMapLibre } from '../hooks';

/**
 * Provides raycasting against THREE objects projected on to a maplibre map.
 */
export const maplibreRaycastPlugin = (cameraSignal: { current: Camera }) => {
  const { map } = useMapLibre();
  const pointer = new Vector2();

  const handleMouseMove = (event: MapMouseEvent) => {
    pointer.set(
      (event.point.x / map.transform.width) * 2 - 1,
      -(event.point.y / map.transform.height) * 2 + 1
    );
  };

  onMount(() => {
    map.on('mousemove', handleMouseMove);
    return () => map.off('mousemove', handleMouseMove);
  });

  const cameraPosition = new Vector3();
  const mousePosition = new Vector3();
  const viewDirection = new Vector3();
  const camInverseProjection = new Matrix4();

  const compute = (raycaster: Raycaster) => {
    camInverseProjection.copy(cameraSignal.current.projectionMatrix).invert();
    cameraPosition.set(0, 0, 0).applyMatrix4(camInverseProjection);
    mousePosition
      .set(pointer.x, pointer.y, 1)
      .applyMatrix4(camInverseProjection);
    viewDirection.copy(mousePosition).sub(cameraPosition).normalize();

    raycaster.set(cameraPosition, viewDirection);
  };

  return { compute, pointer };
};
