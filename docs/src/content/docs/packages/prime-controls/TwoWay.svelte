<script lang="ts">
  import { NumberField } from "@viamrobotics/prime-controls";

  let speed = $state(5);
</script>

<div class="not-content flex w-48 flex-col gap-3">
  <NumberField label="Speed" bind:value={speed} />
  <p class="text-sm text-subtle-2">speed: <code>{speed}</code></p>
</div>
