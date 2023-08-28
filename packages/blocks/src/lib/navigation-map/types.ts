import type { ViamObject3D } from '@viamrobotics/three';

type BaseGeometry = {
  pose: ViamObject3D;
};

export const TabType = {
  Obstacles: 'obstacles',
  Waypoints: 'waypoints',
} as const

export type TabTypes = keyof typeof TabType

export type Shapes = 'box' | 'sphere' | 'capsule';

export type LngLat = { lng: number; lat: number };

export type Waypoint = LngLat & { id: string };

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
