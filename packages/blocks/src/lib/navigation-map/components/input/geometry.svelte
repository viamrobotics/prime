<script lang="ts">
import { Radio, VectorInput } from '@viamrobotics/prime-core';
import { createEventDispatcher } from 'svelte';
import type { Geometry, Shapes } from '$lib';
import { createGeometry } from '../../lib/create-geometry';

/** The geometry to edit. */
export let geometry: Geometry;

const dispatch = createEventDispatcher<{
  /** Fires when a geometry is edited. */
  input: Geometry;
}>();

const getNormalizedSize = () => {
  switch (geometry.type) {
    case 'box':
      return geometry.length > geometry.height
        ? geometry.length / 2
        : geometry.height / 2;
    case 'sphere':
      return geometry.radius;
    case 'capsule':
      return geometry.length;
  }
};

const handleShapeSelect = (event: CustomEvent<{ value: string }>) => {
  const currentSize = getNormalizedSize();
  const currentRotation = geometry.pose.orientationVector.th;
  const nextType = event.detail.value.toLowerCase() as Shapes;
  dispatch('input', createGeometry(nextType, currentSize, currentRotation));
};

const handleDimensionsInput = (event: CustomEvent<Record<string, number>>) => {
  const nextGeometry = { ...geometry };

  switch (nextGeometry.type) {
    case 'box': {
      const length = event.detail['Length (m)'];
      const width = event.detail['Width (m)'];
      const height = event.detail['Height (m)'];

      if (length !== undefined) {
        nextGeometry.length = length;
      }
      if (width !== undefined) {
        nextGeometry.width = width;
      }
      if (height !== undefined) {
        nextGeometry.height = height;
      }
      break;
    }
    case 'sphere': {
      const radius = event.detail['Radius (m)'];

      if (radius !== undefined) {
        nextGeometry.radius = radius;
      }
      break;
    }
    case 'capsule': {
      const radius = event.detail['Radius (m)'];
      const length = event.detail['Length (m)'];

      if (radius !== undefined) {
        nextGeometry.radius = radius;
      }
      if (length !== undefined) {
        nextGeometry.length = length;
      }
      break;
    }
  }

  dispatch('input', nextGeometry);
};

const shapeMap = {
  box: 'Box',
  sphere: 'Sphere',
  capsule: 'Capsule',
};
</script>

<div class="my-2 flex flex-col gap-2">
  <Radio
    label="Shape"
    options={['Box', 'Sphere', 'Capsule']}
    selected={shapeMap[geometry.type]}
    on:input={handleShapeSelect}
  />

  {#if geometry.type === 'box'}
    <VectorInput
      labels={['Length (m)', 'Width (m)', 'Height (m)']}
      values={{
        'Length (m)': geometry.length,
        'Width (m)': geometry.width,
        'Height (m)': geometry.height,
      }}
      on:input={handleDimensionsInput}
    />
  {:else if geometry.type === 'capsule'}
    <VectorInput
      labels={['Radius (m)', 'Length (m)']}
      values={{ 'Radius (m)': geometry.radius, 'Length (m)': geometry.length }}
      on:input={handleDimensionsInput}
    />
  {:else if geometry.type === 'sphere'}
    <VectorInput
      labels={['Radius (m)']}
      values={{ 'Radius (m)': geometry.radius }}
      on:input={handleDimensionsInput}
    />
  {/if}
</div>
