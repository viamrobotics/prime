<script lang="ts">
import { Canvas } from '@threlte/core';
import Scene from './scene.svelte';
</script>

<div class="pointer-events-none absolute bottom-0 right-0 h-full w-full">
  <Canvas useLegacyLights={false}>
    <Scene on:update-obstacles />
  </Canvas>
</div>
