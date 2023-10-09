<script lang="ts">
import * as THREE from 'three'
import pointcloudUrl from '$lib/assets/pointcloud.pcd?url';
import motionPath from '$lib/assets/cbirrtsmooth800.txt?raw';
import { MapLibre, SlamMap2D } from '$lib';
import NavigationMap from './navigation-map.svelte';

const fetchPointcloud = async () => {
  const response = await fetch(pointcloudUrl);
  const buffer = await response.arrayBuffer();
  return new Uint8Array(buffer);
};

let basePose = { x: 0, y: 0, theta: 0 }

setInterval(() => {
  basePose = {
    x: (Math.random() - 0.5) * 100,
    y: (Math.random() - 0.5) * 100,
    theta: Math.random() * 360
  }
}, 1000)
</script>

<div class="m-auto flex max-w-6xl flex-col gap-6 py-6">
  <NavigationMap />

  <div class="px-12">
    <div class="relative aspect-video w-full border border-gray-200">
      {#await fetchPointcloud() then pointcloud}
        <SlamMap2D
          {basePose}
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
