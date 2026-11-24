<script lang="ts">
  import { Tabs, type TabsVariant } from "@viamrobotics/prime-ui";

  const {
    count = 3,
    disabled = false,
    reorderable = false,
    variant = "underline",
  }: { count?: number; disabled?: boolean; reorderable?: boolean; variant?: TabsVariant } = $props();

  const all = [
    { id: "overview", label: "Overview" },
    { id: "usage", label: "Usage" },
    { id: "api", label: "API" },
    { id: "styling", label: "Styling" },
  ];

  const tabs = $derived(all.slice(0, Math.max(1, count)));

  let order = $state(all.map((tab) => tab.id));

  const shown = $derived(
    order.flatMap((id) => {
      const tab = tabs.find((candidate) => candidate.id === id);
      return tab ? [tab] : [];
    }),
  );

  const mergeShownOrder = (next: string[]) => {
    const queue = [...next];
    order = order.map((id) => (tabs.some((tab) => tab.id === id) ? (queue.shift() ?? id) : id));
  };
</script>

<div class="not-content w-full max-w-md">
  <Tabs {variant}>
    {#if tabs.length > 1}
      <Tabs.List aria-label="Details" {reorderable} bind:order={() => shown.map((tab) => tab.id), mergeShownOrder}>
        {#each shown as tab, index (tab.id)}
          <Tabs.Trigger value={tab.id} disabled={disabled && index === 1}>
            {tab.label}
            {#snippet actions()}
              {#if reorderable}
                <Tabs.MovePrevious />
                <Tabs.MoveNext />
              {/if}
            {/snippet}
          </Tabs.Trigger>
        {/each}
      </Tabs.List>
    {/if}
    {#each shown as tab (tab.id)}
      <Tabs.Content value={tab.id}>
        <p class="py-3 text-sm">{tab.label} panel</p>
      </Tabs.Content>
    {/each}
  </Tabs>
</div>
