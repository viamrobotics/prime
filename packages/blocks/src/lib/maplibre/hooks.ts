import { getContext, onDestroy } from 'svelte';
import type { LngLat, Map, MapLayerEventType, MapLayerMouseEvent, MapLayerTouchEvent } from 'maplibre-gl';
import { type Writable, get } from 'svelte/store';

export const useMapLibre = () => {
  const mapContext = getContext<Writable<Map> | undefined>('map');

  if (!mapContext) {
    throw new Error('useMapLibre is a context sensitive hook that must be used inside a <MapLibre> component.');
  }

  return {
    map: get(mapContext),
    mapCenter: getContext<Writable<LngLat>>('center'),
    mapSize: getContext<Writable<{ width: number; height: number; }>>('size'),
    mapZoom: getContext<number>('zoom'),
  };
};

export const useMapLibreEvent = (event: keyof MapLayerEventType | 'move' | 'resize', listener: (ev: (MapLayerMouseEvent | MapLayerTouchEvent)) => void) => {
  const { map } = useMapLibre();

  map.on(event, listener)

  onDestroy(() => map.off(event, listener))
}
