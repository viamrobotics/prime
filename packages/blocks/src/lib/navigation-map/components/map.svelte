<script lang="ts">
import { Button, Icon, Radio, Tooltip } from '@viamrobotics/prime-core';
import type { Map } from 'maplibre-gl';
import { MapLibre } from '$lib';
import { environment, view } from '../stores';
import ObstacleLayer from './obstacle-layer.svelte';
import RobotMarker from './robot-marker.svelte';
import CenterInputs from './center-inputs.svelte';
import Nav from './nav/index.svelte';
import Waypoints from './waypoints.svelte';
import ObstaclesLegend from './nav/obstacles-legend.svelte';

/** The Geo-pose of a robot base. */
export let baseGeoPose: { lng: number; lat: number } | undefined = undefined;

const minPitch = 0;
const maxPitch = 60;

let map: Map | undefined;
let satellite = false;

const handleViewSelect = (event: CustomEvent<{ value: string }>) => {
  $view = event.detail.value as '2D' | '3D';
};

const toggleTileset = () => {
  satellite = !satellite;
  map?.setLayoutProperty(
    'satellite',
    'visibility',
    satellite ? 'visible' : 'none'
  );
};

let didHoverTooltip = Boolean(
  localStorage.getItem('navigation-service-card-tooltip-hovered')
);
</script>

<div class="relative h-full w-full items-stretch sm:flex">
  <MapLibre
    class="relative grow"
    {minPitch}
    maxPitch={$view === '3D' ? maxPitch : minPitch}
    minZoom={6}
    bind:map
  >
    <Nav
      on:delete-waypoint
      on:update-obstacles
    >
      <slot
        name="tab"
        slot="tab"
      />
    </Nav>
    <RobotMarker lngLat={baseGeoPose} />
    <Waypoints />

    <ObstacleLayer
      slot="layer"
      on:update-obstacles
    />

    <div class="absolute right-12 top-2.5 z-10 flex items-center gap-2">
      {#if $environment === 'configure'}
        <Tooltip>
          <div
            class="relative"
            on:pointerenter={() => {
              didHoverTooltip = true;
              localStorage.setItem(
                'navigation-service-card-tooltip-hovered',
                'true'
              );
            }}
          >
            {#if didHoverTooltip === false}
              <div
                class="absolute h-full w-full animate-ping rounded-full bg-green-600"
              />
            {/if}
            <div class="relative z-10 rounded-full bg-white">
              <Icon
                size="lg"
                name="help-circle-outline"
              />
            </div>
          </div>

          <div
            class="flex flex-col p-2"
            slot="description"
          >
            <ObstaclesLegend />
          </div>
        </Tooltip>
      {/if}

      <Button on:click={toggleTileset}>
        {satellite ? 'Map' : 'Satellite'}
      </Button>
      <CenterInputs />
    </div>

    <div class="absolute bottom-12 right-3 z-10">
      <Radio
        options={['2D', '3D']}
        selected={$view}
        on:input={handleViewSelect}
      />
    </div>
  </MapLibre>
</div>
