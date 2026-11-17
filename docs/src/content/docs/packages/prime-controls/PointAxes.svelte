<script lang="ts">
  import { Point } from "@viamrobotics/prime-controls";

  let orientation = $state({ x: 0, y: 0, z: 1, w: 90 });
</script>

<div class="not-content w-96">
  <Point
    label="Orientation"
    step={0.01}
    min={-1}
    max={1}
    labels={{ w: "θ" }}
    axes={{ w: { step: 1, min: -180, max: 180, suffix: "°" } }}
    bind:value={orientation}
  />
</div>
