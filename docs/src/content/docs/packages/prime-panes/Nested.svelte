<script lang="ts">
  import { Panes } from "@viamrobotics/prime-panes";
  import type { LayoutNode } from "@viamrobotics/prime-panes";

  interface AppPane {
    title: string;
    isVisualizer?: true;
  }

  interface ToolPane {
    title: string;
  }

  let outer = $state<LayoutNode<AppPane> | undefined>({
    type: "split",
    id: "app",
    direction: "row",
    ratio: 0.35,
    first: { type: "pane", id: "notes", data: { title: "Notes" } },
    second: {
      type: "pane",
      id: "visualizer",
      data: { title: "Visualizer", isVisualizer: true },
    },
  });

  let inner = $state<LayoutNode<ToolPane> | undefined>({
    type: "split",
    id: "tools",
    direction: "column",
    ratio: 0.6,
    first: { type: "pane", id: "scene", data: { title: "Scene" } },
    second: { type: "pane", id: "inspector", data: { title: "Inspector" } },
  });
</script>

<Panes
  bind:layout={outer}
  paneLabel={(node) => node.data.title}
  class="h-full"
>
  {#snippet pane(node)}
    <Panes.DragTrigger>
      <div class="flex size-full flex-col border border-light bg-white">
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

        {#if node.data.isVisualizer}
          <Panes
            bind:layout={inner}
            paneLabel={(tool) => tool.data.title}
            class="min-h-0 flex-1"
          >
            {#snippet pane(tool)}
              <div class="flex size-full flex-col border border-light bg-white">
                <Panes.DragTrigger>
                  <header
                    class="flex cursor-grab items-center gap-2 border-b border-light bg-light px-2 py-1 text-xs text-default"
                  >
                    {tool.data.title}
                    <Panes.MoveTrigger
                      aria-label="Move {tool.data.title}"
                      class="button ml-auto px-2 py-0.5 text-xs"
                    >
                      Move
                    </Panes.MoveTrigger>
                  </header>
                </Panes.DragTrigger>
              </div>
            {/snippet}
          </Panes>
        {/if}
      </div>
    </Panes.DragTrigger>
  {/snippet}
</Panes>
