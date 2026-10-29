# @viamrobotics/prime-tree

Headless tree view for Svelte 5. The package owns behavior and accessibility: keyboard navigation, roving focus, selection, expansion, and the ARIA attributes. The consumer owns every row's markup through a `node` snippet, and the tree draws no chrome. Behavior comes from the zag.js tree view machine. Nodes are the consumer's own type, described to the tree by accessor functions.

## Layout

- `src/lib/Tree/tree-accessors.ts`: `TreeAccessors`, the functions that describe a consumer's node type: `nodeToValue`, `nodeToString`, `nodeToChildren`, and the optional `nodeToChildrenCount` and `isNodeDisabled`. Type only.
- `src/lib/Tree/tree-node-state.ts`: `TreeNodeState`, the `node` snippet's second argument. Type only.
- `src/lib/Tree/branch-click.ts`: `TreeBranchClick`, what a click or Enter on a branch row does. Type only.
- `src/lib/Tree/Tree.svelte`: the root. It renders the `role="tree"` element and takes `nodes`, the accessors, `bind:expanded`, `bind:selected`, `selectionMode`, `branchClick`, the `node` snippet, and an optional `children` snippet that renders the root rows itself.
- `src/lib/Tree/useTree.svelte.ts`: the two contexts. `provideTree` carries the machine api, the `node` snippet, and `branchClick` from the root to the parts, and `provideTreeNode` carries one node, its index path, its sibling count, and its state from `TreeNodeRow` to the parts inside its snippet.
- `src/lib/Tree/defer-focus.ts`: defers zag's focus notification by a microtask, because a synchronous focus inside zag's keydown transition re-enters the machine.
- `src/lib/Tree/TreeNodes.svelte` and `TreeNodeRow.svelte`: the internal recursion. They call the `node` snippet once per visible node and are not exported.
- `src/lib/Tree/{Branch,BranchControl,BranchTrigger,BranchContent,Item,Indicator,IndentGuide,Row}.svelte`: the parts a `node` snippet places. `Branch` and `Item` are `role="treeitem"` and set `--depth`, `BranchControl` and `Item` hold the roving `tabindex`, `BranchContent` is `role="group"`, and `Indicator` and `IndentGuide` are `aria-hidden`. Each renders one element, spreads the consumer's attributes over its own, and renders `children`. `BranchContent` renders one row per child node, or its `children` snippet with the child nodes when the consumer arranges the rows itself. `Row` renders one node through the `node` snippet, for such a snippet, and no element of its own. `BranchControl` replaces zag's click and activation keys with its own toggle when `branchClick` is `'toggle'`.
- `src/lib/Tree/tree.ts`: builds the compound `Tree` export from the root and its parts.
- `src/lib/index.ts`: the public exports.
- `src/lib/**/__tests__/`: the specs, excluded from the published package.
- `test/`: shared test infrastructure, never published. `nodes.ts` holds the shared node data and `fixtures/` holds the wrapper components specs render.
- `src/routes/`: the SvelteKit playground, embedded in the docs site at `/playground/prime-tree/`. Not published.
- `styles.css`: the consumer's Tailwind entry. It imports the tokens and points Tailwind at `dist`.

## Commands

```bash
pnpm --filter @viamrobotics/prime-tree dev      # playground dev server
pnpm --filter @viamrobotics/prime-tree build    # vite build + svelte-package + publint
pnpm --filter @viamrobotics/prime-tree check    # svelte-check
pnpm --filter @viamrobotics/prime-tree test     # vitest
pnpm --filter @viamrobotics/prime-tree lint     # eslint
pnpm --filter @viamrobotics/prime-tree format   # prettier --check
```

Tests named `*.svelte.spec.ts` run in Chromium through `@vitest/browser-playwright`, at a 1000 by 1400 viewport. Browser specs pin the keyboard behavior, so a change to focus or selection needs a spec that presses the real key.

## Conventions

- Svelte 5 runes only. See [.claude/rules/svelte.md](../../.claude/rules/svelte.md).
- State flows through `bind:expanded` and `bind:selected`, never a change callback. A function binding can refuse a change by not assigning.
- No zag.js names in the public API. Props and parts use web-standard vocabulary.
- No chrome. The tree sets no indentation, icons, or colors. It exposes `depth` in the state and a `--depth` custom property on each row.
- Tailwind classes reference `@viamrobotics/tailwind-config` tokens only.
