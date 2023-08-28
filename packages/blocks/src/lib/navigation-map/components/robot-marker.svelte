<script lang='ts'>

import { theme } from '@viamrobotics/prime-core/theme';
import { MapLibreMarker, type LngLat } from '$lib';

export let lngLat: LngLat | undefined = undefined;

</script>

{#if lngLat}
  <MapLibreMarker
    {lngLat}
    color={theme.extend.colors['power-button']}
  />
{/if}
