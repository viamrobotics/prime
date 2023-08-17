<script lang='ts'>

import { createEventDispatcher } from 'svelte';
import { waypoints } from '../../stores';
import { flyToMap } from '../../lib/fly-to-map';

type Events = {
  'delete-waypoint': string
}

const dispatch = createEventDispatcher<Events>();

</script>

{#if $waypoints.length === 0}
  <li class='text-xs text-subtle-2 font-sans py-2'>
    Click to add a waypoint.
  </li>
{/if}

{#each $waypoints as waypoint, index (waypoint.id)}
  <li class='flex group justify-between items-center py-2 sm:py-0 gap-1.5 border-b'>
    <small>Waypoint {index}</small>
    <small class='text-subtle-2 opacity-60 group-hover:opacity-100'>
      ({waypoint.lng.toFixed(4)}, {waypoint.lat.toFixed(4)})
    </small>
    <div class='flex items-center gap-1.5'>
      <v-button
        class='sm:invisible group-hover:visible text-subtle-1'
        variant='icon'
        icon='image-filter-center-focus'
        aria-label="Focus waypoint {index}"
        on:click={() => flyToMap(waypoint)}
      />
      <v-button
        class='sm:invisible group-hover:visible text-subtle-2'
        variant='icon'
        aria-label="Remove waypoint {index}"
        icon='trash-can-outline'
        on:click={() => dispatch('delete-waypoint', waypoint.id)}
      />
    </div>
  </li>
{/each}
