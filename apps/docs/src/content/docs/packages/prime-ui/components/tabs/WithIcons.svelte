<script lang="ts">
  import { mdiChartLine, mdiCog } from "@mdi/js";
  import { Icon, Tabs } from "@viamrobotics/prime-ui";
</script>

<div class="not-content w-full max-w-md">
  <Tabs>
    <Tabs.List aria-label="Sections">
      <Tabs.Trigger value="metrics" class="flex items-center gap-1.5">
        <Icon icon={mdiChartLine} size="sm" />
        Metrics
      </Tabs.Trigger>
      <Tabs.Trigger value="settings" class="flex items-center gap-1.5">
        <Icon icon={mdiCog} size="sm" />
        Settings
      </Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="metrics"><p class="py-3 text-sm">Metrics panel</p></Tabs.Content>
    <Tabs.Content value="settings"><p class="py-3 text-sm">Settings panel</p></Tabs.Content>
  </Tabs>
</div>
