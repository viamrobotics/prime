<script lang='ts'>

import { Tabs } from '@viamrobotics/prime-core';
import { tab, hovered } from '../../stores';
import ObstaclesTab from './obstacles.svelte';
import WaypointsTab from './waypoints.svelte';

const handleTabSelect = (event: CustomEvent<{ value: string }>) => {
  $tab = event.detail.value as 'Obstacles' | 'Waypoints';
};

</script>

<nav class='w-full h-full sm:w-80'>
  <Tabs
    tabs={['Waypoints', 'Obstacles']}
    selected={$tab}
    on:input={handleTabSelect}
  />

  <ul
    on:mouseleave={() => ($hovered = null)}
    class='px-4 py-2 h-[calc(100%-30px)] overflow-y-scroll'
  >
    {#if $tab === 'Waypoints'}
      <WaypointsTab
        on:delete-waypoint
      />
    {:else if $tab === 'Obstacles'}
      <ObstaclesTab
        on:create-obstacle
        on:delete-obstacle
        on:move-obstacle
        on:change-obstacle-geometry
      />
    {/if}
  </ul>
</nav>
