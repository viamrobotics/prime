# @viamrobotics/prime-split-view

Resizable, rearrangeable split-pane layouts for Svelte 5. The layout is a plain binary tree that you bind to the component. Users resize panes by dragging dividers and rearrange them by dragging a pane onto another or by using a button.

> [!NOTE]
> Under active development. The public API is unstable until 1.0.

## Installation

```sh
pnpm add @viamrobotics/prime-split-view @viamrobotics/tailwind-config @zag-js/splitter @zag-js/svelte
```

Requires `svelte` `^5.29.0`, because the pane controls are attachments. Import the stylesheet once, after Tailwind:

```css
@import 'tailwindcss';
@import '@viamrobotics/prime-split-view/styles.css';
```

## Usage

```svelte
<script lang="ts">
	import { SplitView } from '@viamrobotics/prime-split-view';
	import type { LayoutNode } from '@viamrobotics/prime-split-view';

	let layout = $state<LayoutNode<{ title: string }> | undefined>({
		type: 'split',
		id: 'root',
		direction: 'row',
		ratio: 0.6,
		first: { type: 'pane', id: 'camera', data: { title: 'Camera' } },
		second: { type: 'pane', id: 'stats', data: { title: 'Stats' } }
	});
</script>

<SplitView bind:layout paneLabel={(node) => node.data.title} class="h-screen">
	{#snippet pane(node, { dragTrigger, moveTrigger })}
		<div class="size-full">
			<button
				type="button"
				aria-label="Move {node.data.title}"
				{@attach dragTrigger}
				{@attach moveTrigger}
			>
				::
			</button>
			{node.data.title}
		</div>
	{/snippet}
</SplitView>
```

The `pane` snippet receives `dragTrigger`, `dragIgnore`, and `moveTrigger` attachments. `dragTrigger` starts a pane drag from any element. `moveTrigger` toggles move mode on a `button`, an element with `role="button"`, or a `role="menuitem"` item, which rearranges panes without dragging. Every pane with a `dragTrigger` needs a `moveTrigger` to meet WCAG 2.5.7. In move mode, focus stays on the moving pane's trigger, and the arrow keys move spatially into the adjacent pane and across its left, center, and right or top, center, and bottom regions, crossing to the next pane on screen past the far edge. Tab moves between destinations. Place with a click, a second tap, or Enter or Space. Escape cancels. Moving focus out of the view cancels. `paneLabel` names panes in previews and announcements. The root element has no default size, so size it with a class.

## Documentation

See the [package docs](https://viamrobotics.github.io/prime/packages/prime-split-view/) for the layout model, function bindings, tree operations, and a migration guide from the app's protobuf workspace trees.

## Development

This package lives inside the [viamrobotics/prime](https://github.com/viamrobotics/prime) monorepo. See the [package CLAUDE.md](./CLAUDE.md) for stack, layout, and commands.

## License

Apache-2.0
