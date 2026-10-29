<script lang="ts">
  import { Panes } from "@viamrobotics/prime-panes";
  import type { LayoutNode } from "@viamrobotics/prime-panes";

  interface PaneData {
    title: string;
    variant: "grip" | "header";
    hint: string;
  }

  let layout = $state<LayoutNode<PaneData> | undefined>({
    type: "split",
    id: "root",
    direction: "row",
    ratio: 0.5,
    first: {
      type: "pane",
      id: "grip",
      data: {
        title: "Grip",
        variant: "grip",
        hint: "Press the grip to drag. Click it to move.",
      },
    },
    second: {
      type: "pane",
      id: "header",
      data: {
        title: "Header",
        variant: "header",
        hint: "Press the header to drag. Click Move to move.",
      },
    },
  });
</script>

<Panes
  bind:layout
  paneLabel={(node) => node.data.title}
  class="h-full"
>
  {#snippet pane(node)}
    <div
      class="flex size-full flex-col border border-light bg-white text-sm text-default"
    >
      {#if node.data.variant === "grip"}
        <header
          class="flex items-center gap-1 border-b border-light bg-light px-1 py-1"
        >
          <Panes.DragTrigger>
            <Panes.MoveTrigger
              aria-label="Move {node.data.title}"
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
          <h2 class="text-xs font-semibold">{node.data.title}</h2>
        </header>
      {:else}
        <Panes.DragTrigger>
          <header
            class="flex cursor-grab items-center gap-1 border-b border-light bg-light px-2 py-1 active:cursor-grabbing"
          >
            <h2 class="text-xs font-semibold">{node.data.title}</h2>
            <Panes.MoveTrigger
              aria-label="Move {node.data.title}"
              class="button ml-auto px-2 py-0.5 text-xs"
            >
              Move
            </Panes.MoveTrigger>
          </header>
        </Panes.DragTrigger>
      {/if}
      <div
        class="flex min-h-0 flex-1 items-center justify-center p-3 text-center text-xs text-subtle-2"
      >
        {node.data.hint}
      </div>
    </div>
  {/snippet}
</Panes>
