<script lang="ts" generics="TData">
	import { onMount } from 'svelte';
	import type { Attachment } from 'svelte/attachments';
	import { on } from 'svelte/events';

	import { getDropRegion } from '../drop-region.ts';
	import type { DropRegion } from '../drop-region.ts';
	import type { PaneNode } from '../layout.ts';

	import { edgeOfArrow } from './arrow-regions.ts';
	import { createAttachedElements } from './attached-elements.ts';
	import { INDICATOR_CLASSES_BY_REGION } from './indicator-geometry.ts';
	import { movingNotice } from './move-wording.ts';
	import type { PaneControls } from './pane-controls.ts';
	import SplitViewMoveTarget from './SplitViewMoveTarget.svelte';
	import { providePane, useSplitView } from './useSplitView.svelte.ts';

	interface Props {
		node: PaneNode<TData>;
	}

	const NATIVE_CONTROLS = 'button, a, input, select, textarea, [contenteditable]';
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

	let isOver = $state(false);
	let region = $state<DropRegion>('center');
	let wrapper = $state<HTMLElement>();

	const dragIgnores = createAttachedElements();
	const moveTriggers = createAttachedElements();

	providePane({
		get id() {
			return node.id;
		}
	});

	function startsOnIgnoredElement(event: Event, trigger: HTMLElement) {
		const path = event.composedPath();
		const insideTrigger = path.slice(0, path.indexOf(trigger));
		return (
			path.some((element) => dragIgnores.includes(element)) ||
			insideTrigger.some(
				(element) => element instanceof Element && element.matches(NATIVE_CONTROLS)
			)
		);
	}

	const dragTrigger: Attachment<HTMLElement> = (trigger) => {
		let stopWatchingRelease: (() => void) | undefined;

		// A press released off the trigger never reaches it, which would leave the pane draggable.
		// Capture sees the release even when a handler in between stops propagation.
		const stopListening = on(trigger, 'pointerdown', (event) => {
			if (startsOnIgnoredElement(event, trigger)) {
				return;
			}
			context.armDrag(node.id);
			stopWatchingRelease?.();
			stopWatchingRelease = on(window, 'pointerup', () => context.disarmDrag(), {
				once: true,
				capture: true
			});
		});

		return () => {
			stopListening();
			stopWatchingRelease?.();
		};
	};

	const dragIgnore: Attachment<HTMLElement> = (ignored) => dragIgnores.attach(ignored);

	function toggleMove() {
		if (context.movingId === node.id) {
			context.cancelMove();
		} else {
			context.startMove(node.id);
		}
	}

	function toggleMoveWithKeyboard(trigger: HTMLElement) {
		// preventDefault stops Space scrolling the page. On Enter it keeps a link from also clicking.
		const stopKeydown = on(trigger, 'keydown', (event) => {
			if (event.key === 'Enter') {
				event.preventDefault();
				if (!event.repeat) toggleMove();
			} else if (event.key === ' ') {
				event.preventDefault();
			}
		});
		const stopKeyup = on(trigger, 'keyup', (event) => {
			if (event.key === ' ') {
				toggleMove();
			}
		});

		return () => {
			stopKeydown();
			stopKeyup();
		};
	}

	const moveTrigger: Attachment<HTMLElement> = (trigger) => {
		const detach = moveTriggers.attach(trigger);
		context.recordMoveTrigger(node.id);
		const stopListening = on(trigger, 'click', toggleMove);
		// Focus stays on the trigger after it starts a move, so holding Enter would otherwise click it again.
		const stopRepeating = on(trigger, 'keydown', (event) => {
			if (event.key === 'Enter' && event.repeat) event.preventDefault();
		});
		const isNativeButton = trigger.localName === 'button';
		const isButton = isNativeButton || trigger.getAttribute('role') === 'button';
		const stopKeyboard = isNativeButton || !isButton ? undefined : toggleMoveWithKeyboard(trigger);

		if (isButton) {
			$effect(() => {
				trigger.setAttribute('aria-pressed', String(context.movingId === node.id));
			});
		}

		return () => {
			stopListening();
			stopRepeating();
			stopKeyboard?.();
			if (isButton) {
				trigger.removeAttribute('aria-pressed');
			}
			detach();
		};
	};

	const controls: PaneControls = { dragTrigger, dragIgnore, moveTrigger };

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
		if (event.target !== event.currentTarget || !event.dataTransfer) {
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
	<!-- The consumer's dragTrigger is the control. This element only receives native drag events and the arrow keys that leave the moving pane. -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		bind:this={wrapper}
		tabindex="-1"
		data-moving={isMoving ? '' : undefined}
		inert={isDestination}
		class="peer relative size-full min-h-0 min-w-0 outline-info-dark focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-solid data-moving:focus:outline-2 data-moving:focus:-outline-offset-2 data-moving:focus:outline-solid"
		draggable={context.armedId === node.id}
		ondragstart={handleDragStart}
		ondragend={context.clearDrag}
		onkeydown={handleKeydown}
	>
		{@render context.pane(node, controls)}
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
