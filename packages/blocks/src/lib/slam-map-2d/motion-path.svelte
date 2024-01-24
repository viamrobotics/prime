<!--
  @component
  Renders a motion plan using thick lines.
  
  Assumes the motion plan is coming in as a Float32Array in the following format:
  Float32Array([x1, y1, x2, y2, x3, y3, ...])

  Units are assumed to be in Meters.
  Must not contain NaN.
-->
<script lang="ts">
import { T, extend } from '@threlte/core';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { renderOrder } from './render-order';

extend({ Line2, LineMaterial, LineGeometry });

export let path: Float32Array | undefined;

const updatePath = (xy?: Float32Array) => {
  if (xy === undefined) {
    return;
  }

  const lineGeometry = new LineGeometry();
  const xyz: number[] = [];
  for (let i = 0; i < xy.length - 1; i += 2) {
    const x = xy[i];
    const y = xy[i + 1];
    if (x !== undefined && y !== undefined) {
      xyz.push(x, y, 0);
    }
  }

 lineGeometry.setPositions(xyz);

  return lineGeometry;
};

let geometry: LineGeometry | undefined;

$: {
  geometry?.dispose();
  geometry = updatePath(path);
}
</script>

{#if geometry}
  <T.Line2 renderOrder={renderOrder.motionPath}>
    <T.LineMaterial
      color="#FF0047"
      linewidth={0.005}
    />
    <T is={geometry} />
  </T.Line2>
{/if}
