<script lang="ts">
  import type { LngLat } from "maplibre-gl";

  import { LngLatInput } from "@viamrobotics/prime-map";

  let lng = $state(-73.984_421);
  let lat = $state(40.771_811_6);

  const update = (next: LngLat) => {
    lng = next.lng;
    lat = next.lat;
  };
</script>

<div class="flex w-80 flex-col gap-2">
  <LngLatInput label="Waypoint" {lng} {lat} oninput={update} />
  <p class="text-sm text-default">{lat}, {lng}</p>
</div>
