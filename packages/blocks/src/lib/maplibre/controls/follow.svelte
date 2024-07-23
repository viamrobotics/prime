<!-- 
  @component
  Adds controls for following a lat, lng point on a map.
-->
<script lang="ts">
import { onMount } from 'svelte';
import { Button, Icon } from '@viamrobotics/prime-core';
import { useMapLibre } from '../hooks';
import type { LngLat } from 'maplibre-gl';

/** The map point to follow */
export let lngLat: LngLat | undefined = undefined;

/** Whether following is enabled */
export let following = false;

const { map } = useMapLibre();

let rafID = 0;

const follow = () => {
  if (lngLat && following) {
    map.setCenter(lngLat);
    rafID = requestAnimationFrame(follow);
  }
};

const stop = () => {
  cancelAnimationFrame(rafID);
  following = false;
};

$: if (following) {
  requestAnimationFrame(follow);
}

onMount(() => {
  map.on('wheel', stop);
  map.on('mousedown', stop);

  return () => {
    cancelAnimationFrame(rafID);
    map.off('wheel', stop);
    map.off('mousedown', stop);
  };
});
</script>

<Button
  disabled={lngLat === undefined}
  on:click={(event) => {
    event.stopPropagation();
    following = !following;
  }}
>
  <Icon
    name={following ? 'navigation-variant' : 'navigation-variant-outline'}
  />
</Button>
