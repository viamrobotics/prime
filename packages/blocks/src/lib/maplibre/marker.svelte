<script lang='ts'>

import { onDestroy } from 'svelte';
import { type LngLatLike, Marker } from 'maplibre-gl';
import { useMapLibre } from './hooks';

export let lngLat: LngLatLike;
export let scale = 1;
export let visible = true;
export let color = '#ff0047';

const marker = new Marker({ scale, color });
marker.getElement().style.zIndex = '1';

$: marker.setLngLat(lngLat);

$: {
  const { map } = useMapLibre()
    console.log(map)
  if (map && visible) {
    marker.addTo(map);
  }
}

$: if (!visible) {
  marker.remove();
}

onDestroy(() => marker.remove());

</script>
