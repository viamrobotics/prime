<script lang="ts">
import { persisted } from '@viamrobotics/prime-core';
import { useMapLibre, useMapLibreEvent, type LngLat } from '$lib';
import LngLatInput from '../components/input/lnglat.svelte';

const { map, mapCenter } = useMapLibre();
const lastPosition = persisted<{ center: LngLat, zoom: number }>('viam-blocks-navigation-map-center')

if ($lastPosition) {
  map.jumpTo({ center: $lastPosition.center, zoom: $lastPosition.zoom })
}

const handleInput = (event: CustomEvent<LngLat>) => {
  map.jumpTo({ center: event.detail });
};

useMapLibreEvent('move', () => {
  lastPosition.set({
    center: map.getCenter(),
    zoom: map.getZoom()
  })
})
</script>

<div class="flex w-60 flex-wrap items-end justify-between gap-y-2">
  <LngLatInput
    lng={$mapCenter.lng}
    lat={$mapCenter.lat}
    on:input={handleInput}
  />
</div>
