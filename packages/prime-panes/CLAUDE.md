# @viamrobotics/prime-panes

Resizable, rearrangeable split-pane layouts for Svelte 5. It extracts the split-frame layout from the app's teleop and dashboard products. The layout is a plain tree that this package owns. Splits are binary, its leaves are panes or stacks of panes behind tabs, and a float node draws windows over a base node. Products that store layouts in another format, such as the app's protobuf trees, convert at their own boundary. Resizing uses the zag.js splitter, windows use the zag.js floating panel, and panes rearrange by pointer drags or by move mode. Pane content belongs to the consumer, through a `pane` snippet.

## Layout

- `src/lib/layout.ts`: the tree types `LayoutNode`, `SplitNode`, `PaneNode`, `StackNode`, `FloatNode`, `FloatEntry`, `FloatRect`, `SplitDirection`, and `SplitKey`. Type only, no runtime code.
- `src/lib/drop-region.ts`: maps a pointer position over a pane to a drop region (`center`, `left`, `right`, `top`, `bottom`, `stack`) and the placement `movePane` takes, which `placementFor` makes from an edge region. `getDropRegion` reads a point against one rect. `getPaneDropRegion` returns `stack` only over the pane's `TabListDropRegion`, and takes the edges and center from `PaneBody`'s rect, or the pane's without one. `getDragRegion` also treats a dragged tab's own `TabList` as a reorder zone, and `nearestEdge` picks the edge a move-mode point falls back to. `stackSideOf` gives the edge a tab region sits toward. `insertionIndexAt` finds where a drop lands in a tab strip.
- `src/lib/node-kind.ts`: the container adapter registry. Every tree walk, path rebuild, and removal goes through `childrenOf`, `withChildren`, `replaceChild`, and `removeChild`, so a new node kind adds one adapter and fails to compile at the registry until it does. `stack-adapter.ts` is the stack's adapter, and the split's and the float node's adapters sit beside their components. A path step is `{ parent, index }`, and a stacked pane's last step has its stack as `parent`.
- `src/lib/tree.ts`: immutable tree operations. Each returns the same root reference when nothing changed. A function that handles every node kind does it in a `switch` with a `never` default. A check for one kind compares `type`. The float operations `floatPane`, `floatStack`, `setFloatRect`, `raiseFloat`, and `removeFloat` live here too.
- `src/lib/SplitPanes/`: split-only code. `SplitPanes.svelte` renders a split through the zag.js splitter, `split-adapter.ts` is the split's adapter, and `set-split-ratio.ts` holds `setSplitRatio`.
- `src/lib/Panes/`: the `Panes` component, its internal parts, and the context in `usePanes.svelte.ts`. `panes.ts` builds the compound `Panes` export, with `DragTrigger.svelte`, `MoveTrigger.svelte`, `PaneBody.svelte`, `TabList.svelte`, and `TabListDropRegion.svelte` as its parts. `drag-ignore.ts` holds the `dragIgnore` attachment, `drag-preview.ts` the `DragPreview` type, and `pane-state.ts` `PaneState`, the `pane` snippet's second argument.
  - Rendering: `Panes.svelte` is the root, which renders the status region and the ghost. `PanesNode.svelte` picks a node's renderer by kind. `PaneStack.svelte` renders a stack's shown pane, and every pane when `keepInactiveMounted` is set. `PaneFrame.svelte` wraps one pane, owns its move-mode keys, and mounts a `MoveTarget.svelte` for each destination. `MoveTarget.svelte` renders the destination's edge buttons and reads their arrow keys. `DragGhost.svelte` draws the ghost that follows the pointer.
  - Pointer: `watch-drag-press.ts` runs drags on pointer events. `classify-press.ts` decides whether a press is ignored, held, immediate, or on a grip. `drop-target.ts` resolves a drag's region and source to the node a drop acts on, and tells whether a pane has a destination. `indicator-geometry.ts` holds the classes that place a drop indicator for each region.
  - Move mode: `arrow-regions.ts` steps an arrow key through a pane's regions and tab positions. `spatial-neighbor.ts` finds the pane an arrow crosses into, within one layer. A move that starts in a window holding no destination begins on the first destination in the base layer, and an arrow in move mode never scrolls the page. `move-wording.ts` writes the notice, button names, and announcements. `tab-list-keys.ts` maps a tab's keys to a target tab and a reorder step.
  - Lookup: `list-panes.ts` lists and finds the slots, stacks, and panes of a layout. `shown-pane.ts` gives a stack's shown pane id, falling back to the first pane when `activeId` names none. `attached-elements.ts` tracks which elements a part has attached, and `latest` is the most recent. `root-scope.ts` marks a root's element so a handler tells a nested root's events from its own. `node-id.ts` creates the ids of the splits and stacks that a drop makes.
