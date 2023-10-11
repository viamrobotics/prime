<script lang="ts">
import { MapLibreMarker } from '$lib';
import { waypoints } from '../stores';
</script>

{#each $waypoints as waypoint (waypoint.id)}
  <MapLibreMarker
    scale={0.7}
    pose={{ lng: waypoint.lng, lat: waypoint.lat, rotation: 0 }}
  />
{/each}
