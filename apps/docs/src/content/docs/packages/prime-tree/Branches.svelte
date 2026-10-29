<script lang="ts">
  import { Tree } from "@viamrobotics/prime-tree";
  import type { TreeBranchClick } from "@viamrobotics/prime-tree";

  interface FileNode {
    path: string;
    name: string;
    children?: FileNode[];
  }

  const files: FileNode[] = [
    {
      path: "src",
      name: "src",
      children: [{ path: "src/index.ts", name: "index.ts" }],
    },
    {
      path: "docs",
      name: "docs",
      children: [{ path: "docs/intro.md", name: "intro.md" }],
    },
  ];

  const modes: TreeBranchClick[] = ["toggle-and-select", "select", "toggle"];

  let branchClick = $state<TreeBranchClick>("toggle");
  let selected = $state<string[]>([]);
</script>

<div class="not-content flex flex-col gap-3">
  <label class="flex items-center gap-2 text-sm">
    branchClick
    <select class="input" bind:value={branchClick}>
      {#each modes as mode (mode)}
        <option value={mode}>{mode}</option>
      {/each}
    </select>
  </label>

  <Tree
    nodes={files}
    nodeToValue={(file) => file.path}
    nodeToString={(file) => file.name}
    nodeToChildren={(file) => file.children}
    {branchClick}
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
          style="padding-inline-start: calc(var(--depth) * 1rem + 1rem)"
        >
          {file.name}
        </Tree.Item>
      {/if}
    {/snippet}
  </Tree>

  <p class="text-sm text-subtle-2">selected: <code>{selected.join(", ") || "none"}</code></p>
</div>
