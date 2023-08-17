<script lang='ts'>

import { Tabs } from '@viamrobotics/prime-core';
import { tab, hovered } from '../../stores';
import ObstaclesTab from './obstacles.svelte';
import WaypointsTab from './waypoints.svelte';

const handleTabSelect = (event: CustomEvent) => {
  $tab = event.detail.value;
};

</script>

<nav class='w-full sm:w-80'>
  <Tabs
    tabs={['Waypoints', 'Obstacles']}
    selected={$tab}
    on:input={handleTabSelect}
  />

  <ul
    on:mouseleave={() => ($hovered = null)}
    class='px-4 py-2 max-h-64 sm:max-h-[520px] overflow-y-scroll'
  >
    {#if $tab === 'Waypoints'}
      <WaypointsTab />
    {:else if $tab === 'Obstacles'}
      <ObstaclesTab />
    {/if}
  </ul>
</nav>
