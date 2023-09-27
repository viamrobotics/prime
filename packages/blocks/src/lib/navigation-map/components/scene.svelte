<script lang="ts">
import * as THREE from 'three';
import { T, useThrelte } from '@threlte/core';
import { view, obstacles } from '../stores';
import { computeBoundingPlugin } from '../plugins/compute-bounding';
import { renderPlugin } from '../plugins/render';
import { interactivityPlugin } from '../plugins/interactivity';
import ObstacleGeometries from './obstacle.svelte';

renderPlugin();
computeBoundingPlugin();
interactivityPlugin();

const { renderer } = useThrelte();
const clippingPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

$: flat = $view === '2D';

// This clips against the map so that objects intersecting sea level will not render over the map
$: renderer.clippingPlanes = flat ? [] : [clippingPlane];
</script>

<T.AmbientLight intensity={flat ? 2 : 1.5} />

{#if !flat}
  <T.DirectionalLight intensity={1.5} />
{/if}

{#each $obstacles as obstacle (obstacle.name)}
  <ObstacleGeometries {obstacle} />
{/each}
