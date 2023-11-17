<!--
  @component

  A map for configuring or viewing navigation service information, such as waypoints, obstacles, or motion plans.

  ```svelte
    <NavigationMap
      environment={'debug' | 'configure'}
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
import type { Map as MapType } from 'maplibre-gl';
import Map from './components/map.svelte';
import { type Obstacle, NavigationTab, type NavigationTabType, type Plans } from './types';
import {
  waypoints as waypointsStore,
  obstacles as obstaclesStore,
  plans as plansStore,
  tab as tabStore,
  tabs as tabsStore,
} from './stores';
import type { GeoPose, Waypoint } from '$lib';

/** The map environment. "debug" assumes the robot is on and connected. */
export let environment: 'debug' | 'configure' = 'debug';

/** The waypoints to render on the map. */
export let waypoints: Waypoint[] = [];

/** The obstacles to render on the map. */
export let obstacles: Obstacle[] = [];

/** The plans to render on the map. */
export let plans: Plans = {};

/** The initial tab to show. */
export let tab: NavigationTabType = NavigationTab.Waypoints;

/** A reference to the maplibre map, once created. */
export let map: MapType | undefined = undefined;

/** The visible set of tabs. */
export let tabs: NavigationTabType[] = [
  NavigationTab.Waypoints,
  NavigationTab.Obstacles,
];

/** The pose (Lng,Lat) and rotation of a base. */
export let baseGeoPose: GeoPose | undefined = undefined;

$: $tabStore = tab;
$: $tabsStore = tabs;
$: $waypointsStore = waypoints;
$: $obstaclesStore = obstacles;
$: $plansStore = plans;
$: $envStore = environment;
</script>

<Map
  bind:map
  {baseGeoPose}
  on:create
  on:add-waypoint
  on:delete-waypoint
  on:update-obstacles
>
  <slot
    name="tab"
    slot="tab"
  />
</Map>
