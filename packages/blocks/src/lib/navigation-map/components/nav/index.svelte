<script lang='ts'>

import { createEventDispatcher } from 'svelte';
import { NavigationTab, type Obstacle } from '$lib';
import { tab, tabs, hovered } from '../../stores';
import ObstaclesTab from './obstacles.svelte';
import WaypointsTab from './waypoints.svelte';

const dispatch = createEventDispatcher<{
  /** Fired when obstacles are created, destroyed, or edited. */
  'update-obstacles': Obstacle[]
}>();

const handleUpdateObstacle = (event: CustomEvent<Obstacle[]>) => {
  dispatch('update-obstacles', event.detail)
}

</script>

<nav class='sm:h-full sm:w-[350px]'>
  <ol class='mb-2 flex flex-wrap items-center'>
    {#each $tabs as tabTitle}
      {@const selected = $tab === tabTitle}
      <li>
        <button
          class="border-b px-4 py-1 capitalize text-sm tracking-normal"
          class:border-black={selected}
          class:font-bold={selected}
          class:text-gray-600={!selected}
          on:click={() => { $tab = tabTitle }}
        >
          {tabTitle}
        </button>
      </li>
    {/each}
  </ol>

  {#if $tab === NavigationTab.Waypoints}
    <ul
      on:mouseleave={() => ($hovered = null)}
      class='pr-4 py-2 sm:h-[calc(100%-38px)] overflow-y-scroll'
    >
      <WaypointsTab
        on:add-waypoint
        on:delete-waypoint
      />
    </ul>
  {:else if $tab === NavigationTab.Obstacles}
    <ul
      class='pr-4 py-2 sm:h-[calc(100%-38px)] overflow-y-scroll'
      on:mouseleave={() => ($hovered = null)}
    >
      <ObstaclesTab
        on:update={handleUpdateObstacle}
      />
    </ul>
  {:else}
    <div class='pr-4 py-2 sm:h-[calc(100%-38px)] overflow-y-scroll'>
      <slot name='tab' />
    </div>
  {/if}
</nav>
