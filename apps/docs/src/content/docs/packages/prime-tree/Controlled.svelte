<script lang="ts">
  import { Tree } from "@viamrobotics/prime-tree";

  interface FolderNode {
    id: string;
    children?: FolderNode[];
  }

  const folders: FolderNode[] = [
    { id: "src", children: [{ id: "src/index.ts" }] },
    { id: "locked", children: [{ id: "locked/secret.ts" }] },
  ];

  let expanded = $state<string[]>(["src", "locked"]);
</script>

<div class="not-content flex flex-col gap-3">
  <Tree
    nodes={folders}
    nodeToValue={(folder) => folder.id}
    nodeToString={(folder) => folder.id}
    nodeToChildren={(folder) => folder.children}
    bind:expanded={
      () => expanded,
      (next) => {
        if (!next.includes("locked")) return;
        expanded = next;
      }
    }
    aria-label="Folders"
  >
    {#snippet node(folder, state)}
      {#if state.isBranch}
        <Tree.Branch>
          <Tree.BranchControl
            class="focus-ring rounded-sm py-1 text-sm"
            style="padding-inline-start: calc(var(--depth) * 1rem)"
          >
            <Tree.BranchTrigger aria-label={state.expanded ? "Collapse" : "Expand"}>
              <Tree.Indicator>{state.expanded ? "▾" : "▸"}</Tree.Indicator>
            </Tree.BranchTrigger>
            {folder.id}
          </Tree.BranchControl>
          <Tree.BranchContent />
        </Tree.Branch>
      {:else}
        <Tree.Item
          class="focus-ring rounded-sm py-1 text-sm"
          style="padding-inline-start: calc(var(--depth) * 1rem)"
        >
          {folder.id}
        </Tree.Item>
      {/if}
    {/snippet}
  </Tree>

  <p class="text-sm text-subtle-2">expanded: <code>{expanded.join(", ")}</code></p>
</div>
