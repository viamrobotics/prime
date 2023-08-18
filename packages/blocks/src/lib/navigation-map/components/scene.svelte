<script lang='ts'>

import * as THREE from 'three';
import { T, useThrelte } from '@threlte/core';
import { view, obstacles } from '../stores';
import ObstacleGeometries from './obstacle.svelte';
import { useMapLibreEvent } from '$lib/maplibre/hooks';

const { renderer, invalidate } = useThrelte();
const clippingPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.1);

$: flat = $view === '2D';

// This clips against the map so that objects intersecting sea level will not render over the map
$: renderer.clippingPlanes = flat ? [] : [clippingPlane];

useMapLibreEvent('move', () => invalidate());

</script>

<T.AmbientLight intensity={flat ? 1.5 : 1} />

{#if !flat}
  <T.DirectionalLight intensity={1} />
{/if}

{#each $obstacles as obstacle (obstacle.name)}
  <ObstacleGeometries {obstacle} />
{/each}
