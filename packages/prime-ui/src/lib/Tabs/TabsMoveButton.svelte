<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

	import type { TabsMove } from './move.ts';

	import Icon from '../Icon/Icon.svelte';
	import { useTabsTrigger } from './useTabsTrigger.svelte.ts';

	interface Props extends Omit<
		HTMLButtonAttributes,
		'type' | 'disabled' | 'tabindex' | 'aria-label' | 'aria-labelledby' | 'onclick'
	> {
		id?: string;
		step: 'previous' | 'next';
	}

	const { step, class: extraClasses, children, ...restProps }: Props = $props();

	const STEPS = {
		previous: {
			direction: 'left',
			icon: mdiChevronLeft,
			canMove: (move: TabsMove) => move.canMovePrevious,
			apply: (move: TabsMove) => move.movePrevious()
		},
		next: {
			direction: 'right',
			icon: mdiChevronRight,
			canMove: (move: TabsMove) => move.canMoveNext,
			apply: (move: TabsMove) => move.moveNext()
		}
	} as const;

	const uid = $props.id();
	const verbId = `${uid}-verb`;
	const directionId = `${uid}-direction`;

	const trigger = useTabsTrigger();

	const canMove = $derived(trigger !== undefined && STEPS[step].canMove(trigger.move));

	const moveTab = (event: MouseEvent) => {
		event.stopPropagation();
		if (trigger) STEPS[step].apply(trigger.move);
	};
</script>

{#if trigger}
	<button
		type="button"
		{...restProps}
		class={['icon-button', extraClasses]}
		tabindex={-1}
		disabled={!canMove}
		aria-labelledby="{verbId} {trigger.labelId} {directionId}"
		onclick={moveTab}
	>
		<span id={verbId} hidden>Move</span>
		<span id={directionId} hidden>{STEPS[step].direction}</span>
		{#if children}
			{@render children()}
		{:else}
			<Icon icon={STEPS[step].icon} size="sm" />
		{/if}
	</button>
{/if}
