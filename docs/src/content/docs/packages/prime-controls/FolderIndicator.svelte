<script lang="ts">
  import { mdiMinus, mdiPlus } from "@mdi/js";
  import { Folder, NumberField, Panel } from "@viamrobotics/prime-controls";
  import { Icon } from "@viamrobotics/prime-ui";

  let gain = $state(1);
</script>

<div class="not-content w-64">
  <Panel title="Audio">
    <Folder title="Mixer" summary="2 inputs">
      {#snippet indicator({ open })}
        <Icon icon={open ? mdiMinus : mdiPlus} size="sm" class="text-subtle-2" />
      {/snippet}
      <NumberField label="Gain" step={0.1} bind:value={gain} />
    </Folder>
  </Panel>
</div>
