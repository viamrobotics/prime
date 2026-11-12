<script lang="ts">
  import { Point } from "@viamrobotics/prime-controls";
  import type { PointValue } from "@viamrobotics/prime-controls";

  let color = $state<PointValue>({ x: 255, y: 128, z: 0 });
</script>

<div class="not-content flex w-80 flex-col gap-3">
  <Point
    label="Color"
    labels={{ x: "R", y: "G", z: "B" }}
    min={0}
    max={255}
    bind:value={color}
  />
  <p class="text-sm text-subtle-2"><code>{JSON.stringify(color)}</code></p>
</div>
