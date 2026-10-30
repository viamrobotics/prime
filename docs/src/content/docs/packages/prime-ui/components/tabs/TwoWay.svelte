<script lang="ts">
  import { Tabs } from "@viamrobotics/prime-ui";

  let value = $state<string>();
</script>

<div class="not-content flex w-full max-w-md flex-col gap-2">
  <Tabs bind:value>
    <Tabs.List aria-label="Details">
      <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
      <Tabs.Trigger value="usage">Usage</Tabs.Trigger>
      <Tabs.Trigger value="api">API</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="overview"><p class="py-3 text-sm">Overview panel</p></Tabs.Content>
    <Tabs.Content value="usage"><p class="py-3 text-sm">Usage panel</p></Tabs.Content>
    <Tabs.Content value="api"><p class="py-3 text-sm">API panel</p></Tabs.Content>
  </Tabs>
  <p class="text-xs text-subtle-2">value: {String(value)}</p>
</div>
