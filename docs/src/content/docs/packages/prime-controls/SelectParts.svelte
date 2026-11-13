<script lang="ts">
  import { Panel, Select } from "@viamrobotics/prime-controls";

  const modes = [
    { value: "orbit", label: "Orbit" },
    { value: "fly", label: "Fly" },
    { value: "walk", label: "Walk" },
  ];

  let mode = $state("orbit");
</script>

<div class="not-content flex w-64 flex-col gap-3">
  <Panel aria-label="Camera">
    <Select items={modes} bind:value={mode}>
      <Select.Trigger aria-label="Mode">
        <Select.Value placeholder="Pick a mode" />
      </Select.Trigger>
      <Select.Content>
        <Select.Viewport>
          <Select.Items />
        </Select.Viewport>
      </Select.Content>
    </Select>
  </Panel>
  <p class="text-sm text-subtle-2">mode: <code>{mode}</code></p>
</div>
