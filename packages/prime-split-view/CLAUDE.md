# @viamrobotics/prime-split-view

Resizable, rearrangeable split-pane layouts for Svelte 5. It extracts the split-frame layout from the app's teleop and dashboard products. The layout is a plain binary tree that this package owns. Products that store layouts in another format, such as the app's protobuf trees, convert at their own boundary. Resizing uses the zag.js splitter, and panes rearrange by drag and drop. Pane content belongs to the consumer, through a `pane` snippet.

## Layout

- `src/lib/layout.ts`: the tree types `LayoutNode`, `SplitNode`, `PaneNode`, `SplitDirection`, and `SplitKey`. Type only, no runtime code.
- `src/lib/drop-region.ts`: maps a pointer position over a pane to a drop region (`center`, `left`, `right`, `top`, `bottom`) and the placement `movePane` takes.
- `src/lib/tree.ts`: immutable tree operations. Each returns the same root reference when nothing changed.
- `src/lib/SplitView/`: the `SplitView` component, its internal parts, and the context in `useSplitView.svelte.ts`. `split-view.ts` builds the compound `SplitView` export, with `DragTrigger.svelte` and `MoveTrigger.svelte` as its parts. `drag-ignore.ts` holds the `dragIgnore` attachment. `split-id.ts` creates the ids of splits that a drop makes.
- `src/lib/**/__tests__/`: tests and test fixtures, excluded from the published package.
- `src/routes/`: the SvelteKit playground, embedded in the docs site at `/playground/prime-split-view/`. Not published.
- `styles.css`: the consumer's Tailwind entry. It imports the tokens and points Tailwind at `dist`.

## Commands

```bash
pnpm --filter @viamrobotics/prime-split-view dev      # playground dev server
pnpm --filter @viamrobotics/prime-split-view build    # vite build + svelte-package + publint
pnpm --filter @viamrobotics/prime-split-view check    # svelte-check
pnpm --filter @viamrobotics/prime-split-view test     # vitest: client (browser) and server (node) projects
pnpm --filter @viamrobotics/prime-split-view lint     # eslint
pnpm --filter @viamrobotics/prime-split-view format   # prettier --check
```

Tests named `*.svelte.spec.ts` run in Chromium through `@vitest/browser-playwright`. Other `*.spec.ts` files run in node.

## Conventions

- Svelte 5 runes only. See [.claude/rules/svelte.md](../../.claude/rules/svelte.md).
- State flows through `bind:layout`, never a change callback. A function binding is the persistence hook and can veto a change.
- No zag.js names in the public API. Props and parts use web-standard vocabulary.
- No protobuf semantics. No `oneofKind`, numeric enums, or proto3 default handling. Format conversion belongs to the consumer.
- The `SplitView` root is unopinionated about layout. It has no default size, display, or styling, and the consumer sizes it with a class.
- Tailwind classes reference `@viamrobotics/tailwind-config` tokens only.
