<script lang='ts'>

import * as THREE from 'three';
import { T, useThrelte } from '@threlte/core';
import { view, obstacles } from '../stores';
import ObstacleGeometries from './obstacle.svelte';
import { useMapLibreEvent } from '$lib/maplibre/hooks';
import { world } from '../plugins/render';
import { computeBoundingPlugin } from '../plugins/compute-bounding';
import { lngLatPlugin } from '../plugins/lnglat';
import { interactivityPlugin } from '../plugins/interactivity';

lngLatPlugin();
computeBoundingPlugin();
interactivityPlugin();

const { renderer, scene, invalidate } = useThrelte();
const clippingPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

scene.add(world);

useMapLibreEvent('move', () => {
  invalidate()
});

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