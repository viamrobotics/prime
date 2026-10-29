<script lang="ts">
  import { Panes } from "@viamrobotics/prime-panes";
  import type {
    LayoutNode,
    PaneNode,
    PaneState,
  } from "@viamrobotics/prime-panes";

  interface PaneData {
    label: string;
  }

  const leaf = (id: string, label: string): PaneNode<PaneData> => ({
    type: "pane",
    id,
    data: { label },
  });

  let layout = $state<LayoutNode<PaneData> | undefined>({
    type: "split",
    id: "root",
    direction: "row",
    ratio: 0.6,
    first: {
      type: "stack",
      id: "cameras",
      activeId: "camera-a",
      panes: [
        leaf("camera-a", "Camera A"),
        leaf("camera-b", "Camera B"),
        leaf("camera-c", "Camera C"),
      ],
    },
    second: leaf("notes", "Notes"),
  });
  let keepInactiveMounted = $state(false);
</script>

<div class="flex h-full flex-col gap-3">
  <label class="flex items-center gap-2 text-sm text-default">
    <input type="checkbox" bind:checked={keepInactiveMounted} />
    Keep inactive panes mounted
  </label>

  <Panes
    bind:layout
    {keepInactiveMounted}
    paneLabel={(node) => node.data.label}
    class="min-h-0 flex-1"
  >
    {#snippet pane(node: PaneNode<PaneData>, state: PaneState)}
      <div
        class="flex size-full flex-col border border-light bg-white text-sm text-default"
      >
        <header
          class="flex items-center gap-1 border-b border-light bg-light px-1 py-1"
        >
          <Panes.DragTrigger>
            <Panes.MoveTrigger
              aria-label="Move {node.data.label}"
              class="inline-flex size-6 cursor-grab items-center justify-center text-subtle-1 active:cursor-grabbing"
            >
              <svg
                viewBox="0 0 16 16"
                class="size-4"
                fill="currentColor"
                aria-hidden="true"
              >
                <circle cx="5.5" cy="3.5" r="1.25" />
                <circle cx="10.5" cy="3.5" r="1.25" />
                <circle cx="5.5" cy="8" r="1.25" />
                <circle cx="10.5" cy="8" r="1.25" />
                <circle cx="5.5" cy="12.5" r="1.25" />
                <circle cx="10.5" cy="12.5" r="1.25" />
              </svg>
            </Panes.MoveTrigger>
          </Panes.DragTrigger>
          <h2 class="text-xs font-semibold in-data-stacked:hidden">
            {node.data.label}
          </h2>
          <Panes.TabList
            aria-label="Stacked panes"
            class="flex min-w-0 gap-1 text-xs"
          >
            <Panes.TabListDropRegion
              class="absolute inset-x-0 top-0 hidden h-4 border-t-2 border-dashed border-info-medium in-data-dragging:block in-data-move-mode:block"
            />
          </Panes.TabList>
          {#if state.isStacked}
            <Panes.MoveTrigger
              target="stack"
              class="button ml-auto px-2 py-0.5 text-xs"
            >
              Move stack
            </Panes.MoveTrigger>
          {/if}
        </header>

        <Panes.PaneBody class="flex min-h-0 flex-1 flex-col justify-center p-3">
          <input
            class="input"
            aria-label="Note for {node.data.label}"
            placeholder="Type here, then switch tabs"
          />
        </Panes.PaneBody>
      </div>
    {/snippet}
  </Panes>
</div>
