<script lang="ts" generics="TData">
	import { onMount } from 'svelte';

	import { getDropRegion } from '../drop-region.ts';
	import type { DropRegion } from '../drop-region.ts';
	import type { PaneNode } from '../layout.ts';

	import { edgeOfArrow } from './arrow-regions.ts';
	import { createAttachedElements } from './attached-elements.ts';
	import { INDICATOR_CLASSES_BY_REGION } from './indicator-geometry.ts';
	import { movingNotice } from './move-wording.ts';
	import SplitViewMoveTarget from './SplitViewMoveTarget.svelte';
	import { providePane, useSplitView } from './useSplitView.svelte.ts';

	interface Props {
		node: PaneNode<TData>;
	}

	const ARROW_KEY_CONTROLS = 'input, select, textarea, [contenteditable]';

	const { node }: Props = $props();

	const context = useSplitView();

	const label = $derived(context.labelFor(node.id));
	const isMoving = $derived(context.movingId === node.id);
	const movingLabel = $derived(
		context.movingId === undefined || context.movingId === node.id
			? undefined
			: context.labelFor(context.movingId)
	);
	const isDestination = $derived(movingLabel !== undefined);
	const dragPress = $derived(context.dragPress?.paneId === node.id ? context.dragPress : undefined);

	let isOver = $state(false);
	let region = $state<DropRegion>('center');
	let wrapper = $state<HTMLElement>();

	const moveTriggers = createAttachedElements();

	function toggleMove() {
		if (context.movingId === node.id) {
			context.cancelMove();
		} else {
			context.startMove(node.id);
		}
	}

	providePane({
		get isMoving() {
			return isMoving;
		},
		get isDragArmed() {
			return dragPress?.phase === 'armed';
		},
		holdDrag: () => context.holdDrag(node.id),
		armDrag: () => context.armDrag(node.id),
		disarmDrag: context.disarmDrag,
		toggleMove,
		registerMoveTrigger(trigger) {
			const detach = moveTriggers.attach(trigger);
			context.recordMoveTrigger(node.id);
			return detach;
		}
	});

	onMount(() =>
		context.registerPane(node.id, {
			focus: () => (moveTriggers.latest ?? wrapper)?.focus(),
			focusWrapper: () => wrapper?.focus(),
			bounds: () => wrapper?.getBoundingClientRect()
		})
	);

	function handleKeydown(event: KeyboardEvent) {
		const edge = edgeOfArrow(event);
		if (!isMoving || edge === undefined || event.defaultPrevented) return;
		// An arrow inside a control that reads it, such as a text field, is the control's.
		if (event.target instanceof Element && event.target.closest(ARROW_KEY_CONTROLS)) return;

		if (context.crossToNeighbor(node.id, edge)) event.preventDefault();
	}

	function regionAt(event: DragEvent & { currentTarget: HTMLElement }): DropRegion {
		if (context.draggedId === node.id) {
			return 'center';
		}
		return getDropRegion(event.clientX, event.clientY, event.currentTarget.getBoundingClientRect());
	}

	function handleDragStart(event: DragEvent & { currentTarget: HTMLElement }) {
		if (event.target !== event.currentTarget) {
			return;
		}
		if (dragPress?.phase === 'held') {
			event.preventDefault();
			return;
		}
		if (!event.dataTransfer) {
			return;
		}
		event.dataTransfer.setData('text/plain', node.id);
		event.dataTransfer.effectAllowed = 'move';
		context.startDrag(node.id);
	}

	function handleDragEnter(event: DragEvent & { currentTarget: HTMLElement }) {
		if (context.draggedId === undefined || event.target !== event.currentTarget) {
			return;
		}
		isOver = true;
		region = regionAt(event);
	}

	function handleDragLeave(event: DragEvent & { currentTarget: HTMLElement }) {
		if (event.target === event.currentTarget) {
			isOver = false;
		}
	}

	function handleDragOver(event: DragEvent & { currentTarget: HTMLElement }) {
		if (context.draggedId === undefined) {
			return;
		}
		event.preventDefault();
		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = 'move';
		}
		region = regionAt(event);
	}

	function handleDrop(event: DragEvent & { currentTarget: HTMLElement }) {
		if (context.draggedId === undefined) {
			return;
		}
		event.preventDefault();
		isOver = false;
		context.drop(node.id, regionAt(event));
	}
</script>

<div class="relative size-full min-h-0 min-w-0">
	<!-- The consumer's SplitView.DragTrigger is the control. This element only receives native drag events and the arrow keys that leave the moving pane. -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		bind:this={wrapper}
		tabindex="-1"
		data-moving={isMoving ? '' : undefined}
		data-drag-armed={dragPress?.phase === 'armed' ? '' : undefined}
		inert={isDestination}
		class="peer relative size-full min-h-0 min-w-0 outline-info-dark focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-solid data-drag-armed:outline-2 data-drag-armed:-outline-offset-2 data-drag-armed:outline-solid data-moving:focus:outline-2 data-moving:focus:-outline-offset-2 data-moving:focus:outline-solid"
		draggable={dragPress !== undefined}
		ondragstart={handleDragStart}
		ondragend={context.clearDrag}
		onkeydown={handleKeydown}
	>
		{@render context.pane(node)}
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			data-drop-overlay
			class={['absolute inset-0 z-20', { 'pointer-events-none': context.draggedId === undefined }]}
			ondragenter={handleDragEnter}
			ondragleave={handleDragLeave}
			ondragover={handleDragOver}
			ondrop={handleDrop}
		></div>
		{#if isOver}
			<div
				data-drop-indicator={region}
				class={[
					'pointer-events-none absolute z-20 bg-info-medium/50 motion-safe:transition-all',
					INDICATOR_CLASSES_BY_REGION[region]
				]}
			></div>
		{/if}
	</div>
	{#if isMoving}
		<!-- The wash gives way by the outline's width while the wrapper is focused, so it does not tint the outline. -->
		<div
			data-moving-wash
			class="pointer-events-none absolute inset-0 z-30 bg-gray-2/80 peer-focus:inset-0.5"
		></div>
		<div
			data-moving-notice
			class="pointer-events-none absolute inset-0 z-30 flex items-center justify-center p-2"
		>
			<p class="max-w-full bg-info-light px-2 py-1 text-center text-xs text-info-dark">
				{movingNotice(label)}
			</p>
		</div>
	{/if}
	{#if movingLabel !== undefined}
		<SplitViewMoveTarget paneId={node.id} {label} {movingLabel} />
	{/if}
</div>
