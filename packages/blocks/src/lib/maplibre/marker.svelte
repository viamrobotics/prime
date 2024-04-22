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

/** The Geo position of the marker. */
export let lng = 0;
export let lat = 0;
export let rotation = 0;

/** The relative size of the marker. */
export let scale = 1;

/** The marker color. */
export let color = '';

/** The marker icon */
export let element: HTMLElement | undefined = undefined;

const { map } = useMapLibre();

let marker: Marker | undefined;

$: {
  marker?.remove();
  marker = new Marker(element ? { element, scale, color } : { scale, color });
  marker.setLngLat(new LngLat(0, 0));
  marker.getElement().style.zIndex = '1';
  marker.addTo(map);
}
$: marker?.setLngLat(new LngLat(lng, lat));
$: marker?.setRotation(rotation);

onDestroy(() => marker?.remove());
</script>
