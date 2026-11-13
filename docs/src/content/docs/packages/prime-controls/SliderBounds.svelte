<script lang="ts">
  import { Slider } from "@viamrobotics/prime-controls";

  let opacity = $state(0.5);
</script>

<div class="not-content flex w-72 flex-col gap-3">
  <Slider label="Opacity" min={0} max={1} step={0.01} bind:value={opacity} />
  <p class="text-sm text-subtle-2">opacity: <code>{opacity}</code></p>
</div>
