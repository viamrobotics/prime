<script lang="ts">
import { createEventDispatcher } from 'svelte';
import { NavigationTab, type Obstacle } from '$lib';
import { tab, tabs, hovered } from '../../stores';
import ObstaclesTab from './obstacles.svelte';
import WaypointsTab from './waypoints.svelte';

const dispatch = createEventDispatcher<{
  /** Fired when obstacles are created, destroyed, or edited. */
  'update-obstacles': Obstacle[];
}>();

const handleUpdateObstacle = (event: CustomEvent<Obstacle[]>) => {
  dispatch('update-obstacles', event.detail);
};
</script>

<nav class="py-4 pl-4 sm:h-full sm:w-[350px]">
  <ol class="mb-2 flex flex-wrap items-center">
    {#each $tabs as tabTitle}
      {@const selected = $tab === tabTitle}
      <li>
        <button
          class="border-b px-4 py-1 text-sm capitalize tracking-normal"
          class:border-black={selected}
          class:font-bold={selected}
          class:text-gray-600={!selected}
          on:click={() => {
            $tab = tabTitle;
          }}
        >
          {tabTitle}
        </button>
      </li>
    {/each}
  </ol>

  {#if $tab === NavigationTab.Waypoints}
    <ul
      on:mouseleave={() => ($hovered = null)}
      class="overflow-y-auto py-2 pr-4 sm:h-[calc(100%-38px)]"
    >
      <WaypointsTab
        on:add-waypoint
        on:delete-waypoint
      />
    </ul>
  {:else if $tab === NavigationTab.Obstacles}
    <ul
      class="overflow-y-auto py-2 pr-4 sm:h-[calc(100%-38px)]"
      on:mouseleave={() => ($hovered = null)}
    >
      <ObstaclesTab on:update={handleUpdateObstacle} />
    </ul>
  {:else}
    <div class="overflow-y-auto py-2 pr-4 sm:h-[calc(100%-38px)]">
      <slot name="tab" />
    </div>
  {/if}
</nav>
