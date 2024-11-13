<script lang="ts">
import { Camera, Plane, Vector3 } from 'three';
import { T, useThrelte } from '@threlte/core';
import type { LngLat } from 'maplibre-gl';
import type { Obstacle } from '../types';
import { view, obstacles, paths, selected, environment } from '../stores';
import { computeBoundingPlugin } from '../plugins/compute-bounding';
import { interactivityPlugin } from '../plugins/interactivity';
import { createObstacle } from '../lib/create-obstacle';
import { createName } from '../lib/create-name';
import { useMapLibreThreeRenderer } from '../../index';
import ObstacleGeometries from './obstacle.svelte';
import Drawtool from './draw-tool.svelte';
import Path from './path.svelte';
import { theme } from '@viamrobotics/prime-core/theme';

export let onUpdate: (payload: Obstacle[]) => void;

computeBoundingPlugin();
interactivityPlugin();

const { renderer, scene, camera } = useThrelte();
const clippingPlane = new Plane(new Vector3(0, 1, 0), 0);

camera.set(new Camera());

useMapLibreThreeRenderer(scene, camera, () => {
  renderer.render(scene, camera.current);
});

const handleUpdate = () => {
  onUpdate($obstacles);
};

const handleDraw = ({
  width,
  height,
  center,
}: {
  width: number;
  height: number;
  center: LngLat;
}) => {
  const names = $obstacles.map((obstacle) => obstacle.name);
  const name = createName(names, 'obstacle', $obstacles.length);
  const obstacle = createObstacle(name, center);

  if (obstacle.geometries[0]!.type === 'box') {
    obstacle.geometries[0]!.length = width;
    obstacle.geometries[0]!.width = height;
  }

  $obstacles = [obstacle, ...$obstacles];
  $selected = obstacle.name;

  onUpdate($obstacles);
};

$: flat = $view === '2D';

// This clips against the map so that objects intersecting sea level will not render over the map
$: renderer.clippingPlanes = flat ? [] : [clippingPlane];
</script>

<T.AmbientLight intensity={flat ? 2 : 1.5} />

{#if !flat}
  <T.DirectionalLight intensity={1.5} />
{/if}

{#each $obstacles as obstacle (obstacle.name)}
  <ObstacleGeometries
    name={obstacle.name}
    onUpdate={handleUpdate}
  />
{/each}

{#each $paths as path}
  <Path
    {path}
    color={theme.extend.colors.hyperlink}
  />
{/each}

{#if $environment === 'configure'}
  <Drawtool onUpdate={handleDraw} />
{/if}
