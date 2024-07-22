<script lang="ts">
import { onMount } from 'svelte';
import { Button, Icon } from '@viamrobotics/prime-core';
import { useMapLibre } from '../hooks';
import type { GeoPose } from '../types';

export let pose: GeoPose | undefined = undefined;
export let following = false;

const { map } = useMapLibre();

let rafID = 0;

const follow = () => {
  if (pose && following) {
    map.setCenter(pose);
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
  disabled={!pose}
  on:click={(event) => {
    event.stopPropagation();
    following = !following;
  }}
>
  <Icon
    name={following ? 'navigation-variant' : 'navigation-variant-outline'}
  />
</Button>
