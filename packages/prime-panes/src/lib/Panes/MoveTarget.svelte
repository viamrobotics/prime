<script lang="ts">
	import { onMount } from 'svelte';

	import { getPaneDropRegion, nearestEdge, stackSideOf } from '../drop-region.ts';
	import type { DropRect, DropRegion, EdgeRegion } from '../drop-region.ts';

	import { edgeOfArrow, stepInsertion, stepRegion } from './arrow-regions.ts';
	import { INDICATOR_CLASSES_BY_REGION } from './indicator-geometry.ts';
	import { destinationName, reorderName, targetName } from './move-wording.ts';
	import { usePanes } from './usePanes.svelte.ts';
	import type { MoveDestination, TabInsertion } from './usePanes.svelte.ts';

	interface Props {
		paneId: string;
		destination: MoveDestination;
		movingLabel: string;
		stackRect: () => DropRect | undefined;
		bodyRect: () => DropRect | undefined;
		moveTriggerAt: (clientX: number, clientY: number) => Element | undefined;
		insertionIndexAt: (clientX: number, clientY: number) => number | undefined;
		onpreview: (insertion: TabInsertion | undefined) => void;
	}

	interface Press {
		region: DropRegion;
		index: number | undefined;
		isTouch: boolean;
	}

	interface StackPlacement {
		box: DropRect;
		side: EdgeRegion;
	}

	// A region with no area, such as one hidden outside drags, still needs a spot for its mark.
	const EMPTY_REGION_STRIP_PX = 32;
	const MARK_SELECTOR = '[data-move-button]:not([data-move-button="center"])';

	const SWAP_FOCUS_CLASSES =
		'outline-info-dark focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-solid';

	const MARK_BUTTONS = [
		{
			region: 'stack',
			buttonClasses:
				'left-1/2 h-6 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center',
			barClasses: 'h-1 w-8'
		},
		{
			region: 'left',
			buttonClasses: 'top-1/2 left-0 h-12 w-6 -translate-y-1/2 items-center justify-start pl-2',
			barClasses: 'h-8 w-1'
		},
		{
			region: 'right',
			buttonClasses: 'top-1/2 right-0 h-12 w-6 -translate-y-1/2 items-center justify-end pr-2',
			barClasses: 'h-8 w-1'
		},
		{
			region: 'top',
			buttonClasses: 'left-1/2 h-6 w-12 -translate-x-1/2 items-start justify-center pt-2',
			barClasses: 'h-1 w-8'
		},
		{
			region: 'bottom',
			buttonClasses: 'bottom-0 left-1/2 h-6 w-12 -translate-x-1/2 items-end justify-center pb-2',
			barClasses: 'h-1 w-8'
		}
	] as const satisfies readonly {
		region: Exclude<DropRegion, 'center'>;
		buttonClasses: string;
		barClasses: string;
	}[];

	// The mark of the region's side sits just inside the region's inner edge, clear of the region.
	const INNER_EDGE_STYLE_BY_SIDE = {
		top: ({ top, height }) => `top: ${top + height}px`,
		left: ({ left, width }) => `left: ${left + width}px`,
		bottom: ({ top }) => `bottom: calc(100% - ${top}px)`,
		right: ({ left }) => `right: calc(100% - ${left}px)`
	} as const satisfies Record<EdgeRegion, (box: DropRect) => string>;

	const {
		paneId,
		destination,
		movingLabel,
		stackRect,
		bodyRect,
		moveTriggerAt,
		insertionIndexAt,
		onpreview
	}: Props = $props();

	const context = usePanes();

	let group = $state<HTMLElement>();
	let isHovered = $state(false);
	let isFocusEngaged = $state(false);
	let previewedRegion = $state<DropRegion>();
	let previewedIndex = $state<number>();
	let rovingRegion = $state<DropRegion>();
	let stackPlacement = $state<StackPlacement>({
		box: { left: 0, top: 0, width: 0, height: EMPTY_REGION_STRIP_PX },
		side: 'top'
	});
	let press: Press | undefined;

	const label = $derived(destination.label);
	const regions = $derived(destination.regions);
	const offeredMarks = $derived(MARK_BUTTONS.filter((mark) => regions.includes(mark.region)));
	const region = $derived(context.selectedRegionFor(paneId) ?? regions[0]);
	const tabStopRegion = $derived(
		rovingRegion !== undefined && regions.includes(rovingRegion) ? rovingRegion : regions[0]
	);
	const swapLabel = $derived(context.movingSlotLabel ?? movingLabel);
	const isEngaged = $derived(isHovered || isFocusEngaged || previewedRegion !== undefined);
	const insertion = $derived(destination.insertion);
	const insertionIndex = $derived(
		insertion &&
			Math.min(context.selectedIndexFor(paneId) ?? insertion.defaultIndex, insertion.lastIndex)
	);
	const tabPosition = $derived(
		insertion && insertionIndex !== undefined
			? { position: insertionIndex + 1, total: insertion.total }
			: undefined
	);
	// A stacked target previews the placement as a tab in its strip, so a box over the region would only hide the tab labels.
	const showsPreviewTab = $derived(region === 'stack' && insertion !== undefined);
	const previewedInsertion = $derived.by((): TabInsertion | undefined => {
		if (!isEngaged || region !== 'stack' || insertion === undefined) return undefined;
		if (insertionIndex === undefined) return undefined;

		const liftedId = insertion.isReorder ? context.movingId : undefined;
		return { index: insertionIndex, panes: context.movingPanes, liftedId };
	});
	const stackPreviewStyle = $derived.by(() => {
		const { left, top, width, height } = stackPlacement.box;
		return `left: ${left}px; top: ${top}px; width: ${width}px; height: ${height}px`;
	});

	onMount(() => {
		stackPlacement = measureStackPlacement();
		return context.registerDestination(paneId, select);
	});

	$effect(() => {
		onpreview(previewedInsertion);
		return () => onpreview(undefined);
	});

	// A region that shows only in move mode has no rect until then, so engaging measures it again.
	$effect(() => {
		if (group === undefined || !isEngaged) return;

		stackPlacement = measureStackPlacement();
	});

	function measureStackPlacement(): StackPlacement {
		const paneRect = group!.getBoundingClientRect();
		const regionRect = stackRect();
		if (regionRect === undefined || regionRect.width === 0 || regionRect.height === 0) {
			const box = { left: 0, top: 0, width: paneRect.width, height: EMPTY_REGION_STRIP_PX };
			return { box, side: 'top' };
		}

		const box = {
			left: regionRect.left - paneRect.left,
			top: regionRect.top - paneRect.top,
			width: regionRect.width,
			height: regionRect.height
		};
		return { box, side: stackSideOf(regionRect, bodyRect() ?? paneRect) };
	}

	function markStyle(markRegion: DropRegion) {
		const { box, side } = stackPlacement;
		if (markRegion === 'stack') {
			return `left: ${box.left + box.width / 2}px; top: ${box.top + box.height / 2}px`;
		}
		return markRegion === side ? INNER_EDGE_STYLE_BY_SIDE[side](box) : undefined;
	}

	function nameFor(targetRegion: DropRegion) {
		if (targetRegion === 'stack' && insertion?.isReorder && tabPosition) {
			return reorderName(movingLabel, tabPosition);
		}
		const moving = targetRegion === 'center' ? swapLabel : movingLabel;
		return targetName(
			targetRegion,
			moving,
			label,
			targetRegion === 'stack' ? tabPosition : undefined
		);
	}

	function buttonFor(buttonRegion: DropRegion) {
		return group?.querySelector<HTMLElement>(`[data-move-button="${buttonRegion}"]`);
	}

	function select(next: DropRegion) {
		context.selectRegion(paneId, next);
		buttonFor(next)?.focus();
	}

	// A mark that overlaps another region, such as the edge mark beside the stack region, wins under the pointer.
	function markedRegionAt(target: EventTarget | null) {
		const mark = target instanceof Element ? target.closest<HTMLElement>(MARK_SELECTOR) : null;
		return regions.find((candidate) => candidate === mark?.dataset.moveButton);
	}

	function indexUnder(event: PointerEvent) {
		if (insertion === undefined) return undefined;

		const index = insertionIndexAt(event.clientX, event.clientY);
		return index === undefined ? undefined : Math.min(index, insertion.lastIndex);
	}

	function regionUnder(event: PointerEvent & { currentTarget: HTMLElement }) {
		const markedRegion = markedRegionAt(event.target);
		if (markedRegion !== undefined) return markedRegion;

		const { clientX, clientY } = event;
		const frameRect = bodyRect() ?? event.currentTarget.getBoundingClientRect();
		const pointed = getPaneDropRegion(clientX, clientY, frameRect, stackRect());
		return regions.includes(pointed) ? pointed : nearestEdge(clientX, clientY, frameRect);
	}

	function selectUnder(event: PointerEvent & { currentTarget: HTMLElement }): Press {
		const pointedRegion = regionUnder(event);
		const pointedIndex = pointedRegion === 'stack' ? indexUnder(event) : undefined;
		context.selectRegion(paneId, pointedRegion);
		if (pointedIndex !== undefined) context.selectIndex(paneId, pointedIndex);
		return { region: pointedRegion, index: pointedIndex, isTouch: event.pointerType === 'touch' };
	}

	function handlePointerDown(event: PointerEvent & { currentTarget: HTMLElement }) {
		press = selectUnder(event);
		if (!press.isTouch) return;

		context.announce(nameFor(press.region));
		// A touch tap does not focus a button in every browser, and focus moving away ends the preview.
		buttonFor(tabStopRegion)?.focus();
	}

	function handlePointerMove(event: PointerEvent & { currentTarget: HTMLElement }) {
		selectUnder(event);
	}

	function handleClick(buttonRegion: DropRegion) {
		const clicked = press;
		press = undefined;
		if (
			clicked?.isTouch &&
			(clicked.region !== previewedRegion || clicked.index !== previewedIndex)
		) {
			previewedRegion = clicked.region;
			previewedIndex = clicked.index;
			return;
		}
		// A click with no pointer press before it came from a keyboard or assistive technology, and means its own button.
		const placedRegion = clicked === undefined ? buttonRegion : region;
		context.place(destination, placedRegion, placedRegion === 'stack' ? insertionIndex : undefined);
	}

	// Only the moving pane's own slot has no full-pane button, so a pointer click there lands on the group itself.
	function handleGroupClick(event: MouseEvent & { currentTarget: HTMLElement }) {
		if (event.target !== event.currentTarget || press === undefined) return;

		const coveredTrigger = moveTriggerAt(event.clientX, event.clientY);
		if (coveredTrigger instanceof HTMLElement) {
			press = undefined;
			coveredTrigger.click();
			return;
		}
		handleClick(region);
	}

	function handleButtonFocus(
		buttonRegion: DropRegion,
		event: FocusEvent & { currentTarget: HTMLElement }
	) {
		rovingRegion = buttonRegion;
		// An edge button is invisible until its destination is engaged, so focusing one engages it.
		isFocusEngaged ||= buttonRegion !== 'center' || event.currentTarget.matches(':focus-visible');
		if (!isFocusEngaged || press !== undefined || buttonRegion === region) return;

		context.selectRegion(paneId, buttonRegion);
	}

	function handleFocusOut(event: FocusEvent & { currentTarget: HTMLElement }) {
		if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) {
			return;
		}
		isFocusEngaged = false;
		previewedRegion = undefined;
		previewedIndex = undefined;
		press = undefined;
	}

	// Arrows along the strip choose a gap. A stack region down a side has no tabs along the arrows, so only a reorder takes them.
	function stepInsertionBy(edge: EdgeRegion) {
		if (tabStopRegion !== 'stack' || insertion === undefined || insertionIndex === undefined) {
			return false;
		}
		const side = measureStackPlacement().side;
		if (!insertion.isReorder && side !== 'top' && side !== 'bottom') return false;

		const next = stepInsertion(insertionIndex, edge, insertion.lastIndex);
		if (next === undefined) return false;

		context.selectIndex(paneId, next);
		context.announce(nameFor('stack'));
		return true;
	}

	function handleKeydown(event: KeyboardEvent) {
		isFocusEngaged = true;
		press = undefined;

		const edge = edgeOfArrow(event);
		if (edge === undefined) return;

		if (stepInsertionBy(edge)) {
			event.preventDefault();
			return;
		}

		const next = stepRegion(tabStopRegion, edge, regions, measureStackPlacement().side);
		if (next === undefined) {
			if (context.crossToNeighbor(paneId, edge)) event.preventDefault();
			return;
		}

		event.preventDefault();
		select(next);
	}
