<script lang="ts">
  import {
    floatPane,
    Panes,
    removeFloat,
    setFloatRect,
  } from "@viamrobotics/prime-panes";
  import type {
    FloatRect,
    LayoutNode,
    PaneNode,
    PaneState,
  } from "@viamrobotics/prime-panes";

  interface PaneData {
    label: string;
  }

  const STEP = 40;
  const NEW_WINDOW: FloatRect = { x: 24, y: 24, width: 240, height: 160 };
  const ADJUSTMENTS = [
    {
      label: "Narrower",
      change: (rect: FloatRect) => ({ ...rect, width: rect.width - STEP }),
    },
    {
      label: "Wider",
      change: (rect: FloatRect) => ({ ...rect, width: rect.width + STEP }),
    },
    {
      label: "Left",
      change: (rect: FloatRect) => ({ ...rect, x: rect.x - STEP }),
    },
    {
      label: "Right",
      change: (rect: FloatRect) => ({ ...rect, x: rect.x + STEP }),
    },
  ];

  const leaf = (id: string, label: string): PaneNode<PaneData> => ({
    type: "pane",
    id,
    data: { label },
  });

  let layout = $state<LayoutNode<PaneData> | undefined>({
    type: "float",
    id: "dashboard",
    base: {
      type: "split",
      id: "base",
      direction: "column",
      ratio: 0.5,
      first: leaf("map", "Map"),
      second: leaf("telemetry", "Telemetry"),
    },
    floats: [
      {
        id: "camera-window",
        rect: { x: 24, y: 24, width: 240, height: 160 },
        content: leaf("camera", "Camera"),
      },
    ],
  });
  let opened = 0;

  function popOut(paneId: string) {
    opened += 1;
    layout = floatPane(
      layout,
      paneId,
      NEW_WINDOW,
      `window-${opened}`,
      `float-${opened}`,
    );
  }

  function adjust(entryId: string, change: (rect: FloatRect) => FloatRect) {
    layout = setFloatRect(layout, entryId, change);
  }
</script>

<Panes
  bind:layout
  paneLabel={(node) => node.data.label}
  class="h-full"
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

        <Panes.DragTrigger target="float">
          <h2
            class="min-w-0 flex-1 self-stretch truncate px-1 text-xs font-semibold in-data-floating:cursor-move"
          >
            {node.data.label}
          </h2>
        </Panes.DragTrigger>

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
            onclick={() => (layout = removeFloat(layout, state.floatEntryId!))}
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
            class="button px-2 py-0.5 text-xs"
            onclick={() => popOut(node.id)}
          >
            Pop out
          </button>
        {/if}
      </header>

      <Panes.PaneBody
        class="flex min-h-0 flex-1 flex-wrap content-center items-center justify-center gap-1 p-2"
      >
        {#if state.isFloating}
          {#each ADJUSTMENTS as adjustment (adjustment.label)}
            <button
              type="button"
              class="button min-h-6 px-2 py-0.5 text-xs"
              onclick={() => adjust(state.floatEntryId!, adjustment.change)}
            >
              {adjustment.label}
            </button>
          {/each}
        {/if}
      </Panes.PaneBody>
    </div>
  {/snippet}
</Panes>
