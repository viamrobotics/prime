<!--
  @component

  Creates a marker on a maplibre map. Must be a child of `<MapLibre>`.
  
  ```svelte
    <MapLibreMarker
      lngLat={{ lng: 0, lat: 0 }}
      scale={1}
      visible={true}
      color={'blue'}
    />
  ```
-->
<script lang='ts'>

import { onDestroy } from 'svelte';
import { type LngLatLike, Marker } from 'maplibre-gl';
import { useMapLibre } from './hooks';

export let lngLat: LngLatLike;
export let scale = 1;
export let visible = true;
export let color = '#ff0047';

const { map } = useMapLibre()

$: marker = new Marker({ scale, color });
$: marker.getElement().style.zIndex = '1';
$: marker.setLngLat(lngLat);

$: if (visible) {
  marker.addTo(map)
} else {
  marker.remove()
}

onDestroy(() => marker.remove());

</script>
