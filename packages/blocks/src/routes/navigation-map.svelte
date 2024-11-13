<script lang="ts">
/* eslint-disable no-console */

import {
  NavigationMap,
  Waypoint,
  type CapsuleGeometry,
  type SphereGeometry,
  type BoxGeometry,
  type Obstacle,
  type Path,
  LngLat,
  GeoPose,
} from '$lib';
import type { Map } from 'maplibre-gl';
import { Label, SliderInput } from '@viamrobotics/prime-core';
import { ViamObject3D } from '@viamrobotics/three';
import { theme } from '@viamrobotics/prime-core/theme';

const waypoints: Waypoint[] = [
  new Waypoint(-73.968_899_054_033_95, 40.663_071_086_044, '0'),
  new Waypoint(-73.972_162_444_595_26, 40.661_759_669_002_69, '1'),
  new Waypoint(-73.969_889_726_168_73, 40.659_372_529_105_895, '2'),
];

const obstacles: Obstacle[] = [
  {
    name: 'obstacle 1',
    location: new LngLat(-73.965_918_2, 40.670_520_9),
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
    location: new LngLat(-73.976_472, 40.693_268),
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
    location: new LngLat(-73.958_847, 40.6759),
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
    location: new LngLat(-74.7, 40),
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
    location: new LngLat(-74.701, 40.001),
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
    location: new LngLat(-74.701, 40),
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
    new LngLat(-73.968, 40.663),
    new LngLat(-73.9681, 40.6631),
    new LngLat(-73.968, 40.6632),
    new LngLat(-73.9681, 40.6633),
    new LngLat(-73.968, 40.6634),
    new LngLat(-73.9681, 40.6635),
    new LngLat(-73.968, 40.6636),
  ],
  [
    new LngLat(-73.968, 40.663),
    new LngLat(-73.9679, 40.6631),
    new LngLat(-73.967_95, 40.6632),
    new LngLat(-73.9679, 40.6633),
    new LngLat(-73.967_95, 40.6634),
    new LngLat(-73.9679, 40.6635),
    new LngLat(-73.968, 40.6636),
  ],
  [
    new LngLat(-73.968, 40.663),
    new LngLat(-73.968_05, 40.6631),
    new LngLat(-73.968_025, 40.6632),
    new LngLat(-73.968_05, 40.6633),
    new LngLat(-73.968_025, 40.6634),
    new LngLat(-73.968_05, 40.6635),
    new LngLat(-73.968, 40.6636),
  ],
  [
    new LngLat(-73.968, 40.663),
    new LngLat(-73.968_15, 40.6631),
    new LngLat(-73.968_125, 40.6632),
    new LngLat(-73.968_15, 40.6633),
    new LngLat(-73.968_125, 40.6634),
    new LngLat(-73.968_15, 40.6635),
    new LngLat(-73.968, 40.6636),
  ],
];

let map: Map | undefined;

let elapsed = 0;
const pose = new GeoPose(-73.97, 40.67, Math.random() * 360);

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
    class="relative h-[800px] w-full border border-gray-200 sm:aspect-video sm:h-auto"
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
      onUpdate={(event) => console.log('update-obstacles', event)}
      on:create={(event) => console.log('create', event)}
      on:add-waypoint={(event) => console.log('add-waypoint', event)}
      on:delete-waypoint={(event) => console.log('delete-waypoint', event)}
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
