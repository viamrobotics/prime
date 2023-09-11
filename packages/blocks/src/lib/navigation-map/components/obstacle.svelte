
<script lang='ts'>

import { theme } from '@viamrobotics/prime-core/theme';
import * as THREE from 'three';
import { AxesHelper } from 'trzy';
import { T, extend } from '@threlte/core';
import type { Obstacle } from '$lib';
import { view, hovered } from '../stores';

extend({ AxesHelper })

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
    on:pointerover={() => ($hovered = name)}
    on:pointerout={() => ($hovered = null)}
  >

    <!-- <T.AxesHelper args={[1, 0.1]} /> -->

    {#if geometry.type === 'box'}
      {#if $view === '3D'}
        <T.BoxGeometry
          computeBounding={name}
          args={[geometry.length, geometry.width, geometry.height]}
        />
      {:else}
        <T.PlaneGeometry
          computeBounding={name}
          args={[geometry.length, geometry.width]}
        />
      {/if}
    {:else if geometry.type === 'sphere'}
      {#if $view === '3D'}
        <T.SphereGeometry
          computeBounding={name}
          args={[geometry.radius]}
        />
      {:else}
        <T.CircleGeometry
          computeBounding={name}
          args={[geometry.radius]}
        />
      {/if}
    {:else if geometry.type === 'capsule'}
      <T.CapsuleGeometry
        computeBounding={name}
        args={[geometry.radius, geometry.length, 16, 32]}
      />
    {/if}
    <T.MeshPhongMaterial
      bind:ref={material}
    />
  </T.Mesh>
{/each}
