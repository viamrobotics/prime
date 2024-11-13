<!-- 
  @component
  Renders an in-progress rectangle that represents a drawn area by the user.
-->
<script lang="ts">
import type * as THREE from 'three';
import { T } from '@threlte/core';
import {
  useMapLibreEvent,
  useMapLibre,
  lngLatToMercator,
  cartesianToMercator,
} from '$lib';
import {
  MercatorCoordinate,
  LngLat,
  type MapMouseEvent,
  type MapLayerMouseEvent,
  type MapLayerTouchEvent,
} from 'maplibre-gl';
import { view } from '../stores';
import { theme } from '@viamrobotics/prime-core/theme';

/** Fires when a rectangle is drawn. */
export let onUpdate: (payload: {
  width: number;
  height: number;
  center: LngLat;
}) => void;

const { map } = useMapLibre();

let downLngLat = new LngLat(0, 0);
let downMercator = new MercatorCoordinate(0, 0, 0);

let drawing = false;
let width = 0;
let height = 0;

const moveSign = { x: 0, y: 0 };

const toPrecisionLevel = (number: number, decimals: number): number => {
  const multiplier = 10 ** decimals;
  return Math.floor(number * multiplier) / multiplier;
};

const handlePointerDown = (event: MapLayerMouseEvent | MapLayerTouchEvent) => {
  event.preventDefault();
  drawing = true;
  downLngLat = event.lngLat;
  downMercator = lngLatToMercator(downLngLat);
};

const handlePointerMove = (event: MapMouseEvent) => {
  const moveMercator = lngLatToMercator(event.lngLat);
  const scale = moveMercator.meterInMercatorCoordinateUnits();

  moveSign.x = Math.sign(moveMercator.x - downMercator.x);
  moveSign.y = Math.sign(moveMercator.y - downMercator.y);

  width = toPrecisionLevel(
    Math.abs(moveMercator.x - downMercator.x) / scale,
    2
  );
  height = toPrecisionLevel(
    Math.abs(moveMercator.y - downMercator.y) / scale,
    2
  );
};

const handlePointerUp = () => {
  drawing = false;

  const scale = downMercator.meterInMercatorCoordinateUnits();
  const offset = cartesianToMercator(
    -moveSign.x * (width / 2),
    -moveSign.y * (height / 2),
    scale
  );

  downMercator.x -= offset.x;
  downMercator.y -= offset.y;

  const center = downMercator.toLngLat();

  onUpdate({ width, height, center });

  width = 0;
  height = 0;
};

const handleGeometryCreate = ({ ref }: { ref: THREE.BufferGeometry }) => {
  ref.rotateX(-Math.PI / 2);
};

useMapLibreEvent('mousedown', (event) => {
  if (event.originalEvent.shiftKey) {
    handlePointerDown(event);
  }
});

const handleKeydown = (event: KeyboardEvent) => {
  if (event.shiftKey) {
    map.getCanvas().classList.add('!cursor-crosshair');
  }
};

const handleKeyup = () => {
  map.getCanvas().classList.remove('!cursor-crosshair');
};

$: if (drawing) {
  map.on('mousemove', handlePointerMove);
  map.on('mouseup', handlePointerUp);
} else {
  map.off('mousemove', handlePointerMove);
  map.off('mouseup', handlePointerUp);
}
</script>

<svelte:window
  on:keydown={handleKeydown}
  on:keyup={handleKeyup}
/>

<T.Group userData.lngLat={downLngLat}>
  <T.Mesh
    position.x={(-moveSign.x * width) / 2}
    position.z={(-moveSign.y * height) / 2}
  >
    {#if $view === '3D'}
      <T.BoxGeometry
        args={[width, height, 10]}
        on:create={handleGeometryCreate}
      />
    {:else}
      <T.PlaneGeometry
        args={[width, height]}
        on:create={handleGeometryCreate}
      />
    {/if}
    <T.MeshPhongMaterial color={theme.extend.colors.cyberpunk} />
  </T.Mesh>
</T.Group>
