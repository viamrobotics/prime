<script lang="ts">
  import { Tabs } from "@viamrobotics/prime-ui";

  const { count = 3, disabled = false }: { count?: number; disabled?: boolean } = $props();

  const all = [
    { id: "overview", label: "Overview" },
    { id: "usage", label: "Usage" },
    { id: "api", label: "API" },
    { id: "styling", label: "Styling" },
  ];

  const tabs = $derived(all.slice(0, Math.max(1, Math.min(4, count))));
</script>

<div class="not-content w-full max-w-md">
  <Tabs>
    {#if tabs.length > 1}
      <Tabs.List aria-label="Details">
        {#each tabs as tab, index (tab.id)}
          <Tabs.Trigger value={tab.id} disabled={disabled && index === 1}>{tab.label}</Tabs.Trigger>
        {/each}
      </Tabs.List>
    {/if}
    {#each tabs as tab (tab.id)}
      <Tabs.Content value={tab.id}>
        <p class="py-3 text-sm">{tab.label} panel</p>
      </Tabs.Content>
    {/each}
  </Tabs>
</div>
