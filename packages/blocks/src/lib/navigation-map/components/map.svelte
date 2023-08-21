<script lang='ts'>

import { Radio } from '@viamrobotics/prime-core';
import type { LngLat, Map } from 'maplibre-gl';
import { MapLibre } from '$lib';
import { view, cameraMatrix } from '../stores';
import ObstacleLayer from './obstacle-layer.svelte';
import RobotMarker from './robot-marker.svelte';
import CenterInputs from './center-inputs.svelte';
import Nav from './nav/index.svelte';
import Waypoints from './waypoints.svelte';

export let robotLngLat: LngLat | undefined = undefined;

const minPitch = 0;
const maxPitch = 60;

const handleViewSelect = (event: CustomEvent<{ value: string }>) => {
  $view = event.detail.value as '2D' | '3D';
};

const handleMapCreate = (event: CustomEvent<Map>) => {
  const currentMap = event.detail

  currentMap.addLayer({
    id: 'obstacle-layer',
    type: 'custom',
    renderingMode: '3d',
    render (_ctx, viewProjectionMatrix) {
      cameraMatrix.fromArray(viewProjectionMatrix);
      currentMap.triggerRepaint();
    },
  });

  return () => {
    if (currentMap.getLayer('obstacle-layer')) {
      currentMap.removeLayer('obstacle-layer');
    }
  };
};

</script>

<div class='w-full h-full sm:flex items-stretch'>
  <MapLibre
    class='relative grow'
    {minPitch}
    maxPitch={$view === '3D' ? maxPitch : minPitch}
    on:create={handleMapCreate}
  >
    <Nav
      on:delete-waypoint
      on:create-obstacle
      on:delete-obstacle
      on:update-obstacle
    />
    <RobotMarker lngLat={robotLngLat} />
    <Waypoints />
    <ObstacleLayer slot='layer' />
    <CenterInputs />

    {#if localStorage.getItem('prime_debug_3d')}
      <div class='absolute bottom-12 right-3'>
        <Radio
          options={['2D', '3D']}
          selected={$view}
          on:input={handleViewSelect}
        />
      </div>
    {/if}
  </MapLibre>
</div>
