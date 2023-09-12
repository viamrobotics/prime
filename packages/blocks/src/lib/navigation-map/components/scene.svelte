<script lang="ts">
import * as THREE from 'three';
import { T, useThrelte, useRender } from '@threlte/core';
import { view, obstacles } from '../stores';
import ObstacleGeometries from './obstacle.svelte';
import { useMapLibre, useMapLibreEvent } from '$lib/maplibre/hooks';
import {
  renderPlugin,
  world,
  scenes,
  axes,
  setFrameloops,
} from '../plugins/render';
import { computeBoundingPlugin } from '../plugins/compute-bounding';

renderPlugin();
computeBoundingPlugin();

const { renderer, scene, camera, invalidate } = useThrelte();
const { map } = useMapLibre();
const clippingPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.1);

renderer.autoClear = false;

setFrameloops(map);
scene.add(world);

useMapLibreEvent('move', () => {
  invalidate();
  setFrameloops(map);
});

useRender(() => {
  renderer.clear();

  axes.visible = scenes.length > 0;

  for (const { ref, matrix } of scenes) {
    camera.current.projectionMatrix = matrix;
    axes.length = (ref.geometry.boundingSphere?.radius ?? 0) * 2;

    world.add(ref);
    renderer.render(scene, camera.current);
    world.remove(ref);
  }
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
