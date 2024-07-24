<!-- 
  @component
  Adds controls for following a lat, lng point on a map.
-->
<script lang="ts">
import { onMount } from 'svelte';
import { Button, Icon } from '@viamrobotics/prime-core';
import { useMapLibre } from '../hooks';

/** The map point to follow */
export let lng: number | undefined = undefined;
export let lat: number | undefined = undefined;

let following = false;

const { map } = useMapLibre();

let rafID = 0;

const follow = () => {
  if (lng && lat && following) {
    map.setCenter([lng, lat]);
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
  disabled={lng === undefined || lat === undefined}
  on:click={(event) => {
    event.stopPropagation();
    following = !following;
  }}
>
  <Icon
    name={following ? 'navigation-variant' : 'navigation-variant-outline'}
  />
</Button>
