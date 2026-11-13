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
    <Select items={modes} bind:value={mode} aria-label="Mode" placeholder="Pick a mode" />
  </Panel>
  <p class="text-sm text-subtle-2">mode: <code>{mode}</code></p>
</div>
