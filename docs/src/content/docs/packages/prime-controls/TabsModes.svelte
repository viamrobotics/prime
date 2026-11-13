<script lang="ts">
  import { NumberField, Panel, Tabs } from "@viamrobotics/prime-controls";

  let tab = $state("position");
  let x = $state(0);
  let angle = $state(0);
</script>

<div class="not-content flex w-64 flex-col gap-3">
  <Panel aria-label="Transform">
    <Tabs bind:value={tab}>
      <Tabs.List aria-label="Transform mode">
        <Tabs.Trigger value="position">Position</Tabs.Trigger>
        <Tabs.Trigger value="rotation">Rotation</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="position">
        <NumberField label="X" step={0.1} bind:value={x} />
      </Tabs.Content>
      <Tabs.Content value="rotation">
        <NumberField label="Angle" bind:value={angle} />
      </Tabs.Content>
    </Tabs>
  </Panel>
  <p class="text-sm text-subtle-2">tab: <code>{tab}</code></p>
</div>
