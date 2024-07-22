<script lang="ts">
import { Color } from 'three';
import { T } from '@threlte/core';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';

export let length: number | [x: number, y: number, z: number] = 1;
export let width = 1;
export let axesColors = ['red', 'green', 'blue'];
export let depthTest = true;

const TOTAL_VERTICES = 9;
const VERTEX_COMPONENTS = 3;

const line = new Line2();
const material = new LineMaterial();
const geometry = new LineGeometry();
const color = new Color();
const colors = new Float32Array(TOTAL_VERTICES * VERTEX_COMPONENTS);
const positions = new Float32Array(TOTAL_VERTICES * VERTEX_COMPONENTS);

$: material.linewidth = width;

// Assign colors per vertex
$: {
  for (const [index, axis] of axesColors.entries()) {
    color.set(axis);

    const axisBufferStart = index * TOTAL_VERTICES;
    const axisBufferEnd = axisBufferStart + TOTAL_VERTICES;

    for (let j = axisBufferStart; j < axisBufferEnd; j += VERTEX_COMPONENTS) {
      colors[j + 0] = color.r;
      colors[j + 1] = color.g;
      colors[j + 2] = color.b;
    }
  }

  geometry.setColors(colors);
}

const X_AXIS_X_COMPONENT_INDEX = 3;
const Y_AXIS_Y_COMPONENT_INDEX = 13;
const Z_AXIS_Z_COMPONENT_INDEX = 23;

$: xLength = Array.isArray(length) ? length[0] : length;
$: yLength = Array.isArray(length) ? length[1] : length;
$: zLength = Array.isArray(length) ? length[2] : length;

$: {
  positions[X_AXIS_X_COMPONENT_INDEX] = xLength;
  positions[Y_AXIS_Y_COMPONENT_INDEX] = yLength;
  positions[Z_AXIS_Z_COMPONENT_INDEX] = zLength;
  geometry.setPositions(positions);
}
</script>

<T
  is={line}
  {...$$restProps}
  raycast={() => null}
>
  <T is={geometry} />
  <T
    is={material}
    alphaToCoverage
    vertexColors
    {depthTest}
  />
</T>
