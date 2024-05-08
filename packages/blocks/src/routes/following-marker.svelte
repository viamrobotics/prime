<script lang="ts">
import { MapLibre, MapLibreDirectionalMarker } from '$lib';

let lng = -73.98;
let lat = 40.77;
let rotation = 0;

const RAD2DEG = 180 / Math.PI;

const frame = (delta: number) => {
  requestAnimationFrame(frame);

  const dy = Math.sin(delta / 10e2) / 10e2;
  const dx = Math.cos(delta / 10e2) / 10e2;

  rotation = (Math.atan2(dx, dy) - Math.atan2(lng, lat)) * RAD2DEG - 90;
  lat += dy;
  lng += dx;
};

requestAnimationFrame(frame);
</script>

<div class="px-12">
  Following robot
  <div class="relative aspect-video w-full border border-gray-200 pt-0">
    <MapLibre
      minZoom={10}
      center={{ lng, lat }}
      options={{ dragPan: false }}
    >
      <MapLibreDirectionalMarker
        {lng}
        {lat}
        {rotation}
      />
    </MapLibre>
  </div>
</div>
