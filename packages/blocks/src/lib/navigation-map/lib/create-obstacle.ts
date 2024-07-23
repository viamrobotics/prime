import { type Obstacle, type Shapes, LngLat } from '$lib';
import { theme } from '@viamrobotics/prime-core/theme';
import { createGeometry } from './create-geometry';

export const createObstacle = (
  name: string,
  lngLat: LngLat,
  type: Shapes = 'box'
): Obstacle => {
  return {
    name,
    location: new LngLat(lngLat.lng, lngLat.lat),
    geometries: [createGeometry(type)],
    label: 'static',
    color: theme.extend.colors.cyberpunk,
  };
};
