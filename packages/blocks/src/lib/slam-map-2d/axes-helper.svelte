<script lang="ts">
import * as THREE from 'three';
import { T } from '@threlte/core';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';

export let length = 1;
export let width = 0.2;
let axesColors = ['red', 'green', 'blue'];

const TOTAL_VERTICES = 9;
const VERTEX_COMPONENTS = 3;

const line = new Line2();
const material = new LineMaterial();
const geometry = new LineGeometry();
const color = new THREE.Color();
const colors = new Float32Array(TOTAL_VERTICES * VERTEX_COMPONENTS);
const positions = new Float32Array(TOTAL_VERTICES * VERTEX_COMPONENTS);

// An arbitrary division that "feels good" using meter scale.
$: material.linewidth = width / 100;

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

$: {
  positions[X_AXIS_X_COMPONENT_INDEX] = length;
  positions[Y_AXIS_Y_COMPONENT_INDEX] = length;
  positions[Z_AXIS_Z_COMPONENT_INDEX] = length;
  geometry.setPositions(positions);
}
</script>

<T is={line}>
  <T is={geometry} />
  <T
    is={material}
    alphaToCoverage
    vertexColors
  />
</T>
