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
        {
          path: "src/lib",
          name: "lib",
          children: [
            { path: "src/lib/index.ts", name: "index.ts" },
            { path: "src/lib/tree.ts", name: "tree.ts" },
          ],
        },
        { path: "src/main.ts", name: "main.ts" },
      ],
    },
    { path: "package.json", name: "package.json" },
  ];

  let expanded = $state<string[]>(["src", "src/lib"]);

  const nodeToValue = (file: FileNode) => file.path;
</script>

<div class="not-content">
  <Tree
    nodes={files}
    {nodeToValue}
    nodeToString={(file) => file.name}
    nodeToChildren={(file) => file.children}
    bind:expanded
    aria-label="Files"
  >
    {#snippet node(file, state)}
      {#if state.isBranch}
        <Tree.Branch>
          <Tree.BranchControl
            class="focus-ring flex items-center gap-1 rounded-sm py-1 text-sm hover:bg-light"
            style="padding-inline-start: calc(var(--depth) * 1rem)"
          >
            <Tree.BranchTrigger
              class="flex items-center"
              aria-label={state.expanded ? "Collapse" : "Expand"}
            >
              <Tree.Indicator class="inline-block transition-transform data-[state=open]:rotate-90">
                &gt;
              </Tree.Indicator>
            </Tree.BranchTrigger>
            {file.name}
          </Tree.BranchControl>
          <Tree.BranchContent class="relative">
            {#snippet children(rows)}
              <Tree.IndentGuide
                class="absolute inset-y-0 w-px bg-medium"
                style="inset-inline-start: calc(var(--depth) * 1rem + 0.5rem)"
              />
              {#each rows as row, index (nodeToValue(row as FileNode))}
                <Tree.Row node={row} {index} />
              {/each}
            {/snippet}
          </Tree.BranchContent>
        </Tree.Branch>
      {:else}
        <Tree.Item
          class="focus-ring rounded-sm py-1 text-sm hover:bg-light"
          style="padding-inline-start: calc(var(--depth) * 1rem + 1rem)"
        >
          {file.name}
        </Tree.Item>
      {/if}
    {/snippet}
  </Tree>
</div>
