<script lang="ts">
import { MapLibreMarker } from '$lib';
import { waypoints } from '../stores';
</script>

{#each $waypoints as waypoint (waypoint.id)}
  <MapLibreMarker
    scale={0.7}
    lng={waypoint.lng}
    lat={waypoint.lat}
  />
{/each}
