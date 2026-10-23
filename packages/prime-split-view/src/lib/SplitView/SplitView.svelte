<script lang="ts" generics="TData">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { LayoutNode, PaneNode } from '../layout.ts';

	import type { PaneControls } from './pane-controls.ts';
	import SplitViewNode from './SplitViewNode.svelte';
	import { provideSplitView } from './useSplitView.svelte.ts';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		/** The layout tree. Bind it to receive resizes. `undefined` renders `empty`. */
		layout?: LayoutNode<TData> | undefined;

		/**
		 * Renders one pane's content. The second argument holds the attachments that make an element of
		 * yours start a drag, ignore one, or enter move mode.
		 */
		pane: Snippet<[PaneNode<TData>, PaneControls]>;

		/** Renders when `layout` is `undefined`. */
		empty?: Snippet;

		/**
		 * Whether panes can be rearranged, by dragging from a `dragTrigger` or by activating a
		 * `moveTrigger` to pick a destination. Every rearrangement is assigned to `layout`, so a
		 * function binding can reject it. Resizing is unaffected.
		 */
		reorderable?: boolean;

		/**
		 * Names a pane for assistive technology: the destinations that appear while a pane is being
		 * moved without dragging, and the announcements made as it moves. Defaults to the pane's `id`.
		 */
		paneLabel?: (pane: PaneNode<TData>) => string;
	}

	let {
		layout = $bindable(),
		pane,
		empty,
		reorderable = true,
		paneLabel = (labeled) => labeled.id,
		onkeydown,
		onfocusout,
		onpointerdown,
		...rest
	}: Props = $props();

	const idPrefix = $props.id();
	const context = provideSplitView<TData>(
		idPrefix,
		{ get: () => layout, set: (next) => (layout = next) },
		() => pane,
		() => reorderable,
		() => paneLabel
	);

	let isPressingInside = false;

	const isMoving = $derived(context.movingId !== undefined);

	function handleKeydown(event: KeyboardEvent & { currentTarget: HTMLDivElement }) {
		onkeydown?.(event);
		if (event.key === 'Escape') {
			context.cancelMove();
		}
	}

	function handlePointerDown(event: PointerEvent & { currentTarget: HTMLDivElement }) {
		onpointerdown?.(event);
		isPressingInside = true;
	}

	// Safari and Firefox on macOS leave focus on nothing when a button is pressed, which is not leaving the view.
	function handleFocusOut(event: FocusEvent & { currentTarget: HTMLDivElement }) {
		onfocusout?.(event);
		const next = event.relatedTarget;
		if (next instanceof Node && event.currentTarget.contains(next)) return;
		if (next === null && isPressingInside) return;
		if (next !== null || !(event.target instanceof Node)) {
			context.abandonMove();
			return;
		}

		// Removing the focused element, such as a menu item that starts the move, also reports focus going nowhere. Whether the element is still in the page tells the two apart.
		const lost = event.target;
		queueMicrotask(() => {
			if (lost.isConnected) {
				context.abandonMove();
			} else {
				void context.focusMovingPane();
			}
		});
	}
</script>

<svelte:window
	onpointerup={() => (isPressingInside = false)}
	onpointercancel={() => (isPressingInside = false)}
/>

<div
	{...rest}
	data-move-mode={isMoving ? '' : undefined}
	onkeydown={handleKeydown}
	onfocusout={handleFocusOut}
	onpointerdown={handlePointerDown}
>
	{#if layout}
		<SplitViewNode node={layout} />
	{:else}
		{@render empty?.()}
	{/if}
	<div role="status" class="sr-only">{context.announcement}</div>
</div>
