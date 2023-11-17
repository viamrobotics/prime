<script lang="ts">
import type { LngLat } from '$lib/maplibre/types';
import { T } from '@threlte/core';
import { Color } from 'three';

export let plan: LngLat[];
export let color: number;

// The typings for color are incorrect - they expect a number but need a THREE.Color.
$: threeColor = new Color(color) as unknown as number;
</script>

{#each plan as loc}
  <T.Mesh userData.lngLat={loc}>
    <T.SphereGeometry />
    <T.MeshPhongMaterial color={threeColor} />
  </T.Mesh>
{/each}

<T.Line userData.lngLat={plan}>
  <T.BufferGeometry />
  <T.LineDashedMaterial
    color={threeColor}
    args={[{ dashSize: 0.5, gapSize: 0.5 }]}
  />
</T.Line>
