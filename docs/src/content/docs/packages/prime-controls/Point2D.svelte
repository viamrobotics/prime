<script lang="ts">
  import type { PointValue } from "@viamrobotics/prime-controls";

  import { Point } from "@viamrobotics/prime-controls";

  let offset = $state<PointValue>({ x: 0, y: 0 });
</script>

<div class="not-content flex w-64 flex-col gap-3">
  <Point label="Offset" bind:value={offset} />
  <p class="text-sm text-subtle-2"><code>{JSON.stringify(offset)}</code></p>
</div>
