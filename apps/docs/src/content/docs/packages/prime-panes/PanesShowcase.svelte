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

  let emptyLayout = $state<LayoutNode<PaneData> | undefined>();

  let stackedLayout = $state<LayoutNode<PaneData> | undefined>({
    type: "stack",
    id: "cameras",
    activeId: "camera-b",
    panes: [
      leaf("camera-a", "Camera A"),
      leaf("camera-b", "Camera B"),
      leaf("camera-c", "Camera C"),
    ],
  });

  let floatedLayout = $state<LayoutNode<PaneData> | undefined>({
    type: "float",
    id: "dashboard",
    base: leaf("map", "Map"),
    floats: [
      {
        id: "camera-window",
        rect: { x: 24, y: 40, width: 200, height: 110 },
        content: leaf("camera", "Camera"),
      },
    ],
  });

  let movingLayout = $state<LayoutNode<PaneData> | undefined>({
    type: "split",
    id: "root",
    direction: "row",
    ratio: 0.5,
    first: leaf("camera", "Camera"),
    second: leaf("stats", "Stats"),
  });
</script>

{#snippet pane(node: PaneNode<PaneData>, state: PaneState)}
  <div
    class="flex size-full flex-col border border-light bg-white text-xs text-default"
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
          <h2 class="truncate px-1 font-semibold in-data-stacked:hidden">
            {node.data.label}
          </h2>
          <Panes.TabList aria-label="Stacked panes" class="flex min-w-0 gap-1">
            <Panes.TabListDropRegion
              class="absolute inset-x-0 top-0 hidden h-4 border-t-2 border-dashed border-info-medium in-data-dragging:block in-data-move-mode:block"
            />
          </Panes.TabList>
        </div>
      </Panes.DragTrigger>
      {#if state.isStacked}
        <Panes.MoveTrigger
          target="stack"
          class="button px-2 py-0.5 text-xs"
        >
          Move stack
        </Panes.MoveTrigger>
      {/if}
    </header>
    <Panes.PaneBody
      class="flex min-h-0 flex-1 items-center justify-center text-subtle-2"
    >
      {node.id}
    </Panes.PaneBody>
  </div>
{/snippet}

<div class="not-content grid gap-6 sm:grid-cols-2">
  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Empty</p>
    <Panes
      bind:layout={emptyLayout}
      {pane}
      paneLabel={(node) => node.data.label}
      class="h-56 border border-light"
    >
      {#snippet empty()}
        <div
          class="flex size-full items-center justify-center text-sm text-subtle-2"
        >
          No panes. Add one to start.
        </div>
      {/snippet}
    </Panes>
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Stacked</p>
    <Panes
      bind:layout={stackedLayout}
      {pane}
      paneLabel={(node) => node.data.label}
      class="h-56"
    />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Floated</p>
    <Panes
      bind:layout={floatedLayout}
      {pane}
      paneLabel={(node) => node.data.label}
      class="h-56"
    />
  </div>

  <div class="flex flex-col gap-2">
    <p class="text-xs font-medium text-subtle-2 uppercase">Move mode</p>
    <Panes
      bind:layout={movingLayout}
      {pane}
      paneLabel={(node) => node.data.label}
      class="h-56"
    />
    <p class="text-xs text-subtle-2">
      Activate a grip, then choose a destination. Escape cancels.
    </p>
  </div>
</div>
