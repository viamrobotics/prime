import type { ViamObject3D } from '@viamrobotics/three';
import type { LngLat } from '../maplibre/types';

interface BaseGeometry {
  pose: ViamObject3D;
}

export const NavigationTab = {
  Waypoints: 'Waypoints',
  Obstacles: 'Obstacles',
  Attributes: 'Attributes',
} as const;

export type NavigationTabType =
  (typeof NavigationTab)[keyof typeof NavigationTab];

export type Shapes = 'box' | 'sphere' | 'capsule';

export type CapsuleGeometry = BaseGeometry & {
  type: 'capsule';
  radius: number;
  length: number;
};

export type SphereGeometry = BaseGeometry & {
  type: 'sphere';
  radius: number;
};

export type BoxGeometry = BaseGeometry & {
  type: 'box';
  length: number;
  width: number;
  height: number;
};

export type Geometry = BoxGeometry | SphereGeometry | CapsuleGeometry;

export interface Obstacle {
  name: string;
  location: LngLat;
  geometries: Geometry[];
}

export interface Plans {
  current?: LngLat[];
  previous?: LngLat[][];
}
