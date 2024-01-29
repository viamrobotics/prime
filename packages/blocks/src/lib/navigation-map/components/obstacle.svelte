<script lang="ts">
import { theme } from '@viamrobotics/prime-core/theme';
import { T } from '@threlte/core';
import type { Obstacle } from '$lib';
import { view, hovered, obstacleNavItems } from '../stores';
import AxesHelper from './axes-helper.svelte';

/** An obstacle to render. */
export let obstacle: Obstacle;

let material: THREE.MeshPhongMaterial;

const handleGeometryCreate = ({ ref }: { ref: THREE.BufferGeometry }) => {
  ref.rotateX(-Math.PI / 2);
};

$: name = obstacle.name;
$: (material as THREE.MeshPhongMaterial | undefined)?.color.set(
  $hovered === obstacle.name
    ? theme.extend.colors['solar-power']
    : theme.extend.colors['power-wire']
);
</script>

{#each obstacle.geometries as geometry, index (index)}
  <T.Mesh
    {name}
    obstacle={name}
    userData.lngLat={obstacle.location}
    rotation.y={geometry.pose.orientationVector.th}
    on:pointerenter={() => ($hovered = name)}
    on:pointerleave={() => ($hovered = null)}
    on:click={() =>
      $obstacleNavItems[name]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })}
  >
    {#if geometry.type === 'box'}
      {#if $hovered === name}
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
      {#if $hovered === name}
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
      {#if $hovered === name}
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
