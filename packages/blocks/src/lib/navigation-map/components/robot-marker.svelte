<script lang='ts'>

import { MapLibreMarker } from '$lib';
import type { LngLatLike } from 'maplibre-gl';

export let lngLat: LngLatLike | undefined = undefined;

</script>

{#if lngLat}
  <MapLibreMarker
    {lngLat}
    color='#01EF83'
  />
{/if}
