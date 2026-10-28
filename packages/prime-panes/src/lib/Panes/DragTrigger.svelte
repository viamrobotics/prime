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
