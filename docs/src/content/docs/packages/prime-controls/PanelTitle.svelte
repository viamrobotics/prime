<script lang="ts">
  import { NumberField, Panel } from "@viamrobotics/prime-controls";

  let width = $state(4);
  let height = $state(3);
</script>

<div class="not-content flex flex-wrap items-start gap-4">
  <Panel title="Size" class="w-56">
    <NumberField label="Width" bind:value={width} />
    <NumberField label="Height" bind:value={height} />
  </Panel>
  <Panel aria-label="Size, no visible title" class="w-56">
    <NumberField label="Width" bind:value={width} />
    <NumberField label="Height" bind:value={height} />
  </Panel>
</div>
