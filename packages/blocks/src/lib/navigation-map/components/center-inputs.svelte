<script lang='ts'>

import { useMapLibre } from '$lib';
import LngLatInput from '../components/input/lnglat.svelte';

const { map, mapCenter } = useMapLibre();

</script>
<div class='absolute right-10 flex flex-wrap gap-y-2 items-end justify-between py-2.5 w-60 px-4 z-[1000]'>
  <LngLatInput
    lng={$mapCenter.lng}
    lat={$mapCenter.lat}
    on:input={(event) => map.jumpTo({ center: event.detail })}
  />
</div>
