import { getContext, onDestroy, setContext } from 'svelte';
import type {
  Map,
  MapLayerEventType,
  MapLayerMouseEvent,
  MapLayerTouchEvent,
} from 'maplibre-gl';
import { type Writable, get, writable } from 'svelte/store';
import type { LngLat } from '$lib';

const mapContextKey = Symbol('prime-blocks-maplibre');

interface MapContext {
  map: Writable<Map>;
  center: Writable<LngLat>;
  size: Writable<{ width: number; height: number }>;
  zoom: Writable<number>;
}

export const provideMapContext = (center: LngLat, zoom: number) => {
  const context: MapContext = {
    map: writable<Map>(),
    center: writable<LngLat>(center),
    size: writable({ width: 0, height: 0 }),
    zoom: writable(zoom),
  };

  setContext<MapContext>(mapContextKey, context);

  return context;
};

/**
 * Provides context for a <MapLibre> instance. Must be called within a child of this component.
 */
export const useMapLibre = () => {
  const context = getContext<MapContext>(mapContextKey);

  if (!context) {
    throw new Error(
      'useMapLibre is a context sensitive hook that must be used inside a <MapLibre> component.'
    );
  }

  return {
    map: get(context.map),
    mapCenter: context.center,
    mapSize: context.size,
    mapZoom: context.zoom,
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
