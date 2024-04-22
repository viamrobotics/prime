<script lang="ts">
import { Button, Icon, ToggleButtons, Tooltip } from '@viamrobotics/prime-core';
import type { Map } from 'maplibre-gl';
import { MapLibre, type GeoPose, MapLibreControls } from '$lib';
import { environment, view } from '../stores';
import SceneLayer from './scene-layer.svelte';
import RobotMarker from './robot-marker.svelte';
import CenterInputs from './center-inputs.svelte';
import Nav from './nav/index.svelte';
import Waypoints from './waypoints.svelte';
import ObstaclesLegend from './nav/obstacles-legend.svelte';
import { onDestroy } from 'svelte';

/** The Geo-pose of a robot base. */
export let baseGeoPose: GeoPose | undefined = undefined;

const minPitch = 0;
const maxPitch = 60;

export let map: Map | undefined = undefined;

let satellite = false;

const handleViewSelect = ({ detail }: CustomEvent<string>) => {
  $view = detail as '2D' | '3D';
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

let isFollowingBase = false;
let af = 0;
const followBase = () => {
  if (baseGeoPose && isFollowingBase) {
    map?.setCenter(baseGeoPose);
    af = requestAnimationFrame(followBase);
  }
};

const startFollowingBase = () => {
  isFollowingBase = true;
  af = requestAnimationFrame(followBase);
};

const stopFollowingBase = () => {
  isFollowingBase = false;
  cancelAnimationFrame(af);
};

onDestroy(() => {
  cancelAnimationFrame(af);
});
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="relative h-full w-full items-stretch sm:flex"
  on:mousedown={stopFollowingBase}
  on:wheel={stopFollowingBase}
>
  <MapLibre
    class="relative grow"
    {minPitch}
    maxPitch={$view === '3D' ? maxPitch : minPitch}
    minZoom={6}
    bind:map
  >
    <MapLibreControls options={{ showZoom: false }} />

    <Nav
      on:add-waypoint
      on:delete-waypoint
      on:update-obstacles
    >
      <slot
        name="tab"
        slot="tab"
      />
    </Nav>
    <RobotMarker pose={baseGeoPose} />
    <Waypoints />

    <SceneLayer
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
            {#if !didHoverTooltip}
              <div
                class="absolute -m-1 h-[28px] w-[28px] animate-ping rounded-full bg-success-dark"
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
      <ToggleButtons
        options={['2D', '3D']}
        selected={$view}
        on:input={handleViewSelect}
      />
      <CenterInputs />
    </div>

    <div class="absolute bottom-10 right-2 z-10">
      <Button
        disabled={!baseGeoPose}
        on:click={isFollowingBase ? stopFollowingBase : startFollowingBase}
      >
        <Icon
          name={isFollowingBase
            ? 'navigation-variant'
            : 'navigation-variant-outline'}
        />
      </Button>
    </div>
  </MapLibre>
</div>
