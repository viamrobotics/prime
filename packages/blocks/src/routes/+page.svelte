<script lang='ts'>

import pointcloudUrl from '$lib/assets/pointcloud.pcd?url'
import motionPath from '$lib/assets/cbirrtsmooth800.txt?raw'

import {
  MapLibre,
  NavigationMap,
  SlamMap2D,
} from '$lib';

const fetchPointcloud = async () => {
  const response = await fetch(pointcloudUrl)
  const buffer = await response.arrayBuffer()
  return new Uint8Array(buffer)
}

</script>

<div class='p-12'>
  <div class='relative w-full h-[400px] border border-gray-200'>
    {#await fetchPointcloud() then pointcloud}
      <SlamMap2D {pointcloud} {motionPath} />
    {/await}
  </div>
  
</div>

<div class="p-12 pt-0">
  <div class='relative w-full h-[400px] border border-gray-200'>
    <MapLibre />
  </div>
</div>

<div class="p-12 pt-0">
  <div class='relative w-full h-[400px] border border-gray-200'>
    <NavigationMap
      obstacles={[
       
      ]}
      waypoints={[
         { lng: -73.96889905403395, lat: 40.663071086044, id: '0' }
      ]}
    />
  </div>
</div>
