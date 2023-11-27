<script lang="ts">
import type { LngLat } from '$lib/maplibre/types';
import { T } from '@threlte/core';
import type { ColorRepresentation } from 'three';

export let plan: LngLat[];
export let color: ColorRepresentation;
</script>

{#each plan as loc}
  <T.Mesh userData.lngLat={loc}>
    <T.SphereGeometry />
    <T.MeshBasicMaterial {color} />
  </T.Mesh>
{/each}

<T.Line userData.lngLat={plan}>
  <T.BufferGeometry />
  <T.LineDashedMaterial
    {color}
    dashSize={0.5}
    gapSize={0.5}
  />
</T.Line>