</script>

<!-- The group holds the controls. It only delegates the keyboard and pointer events of its buttons. -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
	bind:this={group}
	role="group"
	data-move-target={region}
	aria-label={destinationName(movingLabel, label)}
	class="absolute inset-0 z-30"
	onpointerenter={() => (isHovered = true)}
	onpointerleave={() => (isHovered = false)}
	onpointerdown={handlePointerDown}
	onpointermove={handlePointerMove}
	onpointercancel={() => (press = undefined)}
	onclick={handleGroupClick}
	onkeydown={handleKeydown}
	onfocusout={handleFocusOut}
>
	{#if regions.includes('center')}
		<button
			type="button"
			data-move-button="center"
			tabindex={tabStopRegion === 'center' ? 0 : -1}
			aria-label={nameFor('center')}
			class={['absolute inset-0 z-10 cursor-pointer', SWAP_FOCUS_CLASSES]}
			onclick={() => handleClick('center')}
			onfocus={(event) => handleButtonFocus('center', event)}
		></button>
	{/if}
	{#if isEngaged && !showsPreviewTab}
		<div aria-hidden="true" class="pointer-events-none absolute inset-0">
			<div
				data-move-preview={region}
				style={region === 'stack' ? stackPreviewStyle : undefined}
				class={[
					'absolute flex items-center justify-center bg-info-medium/50 motion-safe:transition-all',
					INDICATOR_CLASSES_BY_REGION[region]
				]}
			>
				<span class="max-w-full truncate bg-info-light px-2 py-1 text-xs text-info-dark">
					{movingLabel}
				</span>
			</div>
		</div>
	{/if}
	{#each offeredMarks as { region: markRegion, buttonClasses, barClasses } (markRegion)}
		<button
			type="button"
			data-move-button={markRegion}
			tabindex={tabStopRegion === markRegion ? 0 : -1}
			aria-label={nameFor(markRegion)}
			style={markStyle(markRegion)}
			class={[
				'absolute z-20 flex cursor-pointer rounded focus-visible:outline-none',
				buttonClasses,
				{ 'pointer-events-none opacity-0': !isEngaged }
			]}
			onclick={() => handleClick(markRegion)}
			onfocus={(event) => handleButtonFocus(markRegion, event)}
		>
			<span
				class={[
					'rounded-full motion-safe:transition-all',
					barClasses,
					{ 'bg-info-dark': region === markRegion, 'bg-gray-8 opacity-70': region !== markRegion }
				]}
			></span>
			{#if markRegion === 'stack'}
				<span
					class={[
						'absolute top-1.5 left-2 h-1 w-3 rounded-t-full motion-safe:transition-all',
						{ 'bg-info-dark': region === markRegion, 'bg-gray-8 opacity-70': region !== markRegion }
					]}
				></span>
			{/if}
		</button>
	{/each}
</div>
