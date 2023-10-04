<script lang="ts">
import { theme } from '@viamrobotics/prime-core/theme';
import * as THREE from 'three';
import { T, createRawEventDispatcher } from '@threlte/core';
import type {
  MapMouseEvent,
  MapLayerMouseEvent,
  MapLayerTouchEvent,
} from 'maplibre-gl';
import { useMapLibre, type Obstacle, useMapLibreEvent } from '$lib';
import { view, hovered, selected, environment, obstacles } from '../stores';
import AxesHelper from './axes-helper.svelte';

/** The obstacle name. */
export let name: string;

interface $$Events extends Record<string, unknown> {
  /** Fired when obstacles are created, destroyed, or edited. */
  update: Obstacle;
}

const dispatch = createRawEventDispatcher<$$Events>();
const { map } = useMapLibre();

let material: THREE.MeshPhongMaterial;

let pointerdownTheta = 0;
let pointerdownRadius = 0;
let pointerdownLength = 0;
let pointerdownWidth = 0;
let pointerdownHeight = 0;

let draggingObstacle = false;

const pointermove = new THREE.Vector2();
const pointerdown = new THREE.Vector2();

$: debugMode = $environment === 'debug';
$: obstacle = $obstacles.find((item) => item.name === name)!;

const handleGeometryCreate = ({ ref }: { ref: THREE.BufferGeometry }) => {
  ref.rotateX(-Math.PI / 2);
};

const handlePointerDown = (name: string) => {
  $selected = name;

  if (debugMode) {
    return;
  }

  map.dragPan.disable();
  draggingObstacle = true;
};

const handleMapPointerDown = (
  event: MapLayerMouseEvent | MapLayerTouchEvent
) => {
  if (debugMode) {
    return;
  }

  pointerdown.set(event.point.x, event.point.y);

  const geometry = obstacle.geometries[0]!;
  pointerdownTheta = obstacle.geometries[0]!.pose.orientationVector.th;

  switch (geometry.type) {
    case 'sphere': {
      pointerdownRadius = geometry.radius;
      break;
    }
    case 'box': {
      pointerdownLength = geometry.length;
      pointerdownWidth = geometry.width;
      pointerdownHeight = geometry.height;
      break;
    }
    case 'capsule': {
      pointerdownRadius = geometry.radius;
      pointerdownLength = geometry.length;
      break;
    }
  }
};

const handlePointerMove = (event: MapMouseEvent) => {
  if ($selected === null) {
    return;
  }

  // Rotate
  if (event.originalEvent.metaKey) {
    pointermove.set(event.point.x, event.point.y);
    pointermove.sub(pointerdown);
    obstacle.geometries[0]!.pose.orientationVector.th =
      pointerdownTheta + pointermove.y;

    // Scale
  } else if (event.originalEvent.altKey) {
    pointermove.set(event.point.x, event.point.y);
    pointermove.sub(pointerdown);

    const { y } = pointermove;

    switch (obstacle.geometries[0]!.type) {
      case 'sphere': {
        obstacle.geometries[0]!.radius = Math.max(0, pointerdownRadius - y);
        break;
      }
      case 'box': {
        obstacle.geometries[0]!.length = Math.max(0, pointerdownLength - y);
        obstacle.geometries[0]!.width = Math.max(0, pointerdownWidth - y);
        obstacle.geometries[0]!.height = Math.max(0, pointerdownHeight - y);
        break;
      }
      case 'capsule': {
        obstacle.geometries[0]!.radius = Math.max(0, pointerdownRadius - y);
        obstacle.geometries[0]!.length = Math.max(0, pointerdownLength - y);
        break;
      }
    }

    // Transform
  } else {
    obstacle.location.lng = event.lngLat.lng;
    obstacle.location.lat = event.lngLat.lat;
  }

  $obstacles = $obstacles;

  dispatch('update', obstacle);
};

const handlePointerUp = () => {
  draggingObstacle = false;
  map.dragPan.enable();
};

$: active = $hovered === name || $selected === name;
$: (material as THREE.MeshPhongMaterial | undefined)?.color.set(
  active
    ? theme.extend.colors['solar-power']
    : theme.extend.colors['power-wire']
);

$: if (draggingObstacle) {
  map.on('mousemove', handlePointerMove);
} else {
  map.off('mousemove', handlePointerMove);
}

useMapLibreEvent('mousedown', handleMapPointerDown);
</script>

<svelte:window on:pointerup={handlePointerUp} />

{#each obstacle.geometries as geometry, index (index)}
  <T.Mesh
    {name}
    obstacle={name}
    userData.lngLat={obstacle.location}
    rotation.y={geometry.pose.orientationVector.th * THREE.MathUtils.DEG2RAD}
    on:pointerenter={() => ($hovered = name)}
    on:pointerleave={() => ($hovered = null)}
    on:pointerdown={() => handlePointerDown(name)}
  >
    {#if geometry.type === 'box'}
      {#if active}
        <AxesHelper
          thickness={Math.max(
            geometry.length,
            geometry.width,
            geometry.height
          ) / 100}
          length={Math.max(geometry.length, geometry.width, geometry.height) *
            2}
        />
      {/if}

      {#if $view === '3D'}
        <T.BoxGeometry
          computeBounding={name}
          args={[geometry.length, geometry.width, geometry.height]}
          on:create={handleGeometryCreate}
        />
      {:else}
        <T.PlaneGeometry
          computeBounding={name}
          args={[geometry.length, geometry.width]}
          on:create={handleGeometryCreate}
        />
      {/if}
    {:else if geometry.type === 'sphere'}
      {#if active}
        <AxesHelper
          thickness={geometry.radius / 100}
          length={geometry.radius * 2}
        />
      {/if}

      {#if $view === '3D'}
        <T.SphereGeometry
          computeBounding={name}
          args={[geometry.radius]}
          on:create={handleGeometryCreate}
        />
      {:else}
        <T.CircleGeometry
          computeBounding={name}
          args={[geometry.radius]}
          on:create={handleGeometryCreate}
        />
      {/if}
    {:else if geometry.type === 'capsule'}
      {#if active}
        <AxesHelper
          thickness={Math.max(geometry.radius, geometry.length) / 100}
          length={Math.max(geometry.radius, geometry.length) * 2}
        />
      {/if}

      <T.CapsuleGeometry
        computeBounding={name}
        args={[geometry.radius, geometry.length, 16, 32]}
        on:create={handleGeometryCreate}
      />
    {/if}

    <T.MeshPhongMaterial bind:ref={material} />
  </T.Mesh>
{/each}
