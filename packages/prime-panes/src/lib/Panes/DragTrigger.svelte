<!--
@component
Makes the elements inside it start a pane drag. Wrap a grip, or a whole header, in the `pane` snippet of [`Panes`](./Panes.svelte). It renders a `display: contents` wrapper, so it does not change layout, and it takes no `class`. It does nothing when `reorderable` is `false`.

What a press does depends on where it lands. A press on a plain area or a [`Panes.MoveTrigger`](./MoveTrigger.svelte) drags once the pointer moves 4px, and a click on a move trigger without movement still enters move mode. A press on another control (`button`, `a`, `select`, or `[role="button"]`) drags only after a 250ms hold, so a quick click still clicks. A press on a text field (`input`, `textarea`, or `[contenteditable]`) never drags. A tab is the exception, since it drags at once. Once a press on a control lasts 250ms, releasing it without dragging does not click the control, a move trigger included. Keyboard activation is unaffected.

Drags run on pointer events, so mouse, pen, and touch all drag. While `reorderable` is `true`, the elements directly inside the wrapper set `touch-action: none`, so a swipe that starts on one drags instead of scrolling. Keep scrollable content outside it.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Attachment } from 'svelte/attachments';

	import { usePane, usePanes } from './usePanes.svelte.ts';
	import type { DragSource } from './usePanes.svelte.ts';
	import { watchDragPress } from './watch-drag-press.ts';

	interface Props {
		/**
		 * The elements that start a drag of the pane. A press on a plain area or a
		 * `Panes.MoveTrigger` drags as soon as the pointer moves a few pixels. A press on another
		 * control drags only after a hold, and a press on a text field never drags.
		 */
		children: Snippet;

		/**
		 * What the drag moves. `'pane'` moves this pane alone, leaving its stack. `'stack'` moves the
		 * pane's whole stack, and acts as `'pane'` on a pane that is not stacked. `'float'` moves the
		 * floating window that holds the pane, live under the pointer with no ghost, and writes its
		 * rect once on release. It acts as `'pane'` on a pane outside a float.
		 */
		target?: DragSource['type'];
	}

	const { children, target = 'pane' }: Props = $props();

	const context = usePanes();
	const pane = usePane();

	const watchPresses: Attachment<HTMLElement> = (trigger) =>
		watchDragPress(trigger, pane, () => pane.sourceFor(target));
</script>

<div
	style:display="contents"
	class={[context.reorderable && '*:touch-none']}
	{@attach watchPresses}
>
	{@render children()}
</div>
