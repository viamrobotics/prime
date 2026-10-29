<script lang="ts">
  import { Tree } from "@viamrobotics/prime-tree";

  interface FileNode {
    path: string;
    name: string;
    note: string;
    children?: FileNode[];
    disabled?: boolean;
  }

  const files: FileNode[] = [
    {
      path: "open",
      name: "expanded",
      note: "expanded",
      children: [{ path: "open/child", name: "child", note: "leaf" }],
    },
    {
      path: "closed",
      name: "collapsed",
      note: "collapsed",
      children: [{ path: "closed/child", name: "hidden child", note: "leaf" }],
    },
    { path: "selected", name: "selected", note: "selected" },
    { path: "disabled", name: "disabled", note: "disabled", disabled: true },
  ];

  let expanded = $state<string[]>(["open"]);
  let selected = $state<string[]>(["selected"]);
</script>

<div class="not-content">
  <Tree
    nodes={files}
    nodeToValue={(file) => file.path}
    nodeToString={(file) => file.name}
    nodeToChildren={(file) => file.children}
    isNodeDisabled={(file) => file.disabled === true}
    bind:expanded
    bind:selected
    aria-label="Row states"
  >
    {#snippet node(file, state)}
      {#if state.isBranch}
        <Tree.Branch>
          <Tree.BranchControl
            class="focus-ring flex items-center gap-1 rounded-sm py-1 text-sm hover:bg-light data-[selected]:bg-medium"
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
          class={[
            "focus-ring rounded-sm py-1 text-sm hover:bg-light data-[selected]:bg-medium",
            state.disabled && "text-disabled",
          ]}
          style="padding-inline-start: calc(var(--depth) * 1rem + 1rem)"
        >
          {file.name}
          {#if state.focused}<span class="text-subtle-2">(focused)</span>{/if}
        </Tree.Item>
      {/if}
    {/snippet}
  </Tree>
</div>
