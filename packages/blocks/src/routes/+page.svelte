<script lang='ts'>

import { SlamMap2D } from '$lib';
import pointcloudUrl from '$lib/assets/pointcloud.pcd?url'
import motionPath from '$lib/assets/cbirrtsmooth800.txt?raw'

const fetchPointcloud = async () => {
  const response = await fetch(pointcloudUrl)
  const buffer = await response.arrayBuffer()
  return new Uint8Array(buffer)
}

</script>

<div class='relative w-full h-[300px] p-12'>
  {#await fetchPointcloud() then pointcloud}
    <SlamMap2D {pointcloud} {motionPath} />
  {/await}
</div>
