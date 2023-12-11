<script lang="ts">
import { T } from '@threlte/core';
import type { ColorRepresentation } from 'three';
import type { Path } from '../types';

export let path: Path;
export let color: ColorRepresentation;
</script>

{#each path as loc}
  <T.Mesh userData.lngLat={loc}>
    <T.SphereGeometry args={[0.2]} />
    <T.MeshBasicMaterial {color} />
  </T.Mesh>
{/each}

<T.Line userData.lngLat={path}>
  <T.BufferGeometry />
  <T.LineDashedMaterial
    {color}
    dashSize={0.1}
    gapSize={0.1}
  />
</T.Line>
