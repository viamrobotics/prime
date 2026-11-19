<script lang="ts">
  import { mdiClose } from "@mdi/js";
  import { Icon, Tabs } from "@viamrobotics/prime-ui";

  let order = $state(["main.ts", "config.json", "README.md", "utils.ts"]);

  const close = (event: MouseEvent, id: string) => {
    event.stopPropagation();
    order = order.filter((existing) => existing !== id);
  };
</script>

<div class="not-content w-full max-w-md">
  <Tabs variant="file">
    <Tabs.List aria-label="Open files" reorderable bind:order>
      {#each order as id (id)}
        <Tabs.Trigger value={id}>
          <span>{id}</span>
          <button
            type="button"
            class="icon-button"
            aria-label="Close {id}"
            onclick={(event) => close(event, id)}
          >
            <Icon icon={mdiClose} size="sm" />
          </button>
        </Tabs.Trigger>
      {/each}
    </Tabs.List>
    {#each order as id (id)}
      <Tabs.Content value={id}>
        <p class="p-3 text-sm">Contents of {id}</p>
      </Tabs.Content>
    {/each}
  </Tabs>
  <p class="mt-2 text-sm">Order: {order.join(", ")}</p>
</div>
