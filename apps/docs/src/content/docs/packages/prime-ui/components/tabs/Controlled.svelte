<script lang="ts">
  import { Tabs } from "@viamrobotics/prime-ui";

  let value = $state("overview");
  let isLocked = $state(true);
</script>

<div class="not-content flex w-full max-w-md flex-col gap-3">
  <label class="flex items-center gap-2 text-sm">
    <input type="checkbox" bind:checked={isLocked} />
    Keep the first tab selected
  </label>

  <Tabs
    bind:value={
      () => value,
      (next) => {
        if (!isLocked) value = next;
      }
    }
  >
    <Tabs.List aria-label="Details">
      <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
      <Tabs.Trigger value="usage">Usage</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="overview"><p class="py-3 text-sm">Overview panel</p></Tabs.Content>
    <Tabs.Content value="usage"><p class="py-3 text-sm">Usage panel</p></Tabs.Content>
  </Tabs>
</div>
