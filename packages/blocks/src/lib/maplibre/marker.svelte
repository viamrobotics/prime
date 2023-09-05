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

/** The Geo position of the marker. */
export let lngLat: LngLat;

/** The relative size of the marker. */
export let scale = 1;

/** The marker color. */
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
