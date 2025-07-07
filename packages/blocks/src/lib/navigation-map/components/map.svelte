<script lang="ts">
import { Icon, ToggleButtons, Tooltip } from '@viamrobotics/prime-core';
import type { Map } from 'maplibre-gl';
import {
  MapLibre,
  type GeoPose,
  type MapProvider,
  MapProviders,
  NavigationControls,
  SatelliteControls,
  FollowControls,
  CenterControls,
} from '$lib';
import { environment, view } from '../stores';
import SceneLayer from './scene-layer.svelte';
import RobotMarker from './robot-marker.svelte';
import Nav from './nav/index.svelte';
import Waypoints from './waypoints.svelte';
import ObstaclesLegend from './nav/obstacles-legend.svelte';
import type { Obstacle } from '../types';

/** The Geo-pose of a robot base. */
export let baseGeoPose: GeoPose | undefined = undefined;

/** The map provider to use. */
export let provider: MapProvider = MapProviders.openStreet;

/** The API key for the map provider. */
export let providerAPIKey: string | undefined = undefined;

const minPitch = 0;
const maxPitch = 60;

export let map: Map | undefined = undefined;

export let onUpdate: (payload: Obstacle[]) => void;

const handleViewSelect = ({ detail }: CustomEvent<string>) => {
  $view = detail as '2D' | '3D';
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
    {provider}
    {providerAPIKey}
    bind:map
  >
    <NavigationControls showZoom={false} />

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
      {onUpdate}
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

      <SatelliteControls />

      <ToggleButtons
        options={['2D', '3D']}
        selected={$view}
        on:input={handleViewSelect}
      />

      <div class="flex w-60 flex-wrap items-end justify-between gap-y-2">
        <CenterControls />
      </div>
    </div>

    <div class="absolute bottom-10 right-2 z-10">
      <FollowControls
        lng={baseGeoPose?.lng}
        lat={baseGeoPose?.lat}
        following
      />
    </div>
  </MapLibre>
</div>
