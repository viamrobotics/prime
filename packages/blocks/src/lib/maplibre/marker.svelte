<!--
  @component

  Creates a marker on a maplibre map. Must be a child of `<MapLibre>`.
  
  ```svelte
    <MapLibreMarker
      lngLat={{ lng: 0, lat: 0 }}
      scale={1}
      color={'blue'}
    />
  ```
-->
<script lang='ts'>

import { onDestroy } from 'svelte';
import { Marker } from 'maplibre-gl';
import { useMapLibre } from './hooks';
import type { LngLat } from '$lib';

export let lngLat: LngLat;
export let scale = 1;
export let color: string = '';

const { map } = useMapLibre()

let marker: Marker | undefined

$: {
  marker?.remove();
  marker = new Marker({ scale, color });
  marker.getElement().style.zIndex = '1';
  marker?.setLngLat(lngLat);
  marker.addTo(map)
}

onDestroy(() => marker?.remove());

</script>
