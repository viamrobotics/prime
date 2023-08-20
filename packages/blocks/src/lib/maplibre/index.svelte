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

<svelte:options immutable />

<script lang='ts'>

import 'maplibre-gl/dist/maplibre-gl.css';

import { onMount, createEventDispatcher, setContext, onDestroy, tick } from 'svelte';
import { writable } from 'svelte/store';
import { Map, NavigationControl } from 'maplibre-gl';
import { style } from './style';
import type { LngLat } from '$lib';

/** The minimum camera pitch. */
export let minPitch = 0;

/** The maximum camera pitch. */
export let maxPitch = 60;

/** The initial map zoom. */
export let zoom = 9;

/**
 * The initial map center.
 * 
 * @default { lng: -73.984421, lat: 40.7718116 }
 * The Viam Robotics office.
 */
export let center: LngLat = { lng: -73.984_421, lat: 40.771_811_6 };

type Events = {
  /** Fired after the map has been created. */
  create: Map;
  /** Fired when the map camera moves. */
  move: Map;
  /** Fired when the map resizes. */
  resize: Map;
}

const dispatch = createEventDispatcher<Events>();
const mapStore = writable<Map | undefined>(undefined);
const centerStore = writable<LngLat>(center);
const sizeStore = writable({ width: 0, height: 0 });
const zoomStore = writable(zoom);

setContext('map', mapStore);
setContext('center', centerStore);
setContext('size', sizeStore);
setContext('zoom', zoomStore);

let map: Map | undefined;
let container: HTMLElement;
let created = false;

const setMapSize = () => {
  const canvas = map!.getCanvas();
  sizeStore.set({
    width: canvas.clientWidth,
    height: canvas.clientHeight,
  })
};

const handleCreate = async () => {
  created = true;
  dispatch('create', map!);

  // Resize the map after any slots have been rendered.
  await tick()
  map!.resize()
};

const handleMove = () => {
  centerStore.set(map!.getCenter());
  zoomStore.set(map!.getZoom());
  dispatch('move', map!);
};

const handleResize = () => {
  setMapSize();
  centerStore.set(map!.getCenter());
  zoomStore.set(map!.getZoom());
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
  });

  mapStore.set(map);

  const nav = new NavigationControl({ showZoom: false });
  map.addControl(nav, 'top-right');

  map.on('move', handleMove);
  map.on('resize', handleResize);
  map.on('style.load', handleCreate);
});

onDestroy(() => {
  map!.off('move', handleMove);
  map!.off('resize', handleResize);
  map!.off('style.load', handleCreate);
})

$: map?.setMinPitch(minPitch);
$: map?.setMaxPitch(maxPitch);

</script>

{#if created}
  <slot />
{/if}

<div class='h-full' {...$$restProps}>
  <div
    class='h-full'
    bind:this={container}
  />

  {#if created}
    <slot name='layer' />
  {/if}
</div>
