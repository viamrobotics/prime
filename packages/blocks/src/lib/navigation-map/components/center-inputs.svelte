<script lang="ts">
import { useMapLibre, type LngLat } from '$lib';
import LngLatInput from '../components/input/lnglat.svelte';

const { map, mapCenter } = useMapLibre();

const handleInput = (event: CustomEvent<LngLat>) => {
  map.jumpTo({ center: event.detail });
};
</script>

<div class="flex w-60 flex-wrap items-end justify-between gap-y-2">
  <LngLatInput
    lng={$mapCenter.lng}
    lat={$mapCenter.lat}
    on:input={handleInput}
  />
</div>
