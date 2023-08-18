<script>
  import { NavigationMap } from '$lib';
  import { ViamObject3D } from '@viamrobotics/three';
</script>

<div class="px-12">
  <div class='relative w-full h-[800px] sm:h-[400px] border border-gray-200'>
    <NavigationMap
      write
      obstacles={[
        {
          name: 'obstacle 1',
          location: {
            lng: -73.9659182,
            lat: 40.6705209,
          },
          geometries: [{
            type: 'sphere',
            pose: new ViamObject3D(),
            radius: 20
          }],
        }, {
          name: 'obstacle 2',
          location: {
            lng: -73.976472,
            lat: 40.693268,
          },
          geometries: [{
            type: 'sphere',
            pose: new ViamObject3D(),
            radius: 200
          }],
        }, {
          name: 'obstacle 3',
          location: {
            lng: -73.958847,
            lat: 40.6759,
          },
          geometries: [
            {
              type: 'capsule',
              radius: 50,
              length: 300,
              pose: (() => {
                const p = new ViamObject3D()
                p.orientationVector.th = Math.PI / 4
                return p
              })(),
            }    
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
            }
          ]
        }
    ]}
      waypoints={[
         { lng: -73.96889905403395, lat: 40.663071086044, id: '0' },
         { lng: -73.97216244459526, lat: 40.66175966900269, id: '1' },
         { lng: -73.96988972616873, lat: 40.659372529105895, id: '2' },
      ]}
    />
  </div>
</div>