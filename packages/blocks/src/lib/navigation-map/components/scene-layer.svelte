<script lang="ts">
import { Canvas } from '@threlte/core';
import Scene from './scene.svelte';
import type { Obstacle } from '../types';

export let onUpdate: (payload: Obstacle[]) => void;
</script>

<div class="pointer-events-none absolute bottom-0 right-0 h-full w-full">
  <Canvas autoRender={false}>
    <Scene {onUpdate} />
  </Canvas>
</div>
