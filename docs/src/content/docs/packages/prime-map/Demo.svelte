<script lang="ts">
  import {
    CenterControls,
    DirectionalMarker,
    MapLibre,
    MapLibreMarker,
    NavigationControls,
    SatelliteControls,
  } from "@viamrobotics/prime-map";
  import { LngLat } from "maplibre-gl";
</script>

<div class="not-content h-96 border border-light">
  <MapLibre center={new LngLat(-73.984_421, 40.771_811_6)} zoom={16}>
    <MapLibreMarker lng={-73.9852} lat={40.7722} />
    <DirectionalMarker lng={-73.9837} lat={40.7714} rotation={45} />
    <NavigationControls />
    <div
      class="absolute bottom-8 left-2 flex w-80 flex-col gap-2 border border-light bg-white p-2"
    >
      <CenterControls />
      <SatelliteControls />
    </div>
  </MapLibre>
</div>
