<script lang="ts">
import * as THREE from 'three';
import { T, createRawEventDispatcher } from '@threlte/core';
import { useMapLibreEvent, useMapLibre } from '$lib';
import { MercatorCoordinate, LngLat, type MapMouseEvent } from 'maplibre-gl';
import { view } from '../stores';

type $$Events = {
  update: { width: number; height: number; center: LngLat };
};

const dispatch = createRawEventDispatcher<$$Events>();
const { map } = useMapLibre();

let downLngLat = new LngLat(0, 0);
let down = new MercatorCoordinate(0, 0, 0);

let drawing = false;
let width = 0;
let height = 0;

let moveSign = { x: 0, y: 0 };

const toPrecisionLevel = (number: number, decimals: number) => {
  const multiplier = Math.pow(10, decimals);
  return Math.floor(number * multiplier) / multiplier;
}

const handlePointerMove = (event: MapMouseEvent) => {
  const move = MercatorCoordinate.fromLngLat(event.lngLat, 0);
  const scale = move.meterInMercatorCoordinateUnits();

  moveSign.x = Math.sign(move.x - down.x);
  moveSign.y = Math.sign(move.y - down.y);

  width = toPrecisionLevel(Math.abs(move.x - down.x) / scale, 2);
  height = toPrecisionLevel(Math.abs(move.y - down.y) / scale, 2);
};

const handlePointerUp = () => {
  drawing = false;

  const scale = down.meterInMercatorCoordinateUnits();
  const offset = new MercatorCoordinate(
    -moveSign.x * (width / 2) * scale,
    -moveSign.y * (height / 2) * scale
  );

  down.x -= offset.x;
  down.y -= offset.y;

  const center = down.toLngLat();

  dispatch('update', { width, height, center });

  width = 0;
  height = 0;
};

useMapLibreEvent('mousedown', (event) => {
  if (event.originalEvent.shiftKey) {
    event.preventDefault();
    drawing = true;
    downLngLat = event.lngLat;
    down = MercatorCoordinate.fromLngLat(event.lngLat, 0);
  }
});

$: if (drawing) {
  map.on('mousemove', handlePointerMove);
  map.on('mouseup', handlePointerUp);
} else {
  map.off('mousemove', handlePointerMove);
  map.off('mouseup', handlePointerUp);
}
</script>

<T.Group userData.lngLat={downLngLat}>
  <T.Mesh
    position.x={(-moveSign.x * width) / 2}
    position.z={(-moveSign.y * height) / 2}
  >
    {#if $view === '3D'}
      <T.BoxGeometry
        args={[width, height, 10]}
        on:create={({ ref }) => ref.rotateX(-Math.PI / 2)}
      />
    {:else}
      <T.PlaneGeometry
        args={[width, height]}
        on:create={({ ref }) => ref.rotateX(-Math.PI / 2)}
      />
    {/if}
    <T is={new THREE.MeshPhongMaterial({ color: 'red' })} />
  </T.Mesh>
</T.Group>
