import { getContext, onDestroy } from 'svelte';
import type {
  LngLat,
  Map,
  MapLayerEventType,
  MapLayerMouseEvent,
  MapLayerTouchEvent,
} from 'maplibre-gl';
import { type Writable, get } from 'svelte/store';

/**
 * Provides context for a <MapLibre> instance. Must be called within a child of this component.
 */
export const useMapLibre = () => {
  const mapContext = getContext<Writable<Map> | undefined>('map');

  if (!mapContext) {
    throw new Error(
      'useMapLibre is a context sensitive hook that must be used inside a <MapLibre> component.'
    );
  }

  const map = get(mapContext);
  const mapCenter = getContext<Writable<LngLat>>('center');
  const mapSize =
    getContext<Writable<{ width: number; height: number }>>('size');
  const mapZoom = getContext<number>('zoom');

  return {
    map,
    mapCenter,
    mapSize,
    mapZoom,
  };
};

/**
 * Allows attaching events to a <MapLibre> instance. Must be called within a child of this component.
 */
export const useMapLibreEvent = (
  event: keyof MapLayerEventType | 'move' | 'resize',
  listener: (ev: MapLayerMouseEvent | MapLayerTouchEvent) => void
) => {
  const { map } = useMapLibre();

  map.on(event, listener);

  onDestroy(() => map.off(event, listener));
};
