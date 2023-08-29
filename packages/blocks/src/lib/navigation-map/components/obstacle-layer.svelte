<script lang='ts'>

import { Canvas } from '@threlte/core';
import Scene from './scene.svelte';

</script>

<div class='absolute bottom-0 right-0 w-full h-full pointer-events-none'>
  <Canvas useLegacyLights={false}>
    <Scene />
  </Canvas>
</div>