- `src/lib/FloatPanes/`: float-only code. `FloatPanes.svelte` renders a float node's base and windows, and `FloatWindow.svelte` is one window, a zag.js floating panel with its eight resize handles and its keys. `float-adapter.ts` is the float node's adapter, `float-entry-context.ts` gives a pane the id of its window, `float-geometry.ts` clamps a rect to its box and a minimum size, `float-keys.ts` turns arrow keys into a move or resize of a rect, and `float-resize.ts` holds the resize axes and the rect a handle drag makes.
- `src/lib/**/__tests__/`: the specs, excluded from the published package.
- `test/`: shared test infrastructure, never published. `tailwind.css` is the stylesheet the fixtures import. `input-commands.ts` holds the server-side vitest commands that drive real Playwright mouse and CDP touch input. `panes-queries.ts` registers the custom `page.getBy*` queries through `locators.extend`. `layouts.ts` holds the shared layout data. `fixtures/` holds the wrapper components specs render.
- The demos live on the package's page in [docs](../../docs/), under `src/content/docs/packages/prime-panes/`. Run `pnpm --filter @viamrobotics/prime-docs dev` to see them against this package's source.
- `styles.css`: the consumer's Tailwind entry. It imports the tokens and points Tailwind at `dist`.

## Commands

```bash
pnpm --filter @viamrobotics/prime-docs dev    # docs site; this package resolves to its source and hot-reloads
pnpm --filter @viamrobotics/prime-panes build    # svelte-package + publint + declaration check
pnpm --filter @viamrobotics/prime-panes check    # svelte-check
pnpm --filter @viamrobotics/prime-panes test     # vitest: client (browser) and server (node) projects
pnpm --filter @viamrobotics/prime-panes lint     # eslint
pnpm --filter @viamrobotics/prime-panes format   # prettier --check
```

Tests named `*.svelte.spec.ts` run in Chromium through `@vitest/browser-playwright`, at a 1000 by 1400 viewport. Other `*.spec.ts` files run in node. A module that needs a DOM but no component, such as `classify-press.ts`, gets a `*.svelte.spec.ts` that renders nothing.

Browser specs query with roles first, then the custom queries in `test/panes-queries.ts`, and drag with the commands in `test/input-commands.ts`. The `test/` layer stays thin:

- Browser-side code builds no events and does no geometry math. A command resolves a point inside an element on the server, as a Playwright call.
- A custom query returns one selector string. It never walks the DOM. Register one only when a spec uses it.
- A synthetic event stays only where real input cannot produce it, such as a window `blur`.

## Conventions

- Svelte 5 runes only. See [.claude/rules/svelte.md](../../.claude/rules/svelte.md).
- State flows through `bind:layout`, never a change callback. A function binding is the persistence hook and can veto a change.
- No zag.js names in the public API. Props and parts use web-standard vocabulary.
- No protobuf semantics. No `oneofKind`, numeric enums, or proto3 default handling. Format conversion belongs to the consumer.
- The `Panes` root is unopinionated about layout. It has no default size, display, or styling, and the consumer sizes it with a class.
- Tailwind classes reference `@viamrobotics/tailwind-config` tokens only.
