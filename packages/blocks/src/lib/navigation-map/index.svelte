<!--
  @component

  A map for configuring or viewing navigation service information, such as waypoints, obstacles, or motion paths.

  ```svelte
    <NavigationMap
      mode={'debug' | 'configure'}
      waypoints={Waypoint[]}
      obstacles={Obstacle[]}
      on:click
      on:delete-waypoint
      on:create-obstacle
      on:delete-obstacle
      on:move-obstacle
      on:change-obstacle-geometry
    />
  ```
-->
<script lang="ts">

import { write as writeStore } from './stores';
import Map from './components/map.svelte';
import type { Waypoint, Obstacle } from './types';
import { waypoints as waypointsStore, obstacles as obstaclesStore } from './stores';

/** The map mode. "debug" assumes the robot is on and connected. */
export let mode: 'debug' | 'configure' = 'debug';

/** The waypoints to render on the map. */
export let waypoints: Waypoint[] = [];

/** The obstacles to render on the map. */
export let obstacles: Obstacle[] = [];

$: waypointsStore.set(waypoints)
$: obstaclesStore.set(obstacles)
$: $writeStore = mode === 'configure';

</script>

<Map
  on:click
  on:delete-waypoint
  on:create-obstacle
  on:delete-obstacle
  on:move-obstacle
  on:change-obstacle-geometry
/>
