<script lang="ts">
  import { Tabs } from "@viamrobotics/prime-ui";

  const variants = ["underline", "file"] as const;

  const tabs = [
    { value: "overview", label: "Overview" },
    { value: "usage", label: "Usage" },
    { value: "api", label: "API", disabled: true }
  ];
</script>

<div class="not-content flex flex-col gap-6">
  {#each variants as variant (variant)}
    <div class="flex flex-col gap-2">
      <h4 class="text-xs font-medium text-subtle-2 uppercase">{variant}</h4>
      <Tabs {variant} value="overview">
        <Tabs.List aria-label="{variant} states">
          {#each tabs as tab (tab.value)}
            <Tabs.Trigger value={tab.value} disabled={tab.disabled}>{tab.label}</Tabs.Trigger>
          {/each}
        </Tabs.List>
        {#each tabs as tab (tab.value)}
          <Tabs.Content value={tab.value}><p class="py-3 text-sm">{tab.label} panel</p></Tabs.Content>
        {/each}
      </Tabs>
    </div>
  {/each}
</div>
