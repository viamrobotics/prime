<script lang="ts" generics="TData">
	import { onMount } from 'svelte';
	import type { Attachment } from 'svelte/attachments';
	import { on } from 'svelte/events';

	import { getDropRegion } from '../drop-region.ts';
	import type { DropRegion } from '../drop-region.ts';
	import type { PaneNode } from '../layout.ts';

	import { createAttachedElements } from './attached-elements.ts';
	import { targetName } from './move-wording.ts';
	import type { PaneControls } from './pane-controls.ts';
	import { providePane, useSplitView } from './useSplitView.svelte.ts';

	interface Props {
		node: PaneNode<TData>;
	}

	const INDICATOR_CLASSES_BY_REGION = {
		center: 'top-0 left-0 h-full w-full',
		left: 'top-0 left-0 h-full w-1/2',
		right: 'top-0 left-1/2 h-full w-1/2',
		top: 'top-0 left-0 h-1/2 w-full',
		bottom: 'top-1/2 left-0 h-1/2 w-full'
	} as const satisfies Record<DropRegion, string>;

	const MOVE_TARGETS = [
		{ region: 'left', classes: 'top-1/2 left-2 -translate-y-1/2', glyph: '\u2190' },
		{ region: 'right', classes: 'top-1/2 right-2 -translate-y-1/2', glyph: '\u2192' },
		{ region: 'top', classes: 'top-2 left-1/2 -translate-x-1/2', glyph: '\u2191' },
		{ region: 'bottom', classes: 'bottom-2 left-1/2 -translate-x-1/2', glyph: '\u2193' },
		{
			region: 'center',
			classes: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
			glyph: '\u21C4'
		}
	] as const satisfies readonly { region: DropRegion; classes: string; glyph: string }[];

	const NATIVE_CONTROLS = 'button, a, input, select, textarea, [contenteditable]';

	const { node }: Props = $props();

	const context = useSplitView();

	const targetLabel = $derived(context.labelFor(node.id));
	const movingLabel = $derived(
		context.movingId === undefined || context.movingId === node.id
			? undefined
			: context.labelFor(context.movingId)
	);

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
		// preventDefault stops Space scrolling the page. On Enter it keeps a link from also clicking,
		// and keeps the keypress from reaching the move target that move mode focuses.
		const stopKeydown = on(trigger, 'keydown', (event) => {
			if (event.key === 'Enter') {
				event.preventDefault();
				toggleMove();
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
			stopKeyboard?.();
			if (isButton) {
				trigger.removeAttribute('aria-pressed');
			}
			detach();
		};
	};

	const controls: PaneControls = { dragTrigger, dragIgnore, moveTrigger };

	onMount(() => context.registerPane(node.id, () => (moveTriggers.latest ?? wrapper)?.focus()));

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

<!-- The consumer's dragTrigger is the control. These elements only receive native drag events. -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	bind:this={wrapper}
	tabindex="-1"
	class="relative size-full min-h-0 min-w-0 outline-power-button-dark focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-solid"
	draggable={context.armedId === node.id}
	ondragstart={handleDragStart}
	ondragend={context.clearDrag}
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
	{#if movingLabel !== undefined}
		{#each MOVE_TARGETS as { region, classes, glyph } (region)}
			<button
				type="button"
				data-move-target={region}
				aria-label={targetName(region, movingLabel, targetLabel)}
				class={[
					'absolute z-30 inline-flex size-8 items-center justify-center bg-info-dark text-white outline-power-button-dark hover:bg-info-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-solid',
					classes
				]}
				onclick={() => context.place(node.id, region)}
			>
				<span aria-hidden="true">{glyph}</span>
			</button>
		{/each}
	{/if}
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
