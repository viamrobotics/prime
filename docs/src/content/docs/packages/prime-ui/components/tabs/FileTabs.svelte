<script lang="ts">
  import { Tabs } from "@viamrobotics/prime-ui";

  let order = $state(["main.ts", "config.json", "README.md", "package.json", "tsconfig.json", "styles.css", "utils.ts"]);

  const unsaved = ["config.json", "utils.ts"];
</script>

{#snippet unsavedDot()}
  <span class="sr-only">Unsaved</span>
  <span aria-hidden="true" class="size-2 rounded-full bg-gray-7"></span>
{/snippet}

<div class="not-content w-full max-w-md">
  <Tabs variant="file">
    <Tabs.List aria-label="Open files" closable bind:order>
      {#each order as id (id)}
        <Tabs.Trigger value={id} status={unsaved.includes(id) ? unsavedDot : undefined}>
          {id}
        </Tabs.Trigger>
      {/each}
    </Tabs.List>
    {#each order as id (id)}
      <Tabs.Content value={id}>
        <p class="p-3 text-sm">Contents of {id}</p>
      </Tabs.Content>
    {/each}
  </Tabs>
</div>
