import type { LngLat } from 'maplibre-gl';
export interface GeoPose extends LngLat {
  /** The rotation, where 0 is north */
  rotation: number;
}

export type Waypoint = LngLat & { id: string };
