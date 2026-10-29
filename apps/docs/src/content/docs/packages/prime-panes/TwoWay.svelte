<script lang="ts">
  import { Panes } from "@viamrobotics/prime-panes";
  import type { LayoutNode } from "@viamrobotics/prime-panes";

  interface PaneData {
    title: string;
  }

  let layout = $state<LayoutNode<PaneData> | undefined>({
    type: "split",
    id: "root",
    direction: "row",
    ratio: 0.6,
    first: { type: "pane", id: "camera", data: { title: "Camera" } },
    second: { type: "pane", id: "stats", data: { title: "Stats" } },
  });
</script>

<div class="flex h-full flex-col gap-3">
  <Panes
    bind:layout
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

  <pre
    class="h-28 shrink-0 overflow-auto rounded-sm border border-light bg-light p-2 text-xs text-default">{JSON.stringify(
      layout,
      null,
      2,
    )}</pre>
</div>
