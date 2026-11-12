<script lang="ts">
  import { Point } from "@viamrobotics/prime-controls";
  import type { PointValue } from "@viamrobotics/prime-controls";

  let rotation = $state<PointValue>({ x: 0, y: 0, z: 0, w: 1 });
</script>

<div class="not-content flex w-96 flex-col gap-3">
  <Point label="Rotation" step={0.01} min={-1} max={1} bind:value={rotation} />
  <p class="text-sm text-subtle-2"><code>{JSON.stringify(rotation)}</code></p>
</div>
