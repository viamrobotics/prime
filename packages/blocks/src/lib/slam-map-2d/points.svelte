<!--
  @component
  Renders THREE.Points from a .pcd file.
  Creates an invisible plane mesh with dimensions matching the diameter of
  the points' bounding sphere.
  Emits click events that intersect this plane.
-->
<script lang="ts">
import * as THREE from 'three';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader';
import { T } from '@threlte/core';
import { renderOrder } from './render-order';
import { onMount } from 'svelte';
import { mapColorAttributeGrayscale } from './color-map';

/** A buffer representing a .pcd file */
export let pointcloud: Uint8Array | undefined;

/** The size of each individual point */
export let size: number;

/** Dispatched whenever a new .pcd file is parsed. Emits the radius and center of the cloud's bounding sphere. */
export let onUpdate: (payload: {
  radius: number;
  center: { x: number; y: number };
}) => void;

const loader = new PCDLoader();

let points: THREE.Points;
let material: THREE.PointsMaterial | undefined;
let radius = 1;
let center = { x: 0, y: 0 };

const update = (cloud: Uint8Array) => {
  points = loader.parse(cloud.buffer);
  material = points.material as THREE.PointsMaterial;
  material.sizeAttenuation = false;
  material.size = size;

  points.geometry.computeBoundingSphere();
  const { boundingSphere } = points.geometry;

  if (boundingSphere !== null) {
    radius = boundingSphere.radius;
    center = boundingSphere.center;
  }

  const { color } = points.geometry.attributes;

  if (color instanceof THREE.BufferAttribute) {
    mapColorAttributeGrayscale(color);
  }

  onUpdate({ center, radius });
};

$: if (material) {
  material.size = size;
}
$: if (pointcloud) {
  update(pointcloud);
}

onMount(() => {
  onUpdate({ center, radius });
});
</script>

<T
  is={points}
  renderOrder={renderOrder.points}
  frustumCulled={false}
/>
