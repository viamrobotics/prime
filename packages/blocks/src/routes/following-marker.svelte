<script lang="ts">
import { MapLibre, MapLibreMarker } from '$lib';
import type { Map } from 'maplibre-gl';

let lng = -73.98;
let lat = 40.77;
let rotation = 0;

const frame = (delta: number) => {
  requestAnimationFrame(frame);

  lat += Math.sin(delta / 10e6) / 10e3;
  lng += Math.cos(delta / 10e6) / 10e3;
  map?.flyTo({ center: { lng, lat } });
  rotation = 0;
};

let map: Map | undefined;

requestAnimationFrame(frame);
</script>

<div class="px-12">
  Following robot
  <div class="relative aspect-video w-full border border-gray-200 pt-0">
    <MapLibre
      bind:map
      minZoom={10}
      center={{ lng, lat }}
      onCreate={() => console.log('create')}
    >
      <MapLibreMarker
        {lng}
        {lat}
        {rotation}
      />
    </MapLibre>
  </div>
</div>
