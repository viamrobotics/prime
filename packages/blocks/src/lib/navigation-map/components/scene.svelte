<script lang='ts'>

import * as THREE from 'three';
import { T, useThrelte } from '@threlte/core';
import { AxesHelper } from 'trzy';
import { view, obstacles, hovered } from '../stores';
import ObstacleGeometries from './obstacle.svelte';
import { computeBoundingPlugin } from '../plugins/compute-bounding';
import { lngLatPlugin } from '../plugins/lnglat';
import { interactivityPlugin } from '../plugins/interactivity';

lngLatPlugin();
computeBoundingPlugin();
interactivityPlugin();

const { renderer } = useThrelte();
const clippingPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

$: flat = $view === '2D';

// This clips against the map so that objects intersecting sea level will not render over the map
$: renderer.clippingPlanes = flat ? [] : [clippingPlane];

$: console.log($obstacles.length)

</script>

<T.AmbientLight intensity={flat ? 2 : 1.5} />

{#if !flat}
  <T.DirectionalLight intensity={1.5} />
{/if}

{#each $obstacles as obstacle (obstacle.name)}
  <ObstacleGeometries {obstacle}>
    {#if false && $hovered === obstacle.name}
      <T is={AxesHelper} />
    {/if}
  </ObstacleGeometries>
{/each}
