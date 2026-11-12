<script lang="ts">
  import { NumberField } from "@viamrobotics/prime-controls";

  let opacity = $state(0.5);
</script>

<div class="not-content flex w-48 flex-col gap-3">
  <NumberField label="Opacity" min={0} max={1} step={0.05} bind:value={opacity} />
  <p class="text-sm text-subtle-2">opacity: <code>{opacity}</code></p>
</div>
