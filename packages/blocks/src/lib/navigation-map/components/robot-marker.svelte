<script lang="ts">
import { MapLibreMarker, type GeoPose } from '$lib';

export let element = document.createElement('div');
element.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='green' stroke='white' stroke-width='2' %3E%3Cpath d='M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z' /%3E%3C/svg%3E")`;
element.style.width = `30px`;
element.style.height = `30px`;

/** The Lng,Lat and rotation of the marker. */
export let pose: GeoPose | undefined = undefined;
</script>

{#if pose}
  <MapLibreMarker
    {element}
    lng={pose.lng}
    lat={pose.lat}
    rotation={pose.rotation}
  />
{/if}
