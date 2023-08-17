<script lang='ts'>

import type { Map } from 'maplibre-gl';
import { map, mapZoom, mapCenter, view, mapSize, cameraMatrix } from '../stores';
import MapLibre from '$lib/maplibre/index.svelte';
import ObstacleLayer from './obstacle-layer.svelte';
import Waypoints from './waypoints.svelte';
import RobotMarker from './robot-marker.svelte';

export let name: string;

const minPitch = 0;
const maxPitch = 60;

const handleViewSelect = (event: CustomEvent) => {
  $view = event.detail.value;
};

const handleMove = (currentMap: Map) => {
  mapCenter.set(currentMap.getCenter());
  mapZoom.set(currentMap.getZoom() / currentMap.getMaxZoom());
};

const handleResize = (currentMap: Map) => {
  mapSize.update((value) => {
    const { clientWidth, clientHeight } = currentMap.getCanvas();
    value.width = clientWidth;
    value.height = clientHeight;
    return value;
  });
};

const handleMapCreate = (currentMap: Map) => {
  $map = currentMap;

  currentMap.addLayer({
    id: 'obstacle-layer',
    type: 'custom',
    renderingMode: '3d',
    render (_ctx, viewProjectionMatrix) {
      cameraMatrix.fromArray(viewProjectionMatrix);
      currentMap.triggerRepaint();
    },
  });

  handleMove(currentMap);
  handleResize(currentMap);

  return () => {
    if (currentMap.getLayer('obstacle-layer')) {
      currentMap.removeLayer('obstacle-layer');
    }
  };
};

$: {
  $map?.setMinPitch(minPitch);
  $map?.setMaxPitch();
}

</script>

<MapLibre
  {minPitch}
  maxPitch={$view === '3D' ? maxPitch : minPitch}
  on:create={(event) => handleMapCreate(event.detail)}
  on:move={(event) => handleMove(event.detail)}
  on:resize={(event) => handleResize(event.detail)}
/>

{#if localStorage.getItem('debug_3d')}
  <v-radio
    class='absolute bottom-12 right-3'
    options='2D,3D'
    selected={$view}
    on:input={handleViewSelect}
  />
{/if}

{#if $map}
  <RobotMarker {name} />
  <Waypoints {name} map={$map} />
  <ObstacleLayer />
{/if}
