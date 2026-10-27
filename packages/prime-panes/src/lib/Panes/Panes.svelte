<script lang="ts" generics="TData">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { FloatEntry, LayoutNode, PaneNode } from '../layout.ts';
	import type { DragPreview } from './drag-preview.ts';
	import type { PaneState } from './pane-state.ts';

	import { DEFAULT_FLOAT_MIN_SIZE } from '../FloatPanes/float-geometry.ts';

	import DragGhost from './DragGhost.svelte';
	import PanesNode from './PanesNode.svelte';
	import { isInSameRoot, markAsRoot } from './root-scope.ts';
	import { providePanes } from './usePanes.svelte.ts';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		/** The layout tree. Bind it to receive resizes. `undefined` renders `empty`. */
		layout?: LayoutNode<TData> | undefined;

		/**
		 * Renders one pane's content. Place `Panes.DragTrigger` and `Panes.MoveTrigger` inside it
		 * so the pane can be dragged, and moved without dragging. The second argument is the pane's
		 * reactive `PaneState`.
		 */
		pane: Snippet<[PaneNode<TData>, PaneState]>;

		/** Renders when `layout` is `undefined`. */
		empty?: Snippet;

		/**
		 * Whether panes can be rearranged, by dragging from a `Panes.DragTrigger` or by activating a
		 * `Panes.MoveTrigger` to pick a destination. Every rearrangement is assigned to `layout`, so a
		 * function binding can reject it. Resizing is unaffected.
		 */
		reorderable?: boolean;

		/**
		 * Whether the inactive panes of a stack stay mounted, hidden and `inert`, so their state, such as
		 * a video stream or a scroll position, survives switching tabs. By default only the active pane
		 * of a stack is mounted.
		 */
		keepInactiveMounted?: boolean;

		/**
		 * Names a pane for assistive technology: the destinations that appear while a pane is being
		 * moved without dragging, and the announcements made as it moves. Defaults to the pane's `id`.
		 */
		paneLabel?: (pane: PaneNode<TData>) => string;

		/**
		 * Renders the content of the ghost that follows the pointer during a drag. The library positions
		 * the ghost above the page, hides it from assistive technology, and makes it `inert`, so keep the
		 * snippet free of controls. Defaults to the dragged pane's label, or a stack's labels joined.
		 */
		dragPreview?: Snippet<[DragPreview<TData>]>;

		/**
		 * The smallest a floating window can be, in pixels, per window. A window resizes no smaller, and
		 * is drawn no smaller, unless the float's box is itself smaller. Defaults to 160 by 120.
		 */
		floatMinSize?: (entry: FloatEntry<TData>) => { width: number; height: number };
	}

	let {
		layout = $bindable(),
		pane,
		empty,
		reorderable = true,
		keepInactiveMounted = false,
		paneLabel = (labeled) => labeled.id,
		dragPreview,
		floatMinSize = () => DEFAULT_FLOAT_MIN_SIZE,
		onkeydown,
		onfocusout,
		onpointerdown,
		...rest
	}: Props = $props();

	const idPrefix = $props.id();
	const context = providePanes<TData>(
		idPrefix,
		{ get: () => layout, set: (next) => (layout = next) },
		() => pane,
		() => reorderable,
		() => paneLabel,
		() => keepInactiveMounted,
		() => empty,
		() => floatMinSize
	);

	let isPressingInside = false;

	const isMoving = $derived(context.movingId !== undefined);

	function handleKeydown(event: KeyboardEvent & { currentTarget: HTMLDivElement }) {
		onkeydown?.(event);
		if (event.key === 'Escape' && isInSameRoot(event.target, event.currentTarget)) {
			context.cancelMove();
		}
	}

	function handlePointerDown(event: PointerEvent & { currentTarget: HTMLDivElement }) {
		onpointerdown?.(event);
		if (isInSameRoot(event.target, event.currentTarget)) isPressingInside = true;
	}

	// Safari and Firefox on macOS leave focus on nothing when a button is pressed, which is not leaving the view.
	function handleFocusOut(event: FocusEvent & { currentTarget: HTMLDivElement }) {
		onfocusout?.(event);
		if (!isInSameRoot(event.target, event.currentTarget)) return;
		const next = event.relatedTarget;
		if (next instanceof Node && isInSameRoot(next, event.currentTarget)) return;
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
	{@attach markAsRoot}
	data-move-mode={isMoving ? '' : undefined}
	data-dragging={context.dragSource ? '' : undefined}
	onkeydown={handleKeydown}
	onfocusout={handleFocusOut}
	onpointerdown={handlePointerDown}
>
	{#if layout}
		<PanesNode node={layout} />
	{:else}
		{@render empty?.()}
	{/if}
	{#if context.dragPreview && context.dragPoint}
		<DragGhost point={context.dragPoint} preview={context.dragPreview} {dragPreview} />
	{/if}
	<div role="status" class="sr-only">{context.announcement}</div>
</div>
