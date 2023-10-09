<script lang="ts">
import pointcloudUrl from '$lib/assets/pointcloud.pcd?url';
import motionPath from '$lib/assets/cbirrtsmooth800.txt?raw';
import { MapLibre, SlamMap2D } from '$lib';
import NavigationMap from './navigation-map.svelte';

const fetchPointcloud = async () => {
  const response = await fetch(pointcloudUrl);
  const buffer = await response.arrayBuffer();
  return new Uint8Array(buffer);
};
</script>

<div class="m-auto flex max-w-6xl flex-col gap-6 py-6">
  <NavigationMap />

  <div class="px-12">
    <div class="relative aspect-video w-full border border-gray-200">
      {#await fetchPointcloud() then pointcloud}
        <SlamMap2D
          {pointcloud}
          {motionPath}
        />
      {/await}
    </div>
  </div>

  <div class="px-12">
    <div class="relative aspect-video w-full border border-gray-200 pt-0">
      <MapLibre />
    </div>
  </div>
</div>
