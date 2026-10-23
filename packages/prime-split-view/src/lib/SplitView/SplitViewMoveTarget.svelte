<script lang="ts">
	import { onMount } from 'svelte';

	import { getDropRegion } from '../drop-region.ts';
	import type { DropRegion, EdgeRegion } from '../drop-region.ts';

	import { edgeOfArrow, stepRegion } from './arrow-regions.ts';
	import { INDICATOR_CLASSES_BY_REGION } from './indicator-geometry.ts';
	import { destinationName, targetName } from './move-wording.ts';
	import { useSplitView } from './useSplitView.svelte.ts';

	interface Props {
		paneId: string;
		label: string;
		movingLabel: string;
	}

	interface Press {
		region: DropRegion;
		isTouch: boolean;
	}

	const SWAP_FOCUS_CLASSES =
		'outline-info-dark focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-solid';

	const EDGE_BUTTONS = [
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
			buttonClasses: 'top-0 left-1/2 h-6 w-12 -translate-x-1/2 items-start justify-center pt-2',
			barClasses: 'h-1 w-8'
		},
		{
			region: 'bottom',
			buttonClasses: 'bottom-0 left-1/2 h-6 w-12 -translate-x-1/2 items-end justify-center pb-2',
			barClasses: 'h-1 w-8'
		}
	] as const satisfies readonly { region: EdgeRegion; buttonClasses: string; barClasses: string }[];

	const { paneId, label, movingLabel }: Props = $props();

	const context = useSplitView();

	let group = $state<HTMLElement>();
	let isHovered = $state(false);
	let isFocusEngaged = $state(false);
	let previewedRegion = $state<DropRegion>();
	let rovingRegion = $state<DropRegion>('center');
	let press: Press | undefined;

	const region = $derived(context.selectedRegionFor(paneId));
	const isEngaged = $derived(isHovered || isFocusEngaged || previewedRegion !== undefined);

	onMount(() => context.registerDestination(paneId, select));

	function buttonFor(buttonRegion: DropRegion) {
		return group?.querySelector<HTMLElement>(`[data-move-button="${buttonRegion}"]`);
	}

	function select(next: DropRegion) {
		context.selectRegion(paneId, next);
		buttonFor(next)?.focus();
	}

	function regionUnder(event: PointerEvent & { currentTarget: HTMLElement }) {
		return getDropRegion(event.clientX, event.clientY, event.currentTarget.getBoundingClientRect());
	}

	function handlePointerDown(event: PointerEvent & { currentTarget: HTMLElement }) {
		const pressedRegion = regionUnder(event);
		context.selectRegion(paneId, pressedRegion);
		press = { region: pressedRegion, isTouch: event.pointerType === 'touch' };
		if (!press.isTouch) return;

		context.announceSelection(paneId);
		// A touch tap does not focus a button in every browser, and focus moving away ends the preview.
		buttonFor('center')?.focus();
	}

	function handlePointerMove(event: PointerEvent & { currentTarget: HTMLElement }) {
		context.selectRegion(paneId, regionUnder(event));
	}

	function handleClick(buttonRegion: DropRegion) {
		const clicked = press;
		press = undefined;
		if (clicked?.isTouch && clicked.region !== previewedRegion) {
			previewedRegion = clicked.region;
			return;
		}
		// A click with no pointer press before it came from a keyboard or assistive technology, and means its own button.
		context.place(paneId, clicked === undefined ? buttonRegion : context.selectedRegionFor(paneId));
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
		press = undefined;
	}

	function handleKeydown(event: KeyboardEvent) {
		isFocusEngaged = true;
		press = undefined;

		const edge = edgeOfArrow(event);
		if (edge === undefined) return;

		const next = stepRegion(rovingRegion, edge);
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
	onkeydown={handleKeydown}
	onfocusout={handleFocusOut}
>
	<button
		type="button"
		data-move-button="center"
		tabindex={rovingRegion === 'center' ? 0 : -1}
		aria-label={targetName('center', movingLabel, label)}
		class={['absolute inset-0 z-10 cursor-pointer', SWAP_FOCUS_CLASSES]}
		onclick={() => handleClick('center')}
		onfocus={(event) => handleButtonFocus('center', event)}
	></button>
	{#if isEngaged}
		<div aria-hidden="true" class="pointer-events-none absolute inset-0">
			<div
				data-move-preview={region}
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
	{#each EDGE_BUTTONS as { region: edge, buttonClasses, barClasses } (edge)}
		<button
			type="button"
			data-move-button={edge}
			tabindex={rovingRegion === edge ? 0 : -1}
			aria-label={targetName(edge, movingLabel, label)}
			class={[
				'absolute z-20 flex cursor-pointer rounded focus-visible:outline-none',
				buttonClasses,
				{ 'pointer-events-none opacity-0': !isEngaged }
			]}
			onclick={() => handleClick(edge)}
			onfocus={(event) => handleButtonFocus(edge, event)}
		>
			<span
				class={[
					'rounded-full motion-safe:transition-all',
					barClasses,
					{ 'bg-info-dark': region === edge, 'bg-gray-8 opacity-70': region !== edge }
				]}
			></span>
		</button>
	{/each}
</div>
