import type { Obstacle, Shapes, LngLat } from '$lib';
import { createGeometry } from './create-geometry';

export const createObstacle = (
  name: string,
  lngLat: LngLat,
  type: Shapes = 'box'
): Obstacle => {
  return {
    name,
    location: { lng: lngLat.lng, lat: lngLat.lat },
    geometries: [createGeometry(type)],
  };
};
