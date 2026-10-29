<script lang="ts">
  import {
    addPaneToUpperRight,
    floatPane,
    Panes,
    removeFloat,
    removePane,
  } from "@viamrobotics/prime-panes";
  import type {
    LayoutNode,
    PaneNode,
    PaneState,
  } from "@viamrobotics/prime-panes";

  interface PaneData {
    label: string;
  }

  const WINDOW_RECT = { x: 24, y: 24, width: 200, height: 140 };

  const leaf = (id: string, label: string): PaneNode<PaneData> => ({
    type: "pane",
    id,
    data: { label },
  });

  const initial = (): LayoutNode<PaneData> => ({
    type: "split",
    id: "root",
    direction: "row",
    ratio: 0.5,
    first: {
      type: "stack",
      id: "cameras",
      activeId: "camera-1",
      panes: [leaf("camera-1", "Camera 1"), leaf("camera-2", "Camera 2")],
    },
    second: {
      type: "float",
      id: "dashboard",
      base: {
        type: "split",
        id: "readouts",
        direction: "column",
        ratio: 0.5,
        first: leaf("map", "Map"),
        second: leaf("log", "Log"),
      },
      floats: [
        {
          id: "notes-window",
          rect: { x: 16, y: 40, width: 200, height: 130 },
          content: leaf("notes", "Notes"),
        },
      ],
    },
  });

  let layout = $state<LayoutNode<PaneData> | undefined>(initial());
  let added = 0;

  function addPane() {
    added += 1;
    layout = addPaneToUpperRight(
      layout,
      leaf(`added-${added}`, `Pane ${added}`),
      `added-split-${added}`,
    );
  }

  function popOut(id: string) {
    added += 1;
    layout = floatPane(
      layout,
      id,
      WINDOW_RECT,
      `window-${added}`,
      `float-${added}`,
    );
  }
</script>

<div class="flex h-full flex-col gap-2">
  <div class="flex items-center gap-2">
    <button type="button" class="button" onclick={addPane}>Add pane</button>
    <button type="button" class="button" onclick={() => (layout = initial())}>
      Reset layout
    </button>
  </div>

  <Panes
    bind:layout
    paneLabel={(node) => node.data.label}
    class="min-h-0 flex-1"
  >
    {#snippet empty()}
      <div
        class="flex size-full items-center justify-center text-sm text-subtle-2"
      >
        No panes. Add one to start.
      </div>
    {/snippet}

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

          <Panes.DragTrigger target="float">
            <div class="flex min-w-0 flex-1 items-center gap-1 self-stretch">
              <h2
                class="truncate px-1 text-xs font-semibold in-data-stacked:hidden"
              >
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
            </div>
          </Panes.DragTrigger>

          {#if state.isStacked}
            <Panes.MoveTrigger target="stack" class="button px-2 py-0.5 text-xs">
              Move stack
            </Panes.MoveTrigger>
          {/if}

          {#if state.isFloating}
            <Panes.MoveTrigger
              target="float"
              aria-label="Dock {node.data.label}"
              class="button px-2 py-0.5 text-xs"
            >
              Dock
            </Panes.MoveTrigger>
            <button
              type="button"
              aria-label="Close {node.data.label}"
              class="inline-flex size-6 items-center justify-center text-subtle-1"
              onclick={() =>
                (layout = removeFloat(layout, state.floatEntryId!))}
            >
              <svg
                viewBox="0 0 16 16"
                class="size-4"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
          {:else}
            <button
              type="button"
              aria-label="Remove {node.data.label}"
              class="inline-flex size-6 items-center justify-center text-subtle-1"
              onclick={() => (layout = removePane(layout, node.id))}
            >
              <svg
                viewBox="0 0 16 16"
                class="size-4"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
          {/if}
        </header>

        <Panes.PaneBody
          class="flex min-h-0 flex-1 flex-col items-center justify-center gap-2 text-subtle-2"
        >
          {node.id}
          {#if !state.isFloating}
            <button
              type="button"
              class="button px-2 py-0.5 text-xs"
              onclick={() => popOut(node.id)}
            >
              Pop out
            </button>
          {/if}
        </Panes.PaneBody>
      </div>
    {/snippet}
  </Panes>

  <p class="text-xs text-subtle-2">
    Drag a divider to resize. Drag a grip onto another pane to rearrange, or onto its tab strip to stack. Drag a window's title to move it.
  </p>
</div>
