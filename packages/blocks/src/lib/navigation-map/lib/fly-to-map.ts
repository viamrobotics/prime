import type { Map, FlyToOptions } from 'maplibre-gl';
import type { LngLat } from '$lib';

export const flyToMap = (map: Map, value: LngLat, options: FlyToOptions = {}) => {
  map.flyTo({
    zoom: 15,
    duration: 800,
    curve: 0.1,
    ...options,
    center: [value.lng, value.lat],
  });
};
