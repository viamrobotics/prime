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

import { onMount, createEventDispatcher, onDestroy } from 'svelte';
import { provideMapContext } from './hooks';
import { Map, NavigationControl } from 'maplibre-gl';
import { style } from './style';
import type { LngLat } from '$lib';

/** The minimum camera pitch. */
export let minPitch = 0;

/** The maximum camera pitch. */
export let maxPitch = 60;

/** The initial map zoom. */
export let zoom = 9;

/** The maximum zoom level of the map (0-24). */
export let minZoom = 0;

/** The maximum zoom level of the map (0-24). */
export let maxZoom = 22;

/**
 * The initial map center.
 *
 * @default { lng: -73.984421, lat: 40.7718116 }
 * The Viam Robotics office.
 */
export let center: LngLat = { lng: -73.984_421, lat: 40.771_811_6 };

/** The MapLibre Map instance */
export let map: Map | undefined = undefined;

interface Events {
  /** Fired after the map has been created. */
  create: Map;
  /** Fired when the map camera moves. */
  move: Map;
  /** Fired when the map resizes. */
  resize: Map;
}

const dispatch = createEventDispatcher<Events>();
const context = provideMapContext(center, zoom);

let container: HTMLElement;
let created = false;

const setMapSize = () => {
  const canvas = map!.getCanvas();
  context.size.set({
    width: canvas.clientWidth,
    height: canvas.clientHeight,
  });
};

const handleCreate = () => {
  created = true;
  dispatch('create', map!);

  // Resize the map after any slots have been rendered.
  requestAnimationFrame(() => map!.resize());
};

const handleMove = () => {
  context.center.set(map!.getCenter());
  context.zoom.set(map!.getZoom());
  dispatch('move', map!);
};

const handleResize = () => {
  setMapSize();
  context.center.set(map!.getCenter());
  context.zoom.set(map!.getZoom());
  dispatch('resize', map!);
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
  });

  context.map.set(map);

  const nav = new NavigationControl({ showZoom: false });
  map.addControl(nav, 'top-right');

  map.on('move', handleMove);
  map.on('resize', handleResize);
  map.on('style.load', handleCreate);
});

onDestroy(() => {
  map?.off('move', handleMove);
  map?.off('resize', handleResize);
  map?.off('style.load', handleCreate);
});

$: map?.setMinPitch(minPitch);
$: map?.setMaxPitch(maxPitch);
</script>

{#if created}
  <slot />
{/if}

<div
  class="h-full"
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
