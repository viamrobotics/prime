<script lang="ts">
  import { Point } from "@viamrobotics/prime-controls";
  import type { PointValue } from "@viamrobotics/prime-controls";

  let position = $state<PointValue>({ x: 0, y: 1, z: 2 });
</script>

<div class="not-content flex w-80 flex-col gap-3">
  <Point label="Position" step={0.1} bind:value={position} />
  <p class="text-sm text-subtle-2"><code>{JSON.stringify(position)}</code></p>
</div>
