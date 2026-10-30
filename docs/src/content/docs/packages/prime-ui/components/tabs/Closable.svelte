<script lang="ts">
  import { mdiClose } from "@mdi/js";
  import { Icon, Tabs } from "@viamrobotics/prime-ui";

  let ids = $state([1, 2, 3]);
  let next = 4;

  const close = (event: MouseEvent, n: number) => {
    event.stopPropagation();
    ids = ids.filter((existing) => existing !== n);
  };

  const add = () => {
    ids = [...ids, next];
    next += 1;
  };
</script>

<div class="not-content flex w-full max-w-md flex-col gap-3">
  <Tabs>
    {#if ids.length > 1}
      <Tabs.List aria-label="Documents">
        {#each ids as n (n)}
          <Tabs.Trigger value="tab-{n}" class="flex items-center gap-1.5">
            Tab {n}
            <button
              type="button"
              class="icon-button"
              aria-label="Close Tab {n}"
              onclick={(event) => close(event, n)}
            >
              <Icon icon={mdiClose} size="sm" />
            </button>
          </Tabs.Trigger>
        {/each}
      </Tabs.List>
    {/if}
    {#each ids as n (n)}
      <Tabs.Content value="tab-{n}">
        <p class="py-3 text-sm">
          Close the selected tab and selection falls back to the first. At one tab the list hides.
        </p>
      </Tabs.Content>
    {/each}
  </Tabs>
  <button type="button" class="button self-start" onclick={add}>Add tab</button>
</div>
