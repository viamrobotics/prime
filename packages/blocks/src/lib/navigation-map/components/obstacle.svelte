<script lang="ts">
import { theme } from '@viamrobotics/prime-core/theme';
import * as THREE from 'three';
import { T, createRawEventDispatcher } from '@threlte/core';
import { useMapLibre, type Obstacle, useMapLibreEvent } from '$lib';
import { view, hovered, obstacleNavItems } from '../stores';
import AxesHelper from './axes-helper.svelte';
import type { MapMouseEvent } from 'maplibre-gl';

/** An obstacle to render. */
export let obstacle: Obstacle;

interface $$Events {
  /** Fired when obstacles are created, destroyed, or edited. */
  update: Obstacle;
}

const dispatch = createRawEventDispatcher<$$Events>()
const { map } = useMapLibre()

let material: THREE.MeshPhongMaterial;
let selected: string | null = null

let pointerdownTheta = 0
let pointerdownRadius = 0
let pointerdownLength = 0
let pointerdownWidth = 0
let pointerdownHeight = 0

const pointermove = new THREE.Vector2()
const pointerdown = new THREE.Vector2()

const handleGeometryCreate = ({ ref }: { ref: THREE.BufferGeometry }) => {
  ref.rotateX(-Math.PI / 2);
};

const handleMouseMove = (event: MapMouseEvent) => {
  if (selected === null) return

  console.log(event.originalEvent)

  // Rotate
  if (event.originalEvent.metaKey) {
    pointermove.set(event.point.x, event.point.y)
    pointermove.sub(pointerdown)
    obstacle.geometries[0]!.pose.orientationVector.th = pointerdownTheta + pointermove.y
  
  // Scale
  } else if (event.originalEvent.altKey) {
    pointermove.set(event.point.x, event.point.y)
    pointermove.sub(pointerdown)

    if (obstacle.geometries[0]!.type === 'sphere') {
      obstacle.geometries[0]!.radius = pointerdownRadius - pointermove.y
    } else if (obstacle.geometries[0]!.type === 'box') {
      obstacle.geometries[0]!.length = pointerdownLength - pointermove.y
      obstacle.geometries[0]!.width = pointerdownWidth - pointermove.y
      obstacle.geometries[0]!.height = pointerdownHeight - pointermove.y
    } else if (obstacle.geometries[0]!.type === 'capsule') {
      obstacle.geometries[0]!.radius = pointerdownRadius - pointermove.y
      obstacle.geometries[0]!.length = pointerdownLength - pointermove.y
    }

  // Transform
  } else {
    obstacle.location.lng = event.lngLat.lng
    obstacle.location.lat = event.lngLat.lat
  }

  dispatch('update', obstacle);
};

$: name = obstacle.name;
$: active = $hovered === name || selected === name
$: (material as THREE.MeshPhongMaterial | undefined)?.color.set(
  active
    ? theme.extend.colors['solar-power']
    : theme.extend.colors['power-wire']
);

$: if (selected) {
  map.dragPan.disable();
  map.on('mousemove', handleMouseMove);
} else {
  map.dragPan.enable();
  map.off('mousemove', handleMouseMove);
}

useMapLibreEvent('mousedown', (event) => {
  pointerdown.set(event.point.x, event.point.y)

  const geometry = obstacle.geometries[0]!
  pointerdownTheta = obstacle.geometries[0]!.pose.orientationVector.th
  
  if (geometry.type === 'sphere') {
    pointerdownRadius = geometry.radius
  } else if (geometry.type === 'box') {
    pointerdownLength = geometry.length
    pointerdownWidth = geometry.width
    pointerdownHeight = geometry.height
  } else if (geometry.type === 'capsule') {
    pointerdownRadius = geometry.radius
    pointerdownLength = geometry.length
  }
})

useMapLibreEvent('mouseup', () => {
  selected = null
})

</script>

{#each obstacle.geometries as geometry, index (index)}
  <T.Mesh
    {name}
    obstacle={name}
    userData.lngLat={obstacle.location}
    rotation.y={geometry.pose.orientationVector.th * THREE.MathUtils.DEG2RAD}
    on:pointerenter={() => ($hovered = name)}
    on:pointerleave={() => ($hovered = null)}
    on:pointerdown={() => {
      selected = name
      $obstacleNavItems[name]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }}
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
