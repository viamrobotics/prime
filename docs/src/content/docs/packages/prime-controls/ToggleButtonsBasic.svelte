<script lang="ts">
  import { Panel, ToggleButtons } from "@viamrobotics/prime-controls";

  const spaces = [
    { value: "local", label: "Local" },
    { value: "world", label: "World" },
    { value: "view", label: "View" },
  ];

  let space = $state("local");
</script>

<div class="not-content flex w-64 flex-col gap-3">
  <Panel aria-label="Transform">
    <ToggleButtons items={spaces} bind:value={space} label="Space" />
  </Panel>
  <p class="text-sm text-subtle-2">space: <code>{space}</code></p>
</div>
