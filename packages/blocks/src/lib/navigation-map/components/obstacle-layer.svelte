<script lang="ts">
import { Canvas } from '@threlte/core';
import Scene from './scene.svelte';
import { useMapLibre } from '$lib/maplibre/hooks';
import { onMount } from 'svelte';
import { cameraMatrix } from '../stores';

const { map } = useMapLibre();

onMount(() => {
  map.addLayer({
    id: 'obstacle-layer',
    type: 'custom',
    renderingMode: '3d',
    render(_ctx, viewProjectionMatrix) {
      cameraMatrix.fromArray(viewProjectionMatrix);
      // This is necessary to lock-step the two canvases.
      map.triggerRepaint();
    },
  });

  return () => {
    map.removeLayer('obstacle-layer');
  };
});
</script>

<div class="pointer-events-none absolute bottom-0 right-0 h-full w-full">
  <Canvas useLegacyLights={false}>
    <Scene />
  </Canvas>
</div>
