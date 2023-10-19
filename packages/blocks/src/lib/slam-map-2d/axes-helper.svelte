<script lang="ts">
import * as THREE from 'three';
import { T } from '@threlte/core';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';

export let length = 1;
export let width = 0.2;

const line = new Line2();
const material = new LineMaterial();
const geometry = new LineGeometry();
const axes = ['red', 'green', 'blue'];
const color = new THREE.Color();
const colors = new Float32Array(27);

for (const [index, axis] of axes.entries()) {
  color.set(axis);

  for (let j = index * 9; j < index * 9 + 9; j += 3) {
    colors[j + 0] = color.r;
    colors[j + 1] = color.g;
    colors[j + 2] = color.b;
  }
}

geometry.setColors(colors);

$: linewidth = width / 100;
$: material.linewidth = linewidth;

$: {
  const positions = new Float32Array(27);
  positions[3] = length;
  positions[13] = length;
  positions[23] = length;
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
