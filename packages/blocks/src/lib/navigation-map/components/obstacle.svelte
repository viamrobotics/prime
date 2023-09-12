<script lang='ts'>

import { theme } from '@viamrobotics/prime-core/theme';
import * as THREE from 'three';
import { T } from '@threlte/core';
import type { Obstacle } from '$lib';
import { view, hovered, obstacleNavItems } from '../stores';

/** An obstacle to render. */
export let obstacle: Obstacle;

let material: THREE.MeshPhongMaterial;

$: name = obstacle.name;
$: material?.color.set($hovered === obstacle.name
  ? theme.extend.colors['solar-power']
  : theme.extend.colors['power-wire']
);

</script>

{#each obstacle.geometries as geometry, index (index)}
  <T.Mesh
    name={name}
    obstacle={name}
    userData.lngLat={obstacle.location}
    rotation.y={geometry.pose.orientationVector.th * THREE.MathUtils.DEG2RAD}
    on:pointerenter={() => ($hovered = name)}
    on:pointerleave={() => ($hovered = null)}
    on:click={() => $obstacleNavItems[name]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })}
  >
    <slot />

    {#if geometry.type === 'box'}
      {#if $view === '3D'}
        <T.BoxGeometry
          computeBounding={name}
          args={[geometry.length, geometry.width, geometry.height]}
          on:create={({ ref }) => ref.rotateX(-Math.PI / 2)}
        />
      {:else}
        <T.PlaneGeometry
          computeBounding={name}
          args={[geometry.length, geometry.width]}
          on:create={({ ref }) => ref.rotateX(-Math.PI / 2)}
        />
      {/if}
    {:else if geometry.type === 'sphere'}
      {#if $view === '3D'}
        <T.SphereGeometry
          computeBounding={name}
          args={[geometry.radius]}
          on:create={({ ref }) => ref.rotateX(-Math.PI / 2)}
        />
      {:else}
        <T.CircleGeometry
          computeBounding={name}
          args={[geometry.radius]}
          on:create={({ ref }) => ref.rotateX(-Math.PI / 2)}
        />
      {/if}
    {:else if geometry.type === 'capsule'}
      <T.CapsuleGeometry
        computeBounding={name}
        args={[geometry.radius, geometry.length, 16, 32]}
        on:create={({ ref }) => ref.rotateX(-Math.PI / 2)}
      />
    {/if}
    <T.MeshPhongMaterial
      bind:ref={material}
    />
  </T.Mesh>
{/each}
