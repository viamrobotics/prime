<script lang='ts'>

import { onMount, createEventDispatcher } from 'svelte';
import { Map, NavigationControl, type LngLatLike } from 'maplibre-gl';
import { style } from './style';

/** A reference to the maplibre Map. */
export let map: Map | undefined = undefined;

/** The minimum camera pitch. */
export let minPitch = 0;

/** The maximum camera pitch. */
export let maxPitch = 60;

/** The initial map zoom. */
export let zoom = 9;

/**
 * The initial map center.
 * 
 * @default [-73.984421, 40.7718116]
 * The Viam Robotics office.
 */
export let center: LngLatLike = [-73.984421, 40.7718116];

type Events = {
  /** Fired after the map has been created. */
  create: Map;
  /** Fired when the map camera moves. */
  move: Map;
  /** Fired when the map resizes. */
  resize: Map;
}

const dispatch = createEventDispatcher<Events>();

let container: HTMLElement;

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

  const nav = new NavigationControl({ showZoom: false });
  map.addControl(nav, 'top-right');

  const handleMove = () => dispatch('move', map!);
  const handleResize = () => dispatch('resize', map!);
  const handleCreate = () => dispatch('create', map!);

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

</script>

<div
  bind:this={container}
  class="relative w-full h-full"
/>
