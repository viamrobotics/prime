<script lang='ts'>

import { useMapLibre, type LngLat } from '$lib';
import LngLatInput from '../components/input/lnglat.svelte';

const { map, mapCenter } = useMapLibre();

const handleInput = (event: CustomEvent<LngLat>) => {
  map.jumpTo({ center: event.detail });
}

</script>

<div class='flex flex-wrap gap-y-2 items-end justify-between w-60'>
  <LngLatInput
    lng={$mapCenter.lng}
    lat={$mapCenter.lat}
    on:input={handleInput}
  />
</div>
