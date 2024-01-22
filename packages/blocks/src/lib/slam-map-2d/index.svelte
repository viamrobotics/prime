<!--
  @component
  Renders a 2d pointcloud from a top-down perspective.
  The pointcloud exists on the xy axis, with the camera set at z=1.
  Has the ability to also render other environmental features,
  such as the pose of a base and / or a motion plan.

  ```svelte
  <SlamMap2d
    pointcloud={new Uint8Array()} // An arraybuffer representing a PCD file.
    basePose={{ x: number, y: number, z: number }} // An optional pose of a robot.
    destination={{ x: number, y: number }} // An optional user-specificed robot destination.
    helpers={true | false} // Whether or not scene helpers should be rendered. Default true.
    motionPath={'0.1,0.2\n0.3,0.4\n'} // An optional motion path.
  />
  ```
-->
<script lang="ts">
import type * as THREE from 'three';
import { Canvas } from '@threlte/core';
import Legend from './legend.svelte';
import Scene from './scene.svelte';

/** A buffer representing a .pcd file */
export let pointcloud: Uint8Array | undefined = undefined;

/** The pose of the base of the robot */
export let basePose: { x: number; y: number; theta: number } | undefined =
  undefined;

/** A user-specificed robot destination */
export let destination: THREE.Vector2 | undefined = undefined;

/** Whether or not scene helpers should be rendered */
export let helpers = true;

/** An optional motion path */
export let motionPath: string | undefined = undefined;

/** An optional slam path */
export let slamPath: Uint8Array | undefined = undefined;
</script>

<div class="relative h-full w-full">
  <Canvas useLegacyLights={false}>
    <Scene
      {helpers}
      {pointcloud}
      {slamPath}
      {basePose}
      {destination}
      {motionPath}
      on:click
    />
  </Canvas>

  {#if helpers}
    <p class="absolute left-3 top-3 bg-white text-xs">Grid set to 1 meter</p>
  {/if}

  <Legend />
</div>
