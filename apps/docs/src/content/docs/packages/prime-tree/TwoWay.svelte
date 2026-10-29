<script lang="ts">
  import { Tree } from "@viamrobotics/prime-tree";

  interface FileNode {
    path: string;
    name: string;
    children?: FileNode[];
  }

  const files: FileNode[] = [
    {
      path: "src",
      name: "src",
      children: [
        { path: "src/index.ts", name: "index.ts" },
        { path: "src/app.svelte", name: "app.svelte" },
      ],
    },
    { path: "package.json", name: "package.json" },
  ];

  let expanded = $state<string[]>(["src"]);
  let selected = $state<string[]>([]);
</script>

<div class="not-content flex flex-col gap-3">
  <Tree
    nodes={files}
    nodeToValue={(file) => file.path}
    nodeToString={(file) => file.name}
    nodeToChildren={(file) => file.children}
    selectionMode="multiple"
    bind:expanded
    bind:selected
    aria-label="Files"
  >
    {#snippet node(file, state)}
      {#if state.isBranch}
        <Tree.Branch>
          <Tree.BranchControl
            class="focus-ring rounded-sm py-1 text-sm data-[selected]:bg-medium"
            style="padding-inline-start: calc(var(--depth) * 1rem)"
          >
            <Tree.BranchTrigger aria-label={state.expanded ? "Collapse" : "Expand"}>
              <Tree.Indicator>{state.expanded ? "▾" : "▸"}</Tree.Indicator>
            </Tree.BranchTrigger>
            {file.name}
          </Tree.BranchControl>
          <Tree.BranchContent />
        </Tree.Branch>
      {:else}
        <Tree.Item
          class="focus-ring rounded-sm py-1 text-sm data-[selected]:bg-medium"
          style="padding-inline-start: calc(var(--depth) * 1rem)"
        >
          {file.name}
        </Tree.Item>
      {/if}
    {/snippet}
  </Tree>

  <p class="text-sm text-subtle-2">expanded: <code>{expanded.join(", ") || "none"}</code></p>
  <p class="text-sm text-subtle-2">selected: <code>{selected.join(", ") || "none"}</code></p>
</div>
