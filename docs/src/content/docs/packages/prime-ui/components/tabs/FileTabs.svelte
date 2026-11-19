<script lang="ts">
  import { mdiClose } from "@mdi/js";
  import { Icon, Tabs } from "@viamrobotics/prime-ui";

  let ids = $state(["main.ts", "config.json", "README.md", "package.json", "tsconfig.json", "styles.css", "utils.ts"]);

  const close = (event: MouseEvent, id: string) => {
    event.stopPropagation();
    ids = ids.filter((existing) => existing !== id);
  };
</script>

<div class="not-content w-full max-w-md">
  <Tabs variant="file">
    <Tabs.List aria-label="Open files">
      {#each ids as id (id)}
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
    {#each ids as id (id)}
      <Tabs.Content value={id}>
        <p class="p-3 text-sm">Contents of {id}</p>
      </Tabs.Content>
    {/each}
  </Tabs>
</div>
