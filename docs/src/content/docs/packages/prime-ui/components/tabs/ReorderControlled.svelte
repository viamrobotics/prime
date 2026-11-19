<script lang="ts">
  import { Tabs } from "@viamrobotics/prime-ui";

  let order = $state(["home", "docs", "blog", "about"]);
</script>

<div class="not-content w-full max-w-md">
  <Tabs>
    <Tabs.List
      aria-label="Sections"
      reorderable
      bind:order={
        () => order,
        (next) => {
          if (next[0] === "home") order = next;
        }
      }
    >
      {#each order as id (id)}
        <Tabs.Trigger value={id}>{id}</Tabs.Trigger>
      {/each}
    </Tabs.List>
    {#each order as id (id)}
      <Tabs.Content value={id}>
        <p class="p-3 text-sm">The {id} panel</p>
      </Tabs.Content>
    {/each}
  </Tabs>
  <p class="mt-2 text-sm">The home tab is pinned, so any move that displaces it is refused.</p>
</div>
