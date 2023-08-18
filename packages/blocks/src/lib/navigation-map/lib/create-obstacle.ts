import { LngLat } from 'maplibre-gl';
import type { Obstacle, Shapes } from '$lib';
import { createGeometry } from './geometry';

export const createObstacle = (
  name: string,
  lngLat: LngLat,
  type: Shapes = 'box'
): Obstacle => {
  return {
    name,
    location: new LngLat(lngLat.lng, lngLat.lat),
    geometries: [createGeometry(type)],
  };
};
