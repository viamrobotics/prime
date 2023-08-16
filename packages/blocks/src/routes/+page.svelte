<script lang='ts'>

import { SlamMap2D } from '$lib';
import pointcloudUrl from '$lib/assets/pointcloud.pcd?url'

const fetchCloud = async () => {
  const response = await fetch(pointcloudUrl)
  const buffer = await response.arrayBuffer()
  return new Uint8Array(buffer)
}

</script>

<div class='relative w-full h-[300px] p-12'>
  {#await fetchCloud() then pointcloud}
    <SlamMap2D {pointcloud} />
  {/await}
</div>
