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
      on:update-obstacle
    />
  ```
-->
<script lang="ts">

import { write as writeStore } from './stores';
import Map from './components/map.svelte';
import type { Waypoint, Obstacle } from './types';
import {
  waypoints as waypointsStore,
  obstacles as obstaclesStore,
  tab as tabStore,
  tabs as tabsStore,
} from './stores';

/** The map mode. "debug" assumes the robot is on and connected. */
export let mode: 'debug' | 'configure' = 'debug';

/** The waypoints to render on the map. */
export let waypoints: Waypoint[] = [];

/** The obstacles to render on the map. */
export let obstacles: Obstacle[] = [];

/** The initial tab to show */
export let tab: 'Waypoints' | 'Obstacles' = 'Waypoints';

/** The visible set of tabs */
export let tabs = ['Waypoints', 'Obstacles'];

$: tabStore.set(tab);
$: tabsStore.set(tabs);
$: waypointsStore.set(waypoints);
$: obstaclesStore.set(obstacles);
$: $writeStore = mode === 'configure';

</script>

<Map
  on:click
  on:add-waypoint
  on:delete-waypoint
  on:update-obstacles
/>
