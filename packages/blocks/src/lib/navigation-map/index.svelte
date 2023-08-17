<script lang="ts">

import { write as writeStore } from './stores';
import Map from './components/map.svelte';
import type { Waypoint, Obstacle } from './types';
import { waypoints as waypointsStore, obstacles as obstaclesStore } from './stores';

export let write = false;

/** The waypoints to render on the map. */
export let waypoints: Waypoint[] = [];

/** The obstacles to render on the map. */
export let obstacles: Obstacle[] = [];

$: waypointsStore.set(waypoints)
$: obstaclesStore.set(obstacles)
$: $writeStore = write;

</script>

<div class='w-full h-full sm:flex items-stretch'>
  <Map
    on:click
  />
</div>
