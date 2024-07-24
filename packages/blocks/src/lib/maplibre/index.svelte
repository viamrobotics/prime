<!--
  @component

  Creates a maplibre-gl map that will fill its parent.

  Children will mount once the map is fully loaded.

  ```svelte
    <MapLibre>
      <MapLibreMarker lngLat={{ lng: 0, lat: 0 }} />
    </MapLibre>
  ```
-->

<script lang="ts">
import 'maplibre-gl/dist/maplibre-gl.css';

import { onMount, tick } from 'svelte';
import { provideMapContext } from './hooks';
import { Map, type MapOptions } from 'maplibre-gl';
import { style } from './style';
import { LngLat } from '$lib';

/** The minimum camera pitch. */
export let minPitch = 0;

/** The maximum camera pitch. */
export let maxPitch = 60;

/** The map zoom. */
export let zoom = 9;

/** The maximum zoom level of the map (0-24). */
export let minZoom = 0;

/** The maximum zoom level of the map (0-24). */
export let maxZoom = 22;

/**
 * The map center.
 *
 * @default { lng: -73.984421, lat: 40.7718116 }
 * The Viam Robotics office.
 */
export let center: LngLat = new LngLat(-73.984_421, 40.771_811_6);

/** A binding to the MapLibre Map instance */
export let map: Map | undefined = undefined;

export let options: Partial<MapOptions> | undefined = undefined;

/** Fired after the map has been created. */
export let onCreate: undefined | ((map: Map) => void) = undefined;

/** Fired when the map camera moves. */

export let onMove: undefined | ((map: Map) => void) = undefined;
/** Fired when the map resizes. */

export let onResize: undefined | ((map: Map) => void) = undefined;

const context = provideMapContext(center, zoom);

let container: HTMLElement;
let created = false;

const setMapSize = () => {
  const canvas = map?.getCanvas();
  context.size.set({
    width: canvas?.clientWidth ?? 0,
    height: canvas?.clientHeight ?? 0,
  });
};

const handleCreate = () => {
  if (map === undefined) {
    return;
  }

  created = true;
  onCreate?.(map);

  // Resize the map after any slots have been rendered.
  void tick().then(() => map?.resize());
};

const handleMove = () => {
  if (map === undefined) {
    return;
  }

  context.center.set(map.getCenter());
  context.zoom.set(map.getZoom());
  onMove?.(map);
};

const handleResize = () => {
  if (map === undefined) {
    return;
  }

  setMapSize();
  context.center.set(map.getCenter());
  context.zoom.set(map.getZoom());
  onResize?.(map);
};

onMount(() => {
  map = new Map({
    antialias: true,
    container,
    style,
    center,
    zoom,
    minPitch,
    maxPitch,
    minZoom,
    maxZoom,
    ...options,
  });

  context.map.set(map);

  map.on('move', handleMove);
  map.on('resize', handleResize);
  map.on('style.load', handleCreate);

  return () => {
    map?.off('move', handleMove);
    map?.off('resize', handleResize);
    map?.off('style.load', handleCreate);
  };
});

$: map?.setMinPitch(minPitch);
$: map?.setMaxPitch(maxPitch);
$: map?.setZoom(zoom);
$: map?.setCenter(center);
</script>

{#if created}
  <slot />
{/if}

<div
  class="h-full {$$restProps.class ?? ''}"
  {...$$restProps}
>
  <div
    class="h-full"
    bind:this={container}
  />

  {#if created}
    <slot name="layer" />
  {/if}
</div>
