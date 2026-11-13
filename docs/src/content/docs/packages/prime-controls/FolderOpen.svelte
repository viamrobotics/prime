<script lang="ts">
  import { Folder, NumberField, Panel } from "@viamrobotics/prime-controls";

  let open = $state(true);
  let gain = $state(1);
  let bias = $state(0);
</script>

<div class="not-content flex w-64 flex-col gap-3">
  <Panel title="Audio">
    <Folder title="Mixer" bind:open>
      <NumberField label="Gain" step={0.1} bind:value={gain} />
      <NumberField label="Bias" step={0.1} bind:value={bias} />
    </Folder>
  </Panel>
  <p class="text-sm text-subtle-2">open: <code>{open}</code></p>
</div>
