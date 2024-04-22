<script lang="ts">
import pointcloudUrl from '$lib/assets/pointcloud.pcd?url';
import motionPath from '$lib/assets/cbirrtsmooth800.txt?raw';
import { MapLibre, MapLibreControls, SlamMap2D } from '$lib';
import NavigationMap from './navigation-map.svelte';
import FollowingMarker from './following-marker.svelte';

const fetchPointcloud = async () => {
  const response = await fetch(pointcloudUrl);
  const buffer = await response.arrayBuffer();
  return new Uint8Array(buffer);
};

const path = () =>
  new Float32Array(
    motionPath.split('\n').flatMap((str) => {
      const [xStr, yStr] = str.split(',');
      if (xStr && yStr) {
        const x = Number.parseFloat(xStr) / 1000;
        const y = Number.parseFloat(yStr) / 1000;
        if (!Number.isNaN(x) && !Number.isNaN(y)) {
          return [x, y];
        }
        return [];
      }
      return [];
    })
  );
</script>

<div class="m-auto flex max-w-6xl flex-col gap-6 py-6">
  <div class="px-12">
    <div class="relative aspect-video w-full border border-gray-200">
      {#await fetchPointcloud() then pointcloud}
        <SlamMap2D
          basePose={{ x: 1, y: 2, theta: 45 }}
          {pointcloud}
          motionPath={path()}
          on:click={(event) => console.log(event.detail)}
        />
      {/await}
    </div>
  </div>

  <NavigationMap />

  <div class="px-12">
    <div class="relative aspect-video w-full border border-gray-200 pt-0">
      <MapLibre>
        <MapLibreControls />
      </MapLibre>
    </div>
  </div>

  <FollowingMarker />
</div>
