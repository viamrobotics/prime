<script lang='ts'>

import { createEventDispatcher } from 'svelte';
import { Tabs } from '@viamrobotics/prime-core';
import type { Obstacle } from '$lib';
import { tab, tabs, hovered } from '../../stores';
import ObstaclesTab from './obstacles.svelte';
import WaypointsTab from './waypoints.svelte';

const dispatch = createEventDispatcher<{
  /** Fired when obstacles are created, destroyed, or edited. */
  'update-obstacles': Obstacle[]
}>();

const handleTabSelect = (event: CustomEvent<{ value: string }>) => {
  $tab = event.detail.value as 'Obstacles' | 'Waypoints';
};

const handleUpdateObstacle = (event: CustomEvent<Obstacle[]>) => {
  dispatch('update-obstacles', event.detail)
}

</script>

<nav class='sm:h-full sm:w-[350px]'>
  <Tabs
    tabs={$tabs}
    selected={$tab}
    on:input={handleTabSelect}
  />

  <ul
    on:mouseleave={() => ($hovered = null)}
    class='px-4 py-2 sm:h-[calc(100%-30px)] overflow-y-scroll'
  >
    {#if $tab === 'Waypoints'}
      <WaypointsTab
        on:add-waypoint
        on:delete-waypoint
      />
    {:else if $tab === 'Obstacles'}
      <ObstaclesTab
        on:update={handleUpdateObstacle}
      />
    {/if}
  </ul>
</nav>
