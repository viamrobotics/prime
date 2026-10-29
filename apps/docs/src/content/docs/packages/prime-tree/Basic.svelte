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
</script>

<div class="not-content">
  <Tree
    nodes={files}
    nodeToValue={(file) => file.path}
    nodeToString={(file) => file.name}
    nodeToChildren={(file) => file.children}
    aria-label="Files"
  >
    {#snippet node(file, state)}
      {#if state.isBranch}
        <Tree.Branch>
          <Tree.BranchControl
            class="focus-ring rounded-sm py-1 text-sm"
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
          class="focus-ring rounded-sm py-1 text-sm"
          style="padding-inline-start: calc(var(--depth) * 1rem)"
        >
          {file.name}
        </Tree.Item>
      {/if}
    {/snippet}
  </Tree>
</div>
