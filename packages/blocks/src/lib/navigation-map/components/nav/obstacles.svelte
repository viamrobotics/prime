<script lang="ts">
import { IconButton, Label, TextInput } from '@viamrobotics/prime-core';
import { LngLat, LngLatBounds } from 'maplibre-gl';
import {
  type LngLat as LngLatInternal,
  type Geometry,
  useMapLibre,
  type Obstacle,
} from '$lib';
import LnglatInput from '../input/lnglat.svelte';
import GeometryInputs from '../input/geometry.svelte';
import OrientationInput from '../input/orientation.svelte';
import ObstaclesLegend from './obstacles-legend.svelte';
import {
  environment,
  hovered,
  selected,
  boundingRadius,
  obstacles,
} from '../../stores';
import { createEventDispatcher } from 'svelte';

interface Events {
  /** Fired when obstacles are created, destroyed, or edited. */
  update: Obstacle[];
}

const dispatch = createEventDispatcher<Events>();

const { map } = useMapLibre();

const handleSelect = (selection: {
  name: string;
  location: LngLatInternal;
}) => {
  const radius = boundingRadius[selection.name]!;
  const lngLat = new LngLat(selection.location.lng, selection.location.lat);
  const bounds = LngLatBounds.fromLngLat(lngLat, radius);
  map.fitBounds(bounds, {
    padding: 100,
    duration: 800,
    curve: 0.1,
  });
};

const handleLngLatInput =
  (name: string) => (event: CustomEvent<LngLatInternal>) => {
    const index = $obstacles.findIndex((obstacle) => obstacle.name === name);
    $obstacles[index]!.location = event.detail;
    dispatch('update', $obstacles);
  };

const handleDeleteObstacle = (name: string) => () => {
  $obstacles = $obstacles.filter((obstacle) => obstacle.name !== name);
  $hovered = null;
  $selected = null;
  dispatch('update', $obstacles);
};

const handleGeometryInput =
  (name: string, geoIndex: number) => (event: CustomEvent<Geometry>) => {
    const index = $obstacles.findIndex((obstacle) => obstacle.name === name);
    $obstacles[index]!.geometries[geoIndex] = event.detail;
    dispatch('update', $obstacles);
  };

const handleOrientationInput =
  (name: string, geoIndex: number) => (event: CustomEvent<number>) => {
    const index = $obstacles.findIndex((obstacle) => obstacle.name === name);
    $obstacles[index]!.geometries[geoIndex]!.pose.orientationVector.th =
      event.detail;
    dispatch('update', $obstacles);
  };

const handleKeydown = (event: KeyboardEvent) => {
  if (
    event.key === 'Backspace' &&
    $selected &&
    document.activeElement?.tagName !== 'INPUT'
  ) {
    $obstacles = $obstacles.filter((obstacle) => obstacle.name !== $selected);
    $hovered = null;
    $selected = null;
    dispatch('update', $obstacles);
  }
};

$: selectedObstacle = $obstacles.find(
  (obstacle) => obstacle.name === $selected
);
$: debugMode = $environment === 'debug';
</script>

<svelte:window on:keydown={handleKeydown} />

{#if $obstacles.length === 0}
  <li class="py-2 font-sans text-xs text-subtle-2">
    {#if debugMode}
      Add static obstacles in your navigation service config.
    {:else}
      <ObstaclesLegend />
    {/if}
  </li>
{/if}

{#each $obstacles as { name, location, geometries }, index (index)}
  <li
    class="group flex min-h-[30px] items-center border-b border-b-medium pl-2 leading-[1] last:border-b-0"
    class:pb-3={debugMode}
    class:pt-1={debugMode}
    class:bg-light={$selected === name}
    on:mouseenter={() => ($hovered = name)}
  >
    <button
      class="w-full text-left"
      on:click={() => ($selected = name)}
    >
      <div class="flex items-center justify-between gap-1.5">
        <small>{name}</small>
        <div class="flex items-center gap-1.5">
          {#if debugMode}
            <small class="text-subtle-2 opacity-60 group-hover:opacity-100">
              ({location.lat.toFixed(4)}, {location.lng.toFixed(4)})
            </small>
          {:else}
            <IconButton
              label="Delete {name}"
              icon="trash-can-outline"
              on:click={handleDeleteObstacle(name)}
            />
          {/if}
          <IconButton
            icon="image-filter-center-focus"
            label="Focus {name}"
            on:click={(event) => {
              event.stopPropagation();
              handleSelect({ name, location });
            }}
          />
        </div>
      </div>
      {#if debugMode}
        {#each geometries as geometry}
          <small class="text-subtle-2">
            {#if geometry.type === 'box'}
              Length: {geometry.length}m, Width: {geometry.width}m, Height: {geometry.height}m
            {:else if geometry.type === 'sphere'}
              Radius: {geometry.radius}m
            {:else if geometry.type === 'capsule'}
              Radius: {geometry.radius}m, Length: {geometry.length}m
            {/if}
          </small>

          {#if geometry.pose.orientationVector.th !== 0}
            <small class="mt-2 block text-subtle-2">
              Theta: {geometry.pose.orientationVector.th.toFixed(2)}
            </small>
          {/if}
        {/each}
      {/if}
    </button>
  </li>
{/each}

{#if !debugMode && selectedObstacle}
  <li
    class="group sticky bottom-0 z-10 bg-white pt-4"
    on:mouseenter={() => {
      if (selectedObstacle) {
        $hovered = selectedObstacle.name;
      }
    }}
  >
    <div class="flex items-end gap-1.5 pb-2">
      <!-- @todo(mp) obstacle API doesn't yet allow custom names. -->
      <Label>
        Name
        <TextInput
          slot="input"
          readonly
          value={selectedObstacle.name}
        />
      </Label>
    </div>
    <LnglatInput
      lng={selectedObstacle.location.lng}
      lat={selectedObstacle.location.lat}
      on:input={handleLngLatInput(selectedObstacle.name)}
    />

    {#each selectedObstacle.geometries as geometry, geoIndex (geoIndex)}
      <GeometryInputs
        {geometry}
        on:input={handleGeometryInput(selectedObstacle.name, geoIndex)}
      />
      <OrientationInput
        th={geometry.pose.orientationVector.th}
        on:input={handleOrientationInput(selectedObstacle.name, geoIndex)}
      />
    {/each}
  </li>
{/if}
