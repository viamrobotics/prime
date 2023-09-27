<script lang="ts">
import { MapLibreMarker, type LngLat } from '$lib';

export let robotIcon = document.createElement('div');
robotIcon.className = 'robot-marker';
robotIcon.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='green'%3E%3Cpath d='M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z' /%3E%3C/svg%3E")`;
robotIcon.style.width = `20px`;
robotIcon.style.height = `20px`;

/** The Lng,Lat of the marker. */
export let lngLat: LngLat | undefined = undefined;

/** The rotation of the marker. */
export let heading = 0;
</script>

{#if lngLat}
  <MapLibreMarker
    icon={robotIcon}
    {lngLat}
    rotation={heading}
  />
{/if}
