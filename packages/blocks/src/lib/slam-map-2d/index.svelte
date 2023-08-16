<!--
  @component
  Renders a 2d pointcloud from a top-down perspective.
  The pointcloud exists on the xy axis, with the camera set at z=1.
  Has the ability to also render other environmental features,
  such as the pose of a base and / or a motion plan.
-->
<script lang="ts">

import { createEventDispatcher } from 'svelte';
import { Canvas } from '@threlte/core';
import * as THREE from 'three';

import Legend from './legend.svelte';
import Scene from './scene.svelte';

/** A buffer representing a .pcd file */
export let pointcloud: Uint8Array | undefined = undefined;

/** The pose of the base of the robot */
export let pose: { x: number; y: number; theta: number } | undefined = undefined;

/** A user-specificed robot destination */
export let destination: THREE.Vector2 | undefined = undefined;

/** Whether or not scene helpers should be rendered */
export let helpers = true;

/** An optional motion path */
export let motionPath: string | undefined = undefined;

type Events = {

  /** Dispatched when a user clicks within the bounding box of the pointcloud */
  click: THREE.Vector3
}

const dispatch = createEventDispatcher<Events>();

const basePosition = new THREE.Vector2();
let baseRotation = 0;

const updatePose = (newPose: { x: number; y: number; theta: number }) => {
  basePosition.x = newPose.x;
  basePosition.y = newPose.y;
  baseRotation = THREE.MathUtils.degToRad(newPose.theta - 90);
};

$: if (pose) {
  updatePose(pose);
}

</script>

<div class="relative w-full h-[400px]">
  <Canvas useLegacyLights={false}>
    <Scene
      {helpers}
      {pointcloud}
      {basePosition}
      {baseRotation}
      {destination}
      {motionPath}
      on:click={(event) => dispatch('click', event)}
    />
  </Canvas>

  {#if helpers}
    <p class="absolute left-3 top-3 bg-white text-xs">
      Grid set to 1 meter
    </p>
  {/if}

  <Legend />
</div>
