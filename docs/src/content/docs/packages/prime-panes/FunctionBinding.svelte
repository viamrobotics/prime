<script lang="ts">
  import { Panes } from "@viamrobotics/prime-panes";
  import type { LayoutNode } from "@viamrobotics/prime-panes";

  interface PaneData {
    title: string;
  }

  type Layout = LayoutNode<PaneData> | undefined;

  let layout = $state<Layout>({
    type: "split",
    id: "root",
    direction: "row",
    ratio: 0.5,
    first: { type: "pane", id: "camera", data: { title: "Camera" } },
    second: { type: "pane", id: "stats", data: { title: "Stats" } },
  });
  let isLocked = $state(false);
  let proposed = $state(0);
  let rejected = $state(0);

  function propose(next: Layout) {
    proposed += 1;
    if (isLocked) {
      rejected += 1;
      return;
    }
    layout = next;
  }
</script>

<div class="flex h-full flex-col gap-3">
  <label class="flex items-center gap-2 text-sm text-default">
    <input type="checkbox" bind:checked={isLocked} />
    Lock the layout
  </label>

  <Panes
    bind:layout={() => layout, propose}
    paneLabel={(node) => node.data.title}
    class="min-h-0 flex-1"
  >
    {#snippet pane(node)}
      <div class="flex size-full flex-col border border-light bg-white">
        <Panes.DragTrigger>
          <header
            class="flex cursor-grab items-center gap-2 border-b border-light bg-light px-2 py-1 text-xs font-semibold text-default"
          >
            {node.data.title}
            <Panes.MoveTrigger
              aria-label="Move {node.data.title}"
              class="button ml-auto px-2 py-0.5 text-xs font-normal"
            >
              Move
            </Panes.MoveTrigger>
          </header>
        </Panes.DragTrigger>
      </div>
    {/snippet}
  </Panes>

  <p class="text-sm text-subtle-2" aria-live="polite">
    {proposed} proposed, {rejected} rejected
  </p>
</div>
