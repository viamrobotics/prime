<script lang="ts">
  import {
    DirectionalMarker,
    MapLibre,
    MapLibreMarker,
  } from "@viamrobotics/prime-map";
  import { LngLat } from "maplibre-gl";

  let heading = $state(0);
</script>

<div class="flex size-full flex-col gap-2">
  <label class="flex items-center gap-2 text-sm text-default">
    Heading
    <input type="range" min="0" max="359" bind:value={heading} />
    {heading}°
  </label>
  <div class="grow border border-light">
    <MapLibre center={new LngLat(-73.9845, 40.7718)} zoom={17}>
      <MapLibreMarker lng={-73.985} lat={40.772} color="blue" />
      <DirectionalMarker lng={-73.984} lat={40.7716} rotation={heading} />
    </MapLibre>
  </div>
</div>
