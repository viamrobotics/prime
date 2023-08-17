import type { FlyToOptions } from 'maplibre-gl';
import { useMapLibre, type LngLat } from '$lib';

export const flyToMap = (value: LngLat, options: FlyToOptions = {}) => {
  const { map } = useMapLibre()

  map.flyTo({
    zoom: 15,
    duration: 800,
    curve: 0.1,
    ...options,
    center: [value.lng, value.lat],
  });
};
