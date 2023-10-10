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
<script lang="ts">
import { onDestroy } from 'svelte';
import { Marker, LngLat } from 'maplibre-gl';
import { useMapLibre } from './hooks';
import type { GeoPose } from '$lib';

/** The Geo position of the marker. */
export let pose: GeoPose | undefined;

/** The relative size of the marker. */
export let scale = 1;

/** The marker color. */
export let color = '';

/** The marker icon */
export let element: HTMLElement | undefined = undefined;

const { map } = useMapLibre();

let marker: Marker | undefined;

$: if (pose) {
  marker?.remove();
  marker = new Marker(element ? { element, scale, color } : { scale, color });
  marker.getElement().style.zIndex = '1';
  marker.setLngLat(new LngLat(pose.lng, pose.lat));
  marker.setRotation(pose.rotation);
  marker.addTo(map);
}

onDestroy(() => marker?.remove());
</script>
