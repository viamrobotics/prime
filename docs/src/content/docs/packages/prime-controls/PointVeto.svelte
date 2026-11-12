<script lang="ts">
  import { Point } from "@viamrobotics/prime-controls";
  import type { PointValue } from "@viamrobotics/prime-controls";

  let position = $state<PointValue>({ x: 0, y: 0 });
  let rejected = $state(0);

  const MAX_DISTANCE_FROM_ORIGIN = 10;
</script>

<div class="not-content flex w-64 flex-col gap-3">
  <Point
    label="Position"
    bind:value={
      () => position,
      (next) => {
        if (Math.hypot(next.x, next.y) > MAX_DISTANCE_FROM_ORIGIN) {
          rejected += 1;
          return;
        }
        position = next;
      }
    }
  />
  <p class="text-sm text-subtle-2"><code>{JSON.stringify(position)}</code></p>
  <p class="text-sm text-subtle-2">rejected writes: <code>{rejected}</code></p>
</div>
