export interface LngLat {
  lng: number;
  lat: number;
}

export interface GeoPose {
  lng: number;
  lat: number;
  /** The rotation, where 0 is north */
  rotation: number;
}

export type Waypoint = LngLat & { id: string };
