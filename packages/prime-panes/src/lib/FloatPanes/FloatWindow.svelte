<script lang="ts" generics="TData">
	import * as floatingPanel from '@zag-js/floating-panel';
	import { normalizeProps, useMachine } from '@zag-js/svelte';
	import { onMount } from 'svelte';

	import type { FloatEntry, FloatRect } from '../layout.ts';

	import { listPanes } from '../Panes/list-panes.ts';
	import { joinLabels } from '../Panes/move-wording.ts';
	import PanesNode from '../Panes/PanesNode.svelte';
	import { isInSameRoot } from '../Panes/root-scope.ts';
	import { usePanes } from '../Panes/usePanes.svelte.ts';
	import { raiseFloat, setFloatRect } from '../tree.ts';

	import { clampToBox, fitMinimumToBox } from './float-geometry.ts';
	import type { FloatSize } from './float-geometry.ts';
	import { provideFloatEntryId } from './float-entry-context.ts';
	import {
		FLOAT_KEY_LARGE_STEP,
		FLOAT_KEY_STEP,
		isArrowKey,
		moveFloatRectByKey,
		resizeFloatRectByKey
	} from './float-keys.ts';
	import { FLOAT_RESIZE_AXES, resizeFloatRect } from './float-resize.ts';
	import type { ResizeAxis } from './float-resize.ts';

	interface Props {
		entry: FloatEntry<TData>;
		box: FloatSize;
		zIndex: number;
	}

	interface ResizeStart {
		axis: ResizeAxis;
		rect: FloatRect;
	}

	const HANDLE_CLASSES: Record<ResizeAxis, string> = {
		n: 'h-2',
		s: 'h-2',
		e: 'w-2',
		w: 'w-2',
		ne: 'size-4',
		nw: 'size-4',
		se: 'size-4',
		sw: 'size-4'
	};

	const { entry, box, zIndex }: Props = $props();

	const context = usePanes();

	// The parent keys windows by entry id, so it never changes here.
	// svelte-ignore state_referenced_locally
	provideFloatEntryId(entry.id);

	let element = $state<HTMLElement>();
	let resizeStart: ResizeStart | undefined;
	let resizePreview = $state.raw<FloatRect>();

	const minimum = $derived(fitMinimumToBox(context.floatMinSize(entry), box));
	const dragRect = $derived.by(() => {
		const preview = context.floatDragPreview;
		return preview?.entryId === entry.id ? preview.rect : undefined;
	});
	const drawnRect = $derived(resizePreview ?? clampToBox(dragRect ?? entry.rect, box, minimum));
	const label = $derived(
		joinLabels(listPanes(entry.content).map((pane) => context.labelFor(pane.id)))
	);

	const service = useMachine(floatingPanel.machine, () => {
		const origin = readBoxOrigin();
		return {
			id: `${context.idPrefix}-${entry.id}`,
			defaultOpen: true,
			strategy: 'absolute' as const,
			resizable: true,
			minSize: minimum,
			size: { width: drawnRect.width, height: drawnRect.height },
			position: { x: origin.x + drawnRect.x, y: origin.y + drawnRect.y },
			onSizeChange({ size }) {
				// zag also reports its own re-constraint, such as when the page resizes, and only a gesture may preview.
				if (!resizeStart || !service.state.matches('open.resizing')) return;
				resizePreview = resizeFloatRect(resizeStart.rect, resizeStart.axis, size, box, minimum);
			},
			onSizeChangeEnd() {
				const resized = resizePreview;
				resizePreview = undefined;
				resizeStart = undefined;
				if (!resized) return;
				context.update((root) => setFloatRect(root, entry.id, resized));
			}
		};
	});
	const api = $derived(floatingPanel.connect(service, normalizeProps));
	// zag labels the dialog by a title this window never renders, sizes it from variables its own positioner would set, and marks stacking from its page-wide stack, not `floats` order.
	const windowProps = $derived({
		...api.getContentProps(),
		'aria-labelledby': undefined,
		style: undefined,
		'data-topmost': undefined,
		'data-behind': undefined
	});

	onMount(() =>
		context.registerFloat(entry.id, {
			drawnRect: () => drawnRect,
			content: () => entry.content
		})
	);

	// zag positions in the viewport, and this window sits inside its box.
	function readBoxOrigin() {
		const offsetParent = element?.offsetParent;
		if (!offsetParent) return { x: 0, y: 0 };
		const { x, y } = offsetParent.getBoundingClientRect();
		return { x: x + offsetParent.clientLeft, y: y + offsetParent.clientTop };
	}

	function resizeTriggerProps(axis: ResizeAxis) {
		const props = api.getResizeTriggerProps({ axis });
		return {
			...props,
			onpointerdown(event: PointerEvent & { currentTarget: HTMLElement }) {
				resizeStart = { axis, rect: drawnRect };
				props.onpointerdown?.(event);
			}
		};
	}

	function moveOrResizeByKey(event: KeyboardEvent & { currentTarget: HTMLElement }) {
		if (event.target !== event.currentTarget || !isArrowKey(event.key)) return;
		if (event.ctrlKey || event.metaKey) return;
		event.preventDefault();

		const key = event.key;
		const distance = event.shiftKey ? FLOAT_KEY_LARGE_STEP : FLOAT_KEY_STEP;
		const step = event.altKey ? resizeFloatRectByKey : moveFloatRectByKey;
		context.update((root) =>
			setFloatRect(root, entry.id, (rect) => step(rect, key, distance, box, minimum))
		);
	}

	function raise(event: Event & { currentTarget: HTMLElement }) {
		if (!isInSameRoot(event.target, event.currentTarget)) return;
		context.update((root) => raiseFloat(root, entry.id));
	}
</script>

<div
	{...windowProps}
	bind:this={element}
	aria-label={label}
	data-float-entry={entry.id}
	class="absolute min-h-0 min-w-0 overflow-hidden outline-info-dark focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-solid"
	style:left="{drawnRect.x}px"
	style:top="{drawnRect.y}px"
	style:width="{drawnRect.width}px"
	style:height="{drawnRect.height}px"
	style:z-index={zIndex}
	onpointerdowncapture={raise}
	onfocusincapture={raise}
	onkeydowncapture={moveOrResizeByKey}
>
	<PanesNode node={entry.content} />
	{#each FLOAT_RESIZE_AXES as axis (axis)}
		<div
			{...resizeTriggerProps(axis)}
			data-float-resize={axis}
			class={['z-10', HANDLE_CLASSES[axis]]}
		></div>
	{/each}
</div>
