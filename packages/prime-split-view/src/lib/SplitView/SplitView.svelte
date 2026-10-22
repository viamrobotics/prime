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
		 * `moveTrigger` to pick a target. Every rearrangement is assigned to `layout`, so a function
		 * binding can reject it. Resizing is unaffected.
		 */
		reorderable?: boolean;

		/**
		 * Names a pane for assistive technology: the move targets that appear while a pane is being
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

	let root = $state<HTMLDivElement>();

	$effect(() => {
		if (context.movingId !== undefined) {
			root?.querySelector<HTMLElement>('[data-move-target]')?.focus();
		}
	});

	function handleKeydown(event: KeyboardEvent & { currentTarget: HTMLDivElement }) {
		onkeydown?.(event);
		if (event.key === 'Escape') {
			context.cancelMove();
		}
	}
</script>

<div {...rest} bind:this={root} onkeydown={handleKeydown}>
	{#if layout}
		<SplitViewNode node={layout} />
	{:else}
		{@render empty?.()}
	{/if}
	<div role="status" class="sr-only">{context.announcement}</div>
</div>
