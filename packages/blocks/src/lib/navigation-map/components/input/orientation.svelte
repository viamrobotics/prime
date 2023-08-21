<script lang='ts'>

import type * as THREE from 'three';
import VectorInput from '../vector-input.svelte';
import { OrientationVector } from '@viamrobotics/three';

export let quaternion: THREE.Quaternion;
export let view: '2D' | '3D' = '2D';

const ov = new OrientationVector();

$: ov.setFromQuaternion(quaternion);

</script>

{#if view === '2D'}
  <VectorInput
    labels={['th']}
    values={[ov.th]}
    step={0.1}
    on:input
  />
{:else if view === '3D'}
  <VectorInput
    labels={['x', 'y', 'z', 'w']}
    values={[quaternion.x, quaternion.y, quaternion.z, quaternion.w]}
    on:input
  />
{/if}
