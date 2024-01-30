<script lang="ts">
/* eslint-disable no-console */

import {
  NavigationMap,
  type CapsuleGeometry,
  type SphereGeometry,
  type BoxGeometry,
  type Obstacle,
  type Waypoint,
  type Path,
} from '$lib';
import type { Map } from 'maplibre-gl';
import { Label, SliderInput } from '@viamrobotics/prime-core';
import { ViamObject3D } from '@viamrobotics/three';
import { theme } from '@viamrobotics/prime-core/theme';

const waypoints: Waypoint[] = [
  { lng: -73.968_899_054_033_95, lat: 40.663_071_086_044, id: '0' },
  { lng: -73.972_162_444_595_26, lat: 40.661_759_669_002_69, id: '1' },
  { lng: -73.969_889_726_168_73, lat: 40.659_372_529_105_895, id: '2' },
];

const obstacles: Obstacle[] = [
  {
    name: 'obstacle 1',
    location: {
      lng: -73.965_918_2,
      lat: 40.670_520_9,
    },
    geometries: [
      {
        type: 'sphere',
        pose: new ViamObject3D(),
        radius: 20,
      } as SphereGeometry,
    ],
    color: theme.extend.colors.cyberpunk,
    label: 'static',
  },
  {
    name: 'obstacle 2',
    location: {
      lng: -73.976_472,
      lat: 40.693_268,
    },
    geometries: [
      {
        type: 'sphere',
        pose: new ViamObject3D(),
        radius: 200,
      } as SphereGeometry,
    ],
    color: theme.extend.colors.cyberpunk,
    label: 'static',
  },
  {
    name: 'obstacle 3',
    location: {
      lng: -73.958_847,
      lat: 40.6759,
    },
    geometries: [
      {
        type: 'capsule',
        radius: 50,
        length: 300,
        pose: (() => {
          const object = new ViamObject3D();
          object.orientationVector.th = Math.PI / 4;
          return object;
        })(),
      } as CapsuleGeometry,
    ],
    color: theme.extend.colors.cyberpunk,
    label: 'static',
  },
  {
    name: 'transient obstacle 4',
    location: {
      lng: -74.7,
      lat: 40,
    },
    geometries: [
      {
        type: 'box',
        length: 50,
        width: 50,
        height: 50,
        pose: new ViamObject3D(),
      } as BoxGeometry,
    ],
    color: theme.extend.colors.hologram,
    label: 'transient',
  },
  {
    name: 'obstacle 5',
    location: {
      lng: -74.701,
      lat: 40.001,
    },
    geometries: [
      {
        type: 'box',
        length: 50,
        width: 50,
        height: 50,
        pose: new ViamObject3D(),
      } as BoxGeometry,
    ],
    color: theme.extend.colors.cyberpunk,
    label: 'static',
  },
  {
    name: 'a point',
    location: {
      lng: -74.701,
      lat: 40,
    },
    geometries: [
      {
        type: 'sphere',
        radius: 0,
        pose: new ViamObject3D(),
      } as SphereGeometry,
    ],
    color: theme.extend.colors.hologram,
    label: 'transient',
  },
];

const paths: Path[] = [
  [
    { lng: -73.968, lat: 40.663 },
    { lng: -73.9681, lat: 40.6631 },
    { lng: -73.968, lat: 40.6632 },
    { lng: -73.9681, lat: 40.6633 },
    { lng: -73.968, lat: 40.6634 },
    { lng: -73.9681, lat: 40.6635 },
    { lng: -73.968, lat: 40.6636 },
  ],
  [
    { lng: -73.968, lat: 40.663 },
    { lng: -73.9679, lat: 40.6631 },
    { lng: -73.967_95, lat: 40.6632 },
    { lng: -73.9679, lat: 40.6633 },
    { lng: -73.967_95, lat: 40.6634 },
    { lng: -73.9679, lat: 40.6635 },
    { lng: -73.968, lat: 40.6636 },
  ],
  [
    { lng: -73.968, lat: 40.663 },
    { lng: -73.968_05, lat: 40.6631 },
    { lng: -73.968_025, lat: 40.6632 },
    { lng: -73.968_05, lat: 40.6633 },
    { lng: -73.968_025, lat: 40.6634 },
    { lng: -73.968_05, lat: 40.6635 },
    { lng: -73.968, lat: 40.6636 },
  ],
  [
    { lng: -73.968, lat: 40.663 },
    { lng: -73.968_15, lat: 40.6631 },
    { lng: -73.968_125, lat: 40.6632 },
    { lng: -73.968_15, lat: 40.6633 },
    { lng: -73.968_125, lat: 40.6634 },
    { lng: -73.968_15, lat: 40.6635 },
    { lng: -73.968, lat: 40.6636 },
  ],
];

let map: Map | undefined;

let elapsed = 0;
const pose = { lng: -73.97, lat: 40.67, rotation: Math.random() * 360 };

requestAnimationFrame(function frame(time) {
  requestAnimationFrame(frame);
  elapsed = time / 100;
  pose.rotation = elapsed * 10;
  pose.lng += Math.sin(elapsed / 10) / 1e3;
  pose.lat += Math.cos(elapsed / 10) / 1e3;
});

$: map?.setCenter({ lat: 40.7, lng: -74.17 });
</script>

<div class="px-12">
  <div
    class="relative h-[800px] w-full border border-gray-200 p-4 sm:aspect-video sm:h-auto"
  >
    <NavigationMap
      bind:map
      environment="configure"
      tab="Obstacles"
      tabs={['Attributes', 'Obstacles', 'Waypoints']}
      baseGeoPose={pose}
      {obstacles}
      {waypoints}
      {paths}
      on:create={(event) => console.log('create', event)}
      on:add-waypoint={(event) => console.log('add-waypoint', event)}
      on:delete-waypoint={(event) => console.log('delete-waypoint', event)}
      on:update-obstacles={(event) => console.log('update-obstacles', event)}
    >
      <div slot="tab">
        <Label>
          Test
          <SliderInput slot="input" />
        </Label>
      </div>
    </NavigationMap>
  </div>
</div>
