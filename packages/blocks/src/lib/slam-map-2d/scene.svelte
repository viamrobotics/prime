<script lang="ts">
import * as THREE from 'three';
import { T, extend, useThrelte } from '@threlte/core';
import { MapControls } from 'three/examples/jsm/controls/MapControls';
import { useRaycastClick } from './hooks/use-raycast-click';
import Helpers from './helpers.svelte';
import Points from './points.svelte';
import Marker from './marker.svelte';
import MotionPath from './motion-path.svelte';
import DestMarker from '$lib/assets/images/destination-marker.txt?raw';
import BaseMarker from '$lib/assets/images/base-marker.txt?raw';

export let helpers: boolean;
export let pointcloud: Uint8Array | undefined;
export let basePose: { x: number; y: number; theta: number } | undefined =
  undefined;
export let destination: THREE.Vector2 | undefined;
export let motionPath: string | undefined;

extend({ MapControls });

useRaycastClick();

const { renderer, camera, invalidate } = useThrelte();

const baseSpriteSize = 15.5;
const defaultPointSize = 0.03;

let cameraX = 0;
let cameraY = 0;
let userControlling = false;
let markerScale = 0;
let pointSize = 0;
let zoom = 0;

const updateZoom = (cam = camera.current as THREE.OrthographicCamera) => {
  if (cam.zoom !== zoom) {
    zoom = cam.zoom;
  }
};

const handleControlsChange = () => {
  invalidate();
  updateZoom();
};

interface UpdateEvent {
  radius: number;
  center: { x: number; y: number };
}

const handlePointsUpdate = ({ center, radius }: UpdateEvent) => {
  if (!userControlling) {
    cameraX = center.x;
    cameraY = center.y;

    const viewHeight = 1;
    const viewWidth = viewHeight * 2;
    const aspect =
      renderer.domElement.clientHeight / renderer.domElement.clientWidth;
    const aspectInverse = 0.008;
    const cam = camera.current as THREE.OrthographicCamera;

    cam.zoom =
      aspect > 1
        ? viewHeight / (radius * aspectInverse)
        : viewWidth / (radius * aspectInverse);

    updateZoom();
  }
};

const handleCameraCreate = ({ ref }: { ref: THREE.OrthographicCamera }) =>
  ref.lookAt(0, 0, 0);

$: markerScale = baseSpriteSize / zoom;
$: pointSize = zoom * defaultPointSize * window.devicePixelRatio;
$: updateZoom($camera as THREE.OrthographicCamera);
</script>

<T.OrthographicCamera
  makeDefault
  near={0.1}
  far={2}
  position.x={cameraX}
  position.y={cameraY}
  position.z={1}
  zoom={10}
  on:create={handleCameraCreate}
  let:ref
>
  <T.MapControls
    args={[ref, renderer.domElement]}
    target.x={cameraX}
    target.y={cameraY}
    target.z={0}
    enableRotate={false}
    screenSpacePanning={true}
    on:change={handleControlsChange}
    on:start={() => (userControlling = true)}
  />
</T.OrthographicCamera>

{#if helpers}
  <Helpers />
{/if}

<Points
  {pointcloud}
  size={pointSize}
  on:update={handlePointsUpdate}
/>

<Marker
  name="Base marker"
  url={BaseMarker}
  visible={basePose !== undefined}
  position.x={basePose?.x}
  position.y={basePose?.y}
  scale.x={markerScale}
  scale.y={markerScale}
  rotation={THREE.MathUtils.degToRad((basePose?.theta ?? 0) - 90)}
/>

<Marker
  name="Destination marker"
  visible={destination !== undefined}
  url={DestMarker}
  position.x={destination?.x}
  position.y={destination?.y}
  scale.x={markerScale}
  scale.y={markerScale}
  center.x={0.5}
  center.y={0.05}
/>

<MotionPath path={motionPath} />
