<script lang="ts">
  import { Tree } from "@viamrobotics/prime-tree";
  import type { TreeBranchClick } from "@viamrobotics/prime-tree";

  interface FileNode {
    id: string;
    name: string;
    kind: "folder" | "file";
    children?: FileNode[];
    disabled?: boolean;
  }

  const nodes: FileNode[] = [
    {
      id: "src",
      name: "src",
      kind: "folder",
      children: [
        {
          id: "src/lib",
          name: "lib",
          kind: "folder",
          children: [
            { id: "src/lib/index.ts", name: "index.ts", kind: "file" },
            { id: "src/lib/tree.ts", name: "tree.ts", kind: "file" },
          ],
        },
        { id: "src/main.ts", name: "main.ts", kind: "file" },
        { id: "src/legacy.ts", name: "legacy.ts", kind: "file", disabled: true },
      ],
    },
    {
      id: "docs",
      name: "docs",
      kind: "folder",
      children: [
        { id: "docs/intro.md", name: "intro.md", kind: "file" },
        { id: "docs/guide.md", name: "guide.md", kind: "file" },
      ],
    },
    { id: "assets", name: "assets", kind: "folder", children: [] },
    { id: "package.json", name: "package.json", kind: "file" },
    { id: "README.md", name: "README.md", kind: "file" },
  ];

  let expanded = $state<string[]>(["src"]);
  let selected = $state<string[]>([]);
  let selectionMode = $state<"single" | "multiple">("single");
  let branchClick = $state<TreeBranchClick>("toggle-and-select");

  const ROW = "rounded-sm py-1 text-sm focus-ring hover:bg-light data-[selected]:bg-medium";
</script>

<div class="not-content flex flex-col gap-4">
  <div class="flex flex-wrap items-center gap-4">
    <label class="flex items-center gap-2 text-sm">
      Selection
      <select class="input" bind:value={selectionMode}>
        <option value="single">single</option>
        <option value="multiple">multiple</option>
      </select>
    </label>
    <label class="flex items-center gap-2 text-sm">
      Branch click
      <select class="input" bind:value={branchClick}>
        <option value="toggle-and-select">toggle and select</option>
        <option value="toggle">toggle</option>
        <option value="select">select</option>
      </select>
    </label>
    <button type="button" class="button" onclick={() => (expanded = [])}>Collapse all</button>
  </div>

  <Tree
    aria-label="Project files"
    class="rounded-sm border border-medium p-1"
    {nodes}
    bind:expanded
    bind:selected
    {selectionMode}
    {branchClick}
    nodeToValue={(file) => file.id}
    nodeToString={(file) => file.name}
    nodeToChildren={(file) => file.children}
    nodeToChildrenCount={(file) =>
      file.kind === "folder" ? (file.children?.length ?? 0) : undefined}
    isNodeDisabled={(file) => file.disabled === true}
  >
    {#snippet node(file, state)}
      {#if state.isBranch}
        <Tree.Branch>
          <Tree.BranchControl
            class={[ROW, "flex items-center gap-1"]}
            style="padding-inline-start: calc(var(--depth) * 1rem)"
          >
            <Tree.BranchTrigger
              class="flex items-center"
              aria-label={state.expanded ? "Collapse" : "Expand"}
            >
              <Tree.Indicator class="inline-block data-[state=open]:rotate-90">&gt;</Tree.Indicator>
            </Tree.BranchTrigger>
            {file.name}
          </Tree.BranchControl>
          <Tree.BranchContent />
        </Tree.Branch>
      {:else}
        <Tree.Item
          class={[ROW, file.disabled && "text-disabled"]}
          style="padding-inline-start: calc(var(--depth) * 1rem)"
        >
          {file.name}
        </Tree.Item>
      {/if}
    {/snippet}
  </Tree>

  <p class="text-sm text-subtle-2">Expanded: <code>{expanded.join(", ") || "none"}</code></p>
  <p class="text-sm text-subtle-2">Selected: <code>{selected.join(", ") || "none"}</code></p>
</div>
