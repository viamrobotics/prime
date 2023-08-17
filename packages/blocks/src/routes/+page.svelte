<script lang='ts'>

import pointcloudUrl from '$lib/assets/pointcloud.pcd?url'
import motionPath from '$lib/assets/cbirrtsmooth800.txt?raw'

import {
  MapLibre,
  SlamMap2D,
} from '$lib';

const fetchPointcloud = async () => {
  const response = await fetch(pointcloudUrl)
  const buffer = await response.arrayBuffer()
  return new Uint8Array(buffer)
}

</script>

<div class='relative w-full h-[400px] p-12'>
  {#await fetchPointcloud() then pointcloud}
    <SlamMap2D {pointcloud} {motionPath} />
  {/await}
</div>

<div class="relative w-full h-[400px] p-12 pt-0">
  <MapLibre />
</div>