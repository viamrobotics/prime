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
      on:update-obstacles
    />
  ```
-->
<script lang="ts">

import { environment as envStore } from './stores';
import Map from './components/map.svelte';
import { type Waypoint, type Obstacle, NavigationTab } from './types';
import {
  waypoints as waypointsStore,
  obstacles as obstaclesStore,
  tab as tabStore,
  tabs as tabsStore,
} from './stores';

/** The map environment. "debug" assumes the robot is on and connected. */
export let environment: 'debug' | 'configure' = 'debug';

/** The waypoints to render on the map. */
export let waypoints: Waypoint[] = [];

/** The obstacles to render on the map. */
export let obstacles: Obstacle[] = [];

/** The initial tab to show */
export let tab: string = NavigationTab.Waypoints;

/** The visible set of tabs */
export let tabs: string[] = [NavigationTab.Waypoints, NavigationTab.Obstacles];

export let baseGeoPose: { lng: number; lat: number } | undefined = undefined;

$: $tabStore = tab;
$: $tabsStore = tabs;
$: $waypointsStore = waypoints;
$: $obstaclesStore = obstacles;
$: $envStore = environment;

</script>

<Map
  {baseGeoPose}
  on:click
  on:add-waypoint
  on:delete-waypoint
  on:update-obstacles
>
  <slot name='tab' slot='tab' />
</Map>
