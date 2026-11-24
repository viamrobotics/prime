<script lang="ts">
  import { Tabs } from "@viamrobotics/prime-ui";

  let order = $state(["Tab 1", "Tab 2", "Tab 3"]);
  let next = 4;

  const add = () => {
    order = [...order, `Tab ${next}`];
    next += 1;
  };
</script>

<div class="not-content flex w-full max-w-md flex-col gap-3">
  <Tabs>
    {#if order.length > 1}
      <Tabs.List aria-label="Documents" closable bind:order>
        {#each order as id (id)}
          <Tabs.Trigger value={id} class="flex items-center gap-1.5">
            {id}
          </Tabs.Trigger>
        {/each}
      </Tabs.List>
    {/if}
    {#each order as id (id)}
      <Tabs.Content value={id}>
        <p class="py-3 text-sm">
          Close the selected tab and selection falls back to the leftmost. At one tab the list hides.
        </p>
      </Tabs.Content>
    {/each}
  </Tabs>
  <button type="button" class="button self-start" onclick={add}>Add tab</button>
</div>
