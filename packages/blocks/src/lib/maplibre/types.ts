// eslint-disable-next-line max-classes-per-file
import { LngLat } from 'maplibre-gl';

export class GeoPose extends LngLat {
  rotation: number;
  constructor(lng: number, lat: number, rotation: number) {
    super(lng, lat);
    this.rotation = rotation;
  }
}

export class Waypoint extends LngLat {
  id: string;
  constructor(lng: number, lat: number, id: string) {
    super(lng, lat);
    this.id = id;
  }
}
