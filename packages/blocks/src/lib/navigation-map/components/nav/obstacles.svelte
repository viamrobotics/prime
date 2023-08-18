<script lang='ts'>

import { Button, IconButton, Label, TextInput } from '@viamrobotics/prime-core';
import { type LngLat, type Geometry, useMapLibre } from '$lib';
import LnglatInput from '../input/lnglat.svelte';
import GeometryInputs from '../input/geometry.svelte';
import OrientationInput from '../input/orientation.svelte';
import { write, hovered, boundingRadius, obstacles } from '../../stores';
import { calculateBoundingBox } from '../../lib/bounding-box';
import { createEventDispatcher } from 'svelte';

type Events = {
  'create-obstacle': { lngLat: LngLat }
  'delete-obstacle': { name: string }
  'move-obstacle': { name: string; lngLat: LngLat }
  'change-obstacle-geometry': { name: string; geometry: Geometry }
};

const dispatch = createEventDispatcher<Events>();

const { map, mapCenter } = useMapLibre()

const handleSelect = (selection: { name: string; location: LngLat }) => {
  const zoom = boundingRadius[selection.name]!;
  const bb = calculateBoundingBox(zoom, selection.location);
  map.fitBounds(bb, { duration: 800, curve: 0.1 });
};

</script>

{#if $obstacles.length === 0}
  <li class='text-xs text-subtle-2 font-sans py-2'>
    {#if write}
      Click to add an obstacle.
    {:else}
      Add a static obstacle in your robot's config.
    {/if}
  </li>
{/if}

{#if $write}
  <div class='my-4'>
    <Button
      icon='plus'
      label='Add'
      on:click={() => dispatch('create-obstacle', { lngLat: $mapCenter })}
    />
  </div>
{/if}

{#each $obstacles as { name, location, geometries }, index (index)}
  {#if $write}
    <li class='group mb-8 pl-2 border-l border-l-medium'>
      <div class='flex items-end gap-1.5 pb-2'>
        <Label>
          Name
          <TextInput slot='input' class='w-full' value={name} />
        </Label>

        <IconButton
          icon='trash-can-outline'
          on:click={() => dispatch('delete-obstacle', { name })}
        />
      </div>
      <LnglatInput
        lng={location.lng}
        lat={location.lat}
        on:input={(event) => dispatch('move-obstacle', { name, lngLat: event.detail })}>
        <IconButton
          icon='image-filter-center-focus'
          label='Focus'
          on:click={() => handleSelect({ name, location })}
        />
      </LnglatInput>

      {#each geometries as geometry, geoIndex (geoIndex)}
        <GeometryInputs
          {geometry}
          on:input={(event) => dispatch('change-obstacle-geometry', { name, geometry: event.detail })}
        />
        <OrientationInput quaternion={geometry.pose.quaternion} />
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
