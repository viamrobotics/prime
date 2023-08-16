<!--
  @component
  Renders THREE.Points from a .pcd file.
  Creates an invisible plane mesh with dimensions matching the diameter of
  the points' bounding sphere.
  Emits click events that intersect this plane.
-->
<script lang='ts'>

import * as THREE from 'three';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader';
import { T, useThrelte, createRawEventDispatcher, extend } from '@threlte/core';
import { MeshDiscardMaterial, MouseRaycaster } from 'trzy';
import { renderOrder } from './render-order';
import { onDestroy, onMount } from 'svelte';
import { mapColorAttributeGrayscale } from './color-map';

extend({ MeshDiscardMaterial });

/** A buffer representing a .pcd file */
export let pointcloud: Uint8Array | undefined;

/** The size of each individual point */
export let size: number;

type $$Events = {

  /** Dispatched when a user clicks within the bounding box of the pointcloud */
  click: THREE.Vector3

  /** Dispatched whenever a new .pcd file is parsed. Emits the radius and center of the cloud's bounding sphere. */
  update: {
    radius: number
    center: { x: number; y: number }
  }
}

const dispatch = createRawEventDispatcher<$$Events>();
const { camera, renderer } = useThrelte();
const loader = new PCDLoader();

let points: THREE.Points;
let material: THREE.PointsMaterial | undefined;
let radius = 1;
let center = { x: 0, y: 0 };

const raycaster = new MouseRaycaster({
  camera: camera.current as THREE.OrthographicCamera,
  target: renderer.domElement,
  recursive: false,
});

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
    mapColorAttributeGrayscale(color)
  }

  dispatch('update', { center, radius });
};

const handleIntersectionPlaneCreate = ({ ref }: { ref: THREE.Mesh }) => {
  raycaster.objects = [ref]
}

const handleIntersectionPlaneClick = (event: THREE.Event) => {
  const [intersection] = event.intersections as THREE.Intersection[];
  if (intersection && intersection.point) {
    dispatch('click', intersection.point);
  }
}

$: if (material) {
  material.size = size;
}
$: if (pointcloud) {
  update(pointcloud);
}
$: raycaster.camera = camera.current as THREE.OrthographicCamera;

onMount(() => {
  dispatch('update', { center, radius });
  raycaster.addEventListener('click', handleIntersectionPlaneClick);
});

onDestroy(() => {
  raycaster.removeEventListener('click', handleIntersectionPlaneClick);
});

</script>

<T
  is={points}
  renderOrder={renderOrder.points}
  frustumCulled={false}
/>

<T.Mesh
  name='Intersection plane'
  position.x={center.x}
  position.y={center.y}
  on:create={handleIntersectionPlaneCreate}
>
  <T.PlaneGeometry args={[radius * 2, radius * 2, 1, 1]} />
  <T.MeshDiscardMaterial />
</T.Mesh>
