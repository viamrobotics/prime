<script lang="ts">
import { MapLibreDirectionalMarker, type GeoPose } from '$lib';

/** The Lng,Lat and rotation of the marker. */
export let pose: GeoPose | undefined = undefined;
</script>

{#if pose}
  <MapLibreDirectionalMarker
    lng={pose.lng}
    lat={pose.lat}
    rotation={pose.rotation}
  />
{/if}
