<script lang="ts">
  import { mdiDotsHorizontal } from "@mdi/js";
  import { Icon, Menu, Tabs } from "@viamrobotics/prime-ui";

  let order = $state(["main.ts", "config.json", "README.md", "utils.ts"]);
</script>

<div class="not-content w-full max-w-md">
  <Tabs variant="file">
    <Tabs.List aria-label="Open files" reorderable closable bind:order>
      {#each order as id (id)}
        <Tabs.Trigger value={id}>
          {id}
          {#snippet actions({ movePrevious, moveNext, canMovePrevious, canMoveNext })}
            <Menu>
              <Menu.Trigger
                class="icon-button"
                aria-label="Options for {id}"
                onclick={(event) => event.stopPropagation()}
              >
                <Icon icon={mdiDotsHorizontal} size="sm" />
              </Menu.Trigger>
              <Menu.Content aria-label="Options for {id}">
                <Menu.Item disabled={!canMovePrevious} onclick={movePrevious}>Move left</Menu.Item>
                <Menu.Item disabled={!canMoveNext} onclick={moveNext}>Move right</Menu.Item>
              </Menu.Content>
            </Menu>
          {/snippet}
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
