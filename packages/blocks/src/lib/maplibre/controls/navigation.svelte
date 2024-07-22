<!-- 
  @component
  
  Adds a set of navigation controls.

  @example

  ```html
    <MapLibre>
      <NavigationControls />
    </MapLibre>
  ```

  @see https://maplibre.org/maplibre-gl-js/docs/API/classes/NavigationControl/
-->
<script lang="ts">
import { NavigationControl, type ControlPosition } from 'maplibre-gl';
import { onMount } from 'svelte';
import { useMapLibre } from '../hooks';

export let position: ControlPosition = 'top-right';

export let showCompass = true;
export let showZoom = true;
export let visualizePitch = true;

const { map } = useMapLibre();
const control = new NavigationControl();
$: control.options.showCompass = showCompass;
$: control.options.showZoom = showZoom;
$: control.options.visualizePitch = visualizePitch;

onMount(() => {
  map.addControl(control, position);

  return () => {
    map.removeControl(control);
  };
});
</script>
