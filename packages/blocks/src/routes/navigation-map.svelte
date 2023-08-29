<script lang='ts'>
/* eslint-disable no-console */

import { NavigationMap, type CapsuleGeometry, type SphereGeometry, type BoxGeometry } from '$lib';
import { ViamObject3D } from '@viamrobotics/three';

const waypoints = [
  { lng: -73.968_899_054_033_95, lat: 40.663_071_086_044, id: '0' },
  { lng: -73.972_162_444_595_26, lat: 40.661_759_669_002_69, id: '1' },
  { lng: -73.969_889_726_168_73, lat: 40.659_372_529_105_895, id: '2' },
]

const obstacles = [
  {
    name: 'obstacle 1',
    location: {
      lng: -73.965_918_2,
      lat: 40.670_520_9,
    },
    geometries: [{
      type: 'sphere',
      pose: new ViamObject3D(),
      radius: 20
    } as SphereGeometry],
  }, {
    name: 'obstacle 2',
    location: {
      lng: -73.976_472,
      lat: 40.693_268,
    },
    geometries: [{
      type: 'sphere',
      pose: new ViamObject3D(),
      radius: 200
    } as SphereGeometry],
  }, {
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
          const object = new ViamObject3D()
          object.orientationVector.th = Math.PI / 4
          return object
        })(),
      } as CapsuleGeometry   
    ],
  }, {
    name: 'obstacle 4',
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
      } as BoxGeometry
    ]
  }
]

</script>

<div class="px-12">
  <div class='relative w-full h-[800px] sm:h-auto sm:aspect-video border border-gray-200'>
    <NavigationMap
      environment='configure'
      tab='Obstacles'
      tabs={['Obstacles', 'Waypoints']}
      baseGeoPose={{ lng: -73.97, lat: 40.67 }}
      {obstacles}
      {waypoints}
      on:click={(event) => console.log('click', event)}
      on:add-waypoint={(event) => console.log('add-waypoint', event)}
      on:delete-waypoint={(event) => console.log('delete-waypoint', event)}
      on:update-obstacles={(event) => console.log('update-obstacles', event)}
    />
  </div>
</div>
