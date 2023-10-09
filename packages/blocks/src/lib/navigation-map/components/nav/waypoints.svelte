<script lang="ts">
import { IconButton } from '@viamrobotics/prime-core';
import { createEventDispatcher } from 'svelte';
import { waypoints } from '../../stores';
import { useMapLibre, type LngLat, useMapLibreEvent } from '$lib';

interface Events {
  /** Fired when a waypoint is added. */
  'add-waypoint': LngLat;
  /** Fired when a waypoint is deleted. */
  'delete-waypoint': string;
}

const dispatch = createEventDispatcher<Events>();
const { map } = useMapLibre();

const handleDeleteWaypoint = (id: string) => {
  $waypoints = $waypoints.filter((waypoint) => waypoint.id !== id);
  dispatch('delete-waypoint', id);
};

useMapLibreEvent('click', (event) => {
  const lngLat = {
    lng: event.lngLat.lng,
    lat: event.lngLat.lat,
  }

  $waypoints = [
    ...$waypoints,
    {
      id: crypto.randomUUID(),
      ...lngLat,
    },
  ];

  dispatch('add-waypoint', lngLat);
});
</script>

{#if $waypoints.length === 0}
  <li class="py-2 font-sans text-xs text-subtle-2">
    Click on the map to add a waypoint.
  </li>
{/if}

{#each $waypoints as waypoint, index (waypoint.id)}
  <li
    class="group flex items-center justify-between gap-1.5 border-b py-2 sm:py-0"
  >
    <small>Waypoint {index}</small>
    <small class="text-subtle-2 opacity-60 group-hover:opacity-100">
      ({waypoint.lng.toFixed(4)}, {waypoint.lat.toFixed(4)})
    </small>
    <div class="flex items-center gap-1.5">
      <IconButton
        label="Remove waypoint {index}"
        icon="trash-can-outline"
        on:click={() => handleDeleteWaypoint(waypoint.id)}
      />
      <IconButton
        icon="image-filter-center-focus"
        label="Focus waypoint {index}"
        on:click={() =>
          map.flyTo({
            zoom: 15,
            duration: 800,
            curve: 0.1,
            center: [waypoint.lng, waypoint.lat],
          })}
      />
    </div>
  </li>
{/each}
