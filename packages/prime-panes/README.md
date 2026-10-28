# @viamrobotics/prime-panes

Resizable, rearrangeable split-pane layouts for Svelte 5. The layout is a plain binary tree that you bind to the component. Users resize panes by dragging dividers and rearrange them by dragging a pane onto another or by using a button. Several panes can share one slot as a stack behind tabs.

> [!NOTE]
> Under active development. The public API is unstable until 1.0.

## Installation

```sh
pnpm add @viamrobotics/prime-panes @viamrobotics/tailwind-config @zag-js/splitter @zag-js/svelte
```

Requires `svelte` `^5.29.0`, because the pane controls are attachments. Import the stylesheet once, after Tailwind:

```css
@import 'tailwindcss';
@import '@viamrobotics/prime-panes/styles.css';
```

## Usage

```svelte
<script lang="ts">
	import { Panes } from '@viamrobotics/prime-panes';
	import type { LayoutNode } from '@viamrobotics/prime-panes';

	let layout = $state<LayoutNode<{ title: string }> | undefined>({
		type: 'split',
		id: 'root',
		direction: 'row',
		ratio: 0.6,
		first: { type: 'pane', id: 'camera', data: { title: 'Camera' } },
		second: { type: 'pane', id: 'stats', data: { title: 'Stats' } }
	});
</script>

<Panes bind:layout paneLabel={(node) => node.data.title} class="h-screen">
	{#snippet pane(node)}
		<div class="size-full">
			<Panes.DragTrigger>
				<header>
					{node.data.title}
					<Panes.MoveTrigger aria-label="Move {node.data.title}">Move</Panes.MoveTrigger>
				</header>
			</Panes.DragTrigger>
		</div>
	{/snippet}
</Panes>
```

The `pane` snippet receives `node` and its reactive `PaneState`: `isStacked`, `isMoving`, and `isDragArmed`, each also a `data-` attribute on the pane's wrapper. `Panes.DragTrigger` starts a pane drag from the elements inside it. Drags run on pointer events, so mouse, pen, and touch all drag. A press on a plain area or a `Panes.MoveTrigger` drags once the pointer moves 4px, a press on another control drags after a 250ms hold so a quick click still clicks, and a press on a text field never drags. Moving 4px before a hold ends drops the press. A tab is the exception. It drags once the pointer moves 4px, and a press without movement selects. While `reorderable`, drag triggers, tabs, and grips set `touch-action: none`, so keep scrollable content outside `Panes.DragTrigger`. Escape, a pointer cancel, the window losing focus, and a release outside every pane cancel a drag. A ghost follows the pointer and shows what a drop would make. `DragPreview.form` is `'tab'` over a strip or drop region and `'pane'` elsewhere, and the ghost root carries `data-form`. The `dragPreview` snippet replaces its content with a `DragPreview`. The root carries `data-dragging` during a drag, beside `data-move-mode`. `dragIgnore`, an attachment exported from the package root, keeps a press inside a custom element from dragging. `Panes.MoveTrigger` renders a button that toggles move mode, which rearranges panes without dragging. Its `child` snippet receives `{ props }` to spread on your own element, such as a menu item. Every pane with a `Panes.DragTrigger` needs a `Panes.MoveTrigger` to meet WCAG 2.5.7. In move mode, focus stays on the moving pane's trigger, and the arrow keys move spatially into the adjacent pane and across its left, center, and right or top, center, and bottom regions, crossing to the next pane on screen past the far edge. Tab moves between destinations. Place with a click, a second tap, or Enter or Space. Escape cancels. Moving focus out of the view cancels. `Panes.TabList` renders in every pane and shows a stack's tabs when the pane is stacked. `Panes.TabListDropRegion` goes inside it and marks where a dropped pane stacks, so a pane without one never stacks. Place it as a strip over the tabs, a grip area, or an edge strip that shows only during a drag, and add `in-data-move-mode:` so move mode can stack there too. In move mode, "Stack with" is reached by the arrow toward the region's side, and it takes a position that defaults to the end. A stacked pane's own slot offers a reorder placement. `Panes.PaneBody` sets the edges and center of the pane's drop regions, and a point outside it reads as the nearest edge. With no `PaneBody`, the whole pane applies. Center always swaps whole slots. Over its own strip, a dragged tab lifts out, a preview tab marks the insertion point, and the other tabs shift. Dropping reorders and makes the dropped pane active. Over another pane's region, the drop inserts at the pointer's x on a top or bottom region and appends on a left or right region. Alt+Shift+ArrowLeft and Alt+Shift+ArrowRight move a focused tab one place. The tree operations `stackPanes(root, targetPaneId, sourceId, newStackId, index?)` and `reorderPane(root, paneId, index)` do the same from code. `PaneBody` is also the tab panel, but only in a stacked pane. `target="stack"` on a trigger moves the whole stack. `keepInactiveMounted` keeps inactive stacked panes mounted. `paneLabel` names panes in previews and announcements. The root element has no default size, so size it with a class.

## Documentation

See the [package docs](https://viamrobotics.github.io/prime/packages/prime-panes/) for the layout model, stacks, function bindings, tree operations, and a migration guide from the app's protobuf workspace trees.

## Development

This package lives inside the [viamrobotics/prime](https://github.com/viamrobotics/prime) monorepo. See the [package CLAUDE.md](./CLAUDE.md) for stack, layout, and commands.

## License

Apache-2.0
