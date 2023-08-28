<script lang='ts'>

import { IconButton, Label, TextInput } from '@viamrobotics/prime-core';
import { type LngLat, type Geometry, useMapLibre, type Obstacle, useMapLibreEvent } from '$lib';
import LnglatInput from '../input/lnglat.svelte';
import GeometryInputs from '../input/geometry.svelte';
import OrientationInput from '../input/orientation.svelte';
import { write, hovered, boundingRadius, obstacles } from '../../stores';
import { calculateBoundingBox } from '../../lib/bounding-box';
import { createEventDispatcher } from 'svelte';
import { createObstacle } from '$lib/navigation-map/lib/create-obstacle';
import { createName } from '$lib/navigation-map/lib/create-name';

type Events = {
  update: Obstacle[]
};

const dispatch = createEventDispatcher<Events>();

const { map } = useMapLibre();

const handleSelect = (selection: { name: string; location: LngLat }) => {
  const zoom = boundingRadius[selection.name]!;
  const bb = calculateBoundingBox(zoom, selection.location);
  map.fitBounds(bb, { duration: 800, curve: 0.1 });
};

const handleLngLatInput = (name: string) => (event: CustomEvent<LngLat>) => {
  const index = $obstacles.findIndex((obstacle) => obstacle.name === name);
  $obstacles[index]!.location = event.detail;
  dispatch('update', $obstacles);
};

const handleDeleteObstacle = (name: string) => () => {
  $obstacles = $obstacles.filter((obstacle) => obstacle.name !== name);
};

const handleGeometryInput = (name: string, geoIndex: number) => (event: CustomEvent<Geometry>) => {
  const index = $obstacles.findIndex((obstacle) => obstacle.name === name);
  $obstacles[index]!.geometries[geoIndex] = event.detail;
  dispatch('update', $obstacles);
};

const handleOrientationInput = (name: string, geoIndex: number) => (event: CustomEvent<number>) => {
  const index = $obstacles.findIndex((obstacle) => obstacle.name === name);
  $obstacles[index]!.geometries[geoIndex]!.pose.orientationVector.th = event.detail;
  dispatch('update', $obstacles);
}

useMapLibreEvent('click', (event) => {
  const names = $obstacles.map((obstacle) => obstacle.name);
  const name = createName(names, 'obstacle', $obstacles.length);
  $obstacles = [createObstacle(name, event.lngLat), ...$obstacles];
  dispatch('update', $obstacles);
})

</script>

{#if $obstacles.length === 0}
  <li class='text-xs text-subtle-2 font-sans py-2'>
    {#if write}
      Click on the map to add an obstacle.
    {:else}
      Add static obstacles in your navigation service config.
    {/if}
  </li>
{/if}

{#each $obstacles as { name, location, geometries }, index (index)}
  {#if $write}
    <li class='group mb-8 pl-2 border-l border-l-medium'>
      <div class='flex items-end gap-1.5 pb-2'>
        <!-- @todo(mp) obstacle API doesn't yet allow custom names. -->
        <Label>
          Name
          <TextInput slot='input' readonly value={name} />
        </Label>

        <div class='grow'>
          <IconButton
            label='Delete {name}'
            icon='trash-can-outline'
            on:click={handleDeleteObstacle(name)}
          />
        </div>
      </div>
      <LnglatInput
        lng={location.lng}
        lat={location.lat}
        on:input={handleLngLatInput(name)}
      >
        <div class='grow'>
          <IconButton
            label='Focus {name}'
            icon='image-filter-center-focus'
            on:click={() => handleSelect({ name, location })}
          />
        </div>
        
      </LnglatInput>

      {#each geometries as geometry, geoIndex (geoIndex)}
        <GeometryInputs
          {geometry}
          on:input={handleGeometryInput(name, geoIndex)}
        />
        <OrientationInput
          th={geometry.pose.orientationVector.th}
          on:input={handleOrientationInput(name, geoIndex)}
        />
        
      {/each}
    </li>

  {:else}
    <li
      class='group border-b border-b-medium last:border-b-0 py-3 leading-[1]'
      on:mouseenter={() => ($hovered = name)}
    >
      <div class='flex justify-between items-center gap-1.5'>
        <small>{name}</small>
        <div class='flex items-center gap-1.5'>
          <small class='text-subtle-2 opacity-60 group-hover:opacity-100'>
            ({location.lat.toFixed(4)}, {location.lng.toFixed(4)})
          </small>
          <IconButton
            icon='image-filter-center-focus'
            label="Focus {name}"
            on:click={() => handleSelect({ name, location })}
          />
        </div>
      </div>
      {#each geometries as geometry}
        <small class='text-subtle-2'>
          {#if geometry.type === 'box'}
            Length: {geometry.length}m, Width: {geometry.width}m, Height: {geometry.height}m
          {:else if geometry.type === 'sphere'}
            Radius: {geometry.radius}m
          {:else if geometry.type === 'capsule'}
            Radius: {geometry.radius}m, Length: { geometry.length}m
          {/if}
        </small>

        {#if geometry.pose.orientationVector.th !== 0}
          <small class='block text-subtle-2 mt-2'>
            Theta: {geometry.pose.orientationVector.th.toFixed(2)}
          </small>
        {/if}
      {/each}
    </li>
  {/if}
{/each}
