<!--
@component
One tab of a [`Tabs`](./Tabs.svelte) strip. Its children are the tab's label. It is a
`role="tab"` element rather than a `<button>`, so a control such as a close `icon-button` can
sit inside it, placed through the `actions` snippet. That control keeps its own keys. It must
stop click propagation itself, or its click also selects the tab. Under the root's `file`
variant the tab is a boxed file tab, and selecting it scrolls the strip to show it.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { Tabs } from 'bits-ui';

	import type { TabsMove } from './move.ts';
	import type { TabsVariant } from './variant.ts';

	import { watchTabDrag } from './drag-reorder.ts';
	import LandingChip from './LandingChip.svelte';
	import { REORDER_KEYSHORTCUTS, reorderStepOf } from './reorder.ts';
	import { useTabs } from './useTabs.svelte.ts';
	import { useTabsDrag } from './useTabsDrag.svelte.ts';
	import { useTabsReorder } from './useTabsReorder.svelte.ts';
	import { DEFAULT_TABS_VARIANT } from './variant.ts';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
		/** The value the root holds when this tab is selected. */
		value: string;
		/** Disable this tab. @default false */
		disabled?: boolean;
		/**
		 * Controls placed after the label, such as a close button or Move left and Move right buttons. The
		 * tab is named from `children` alone unless `aria-label` or `aria-labelledby` is given.
		 */
		actions?: Snippet<[TabsMove]>;
	}

	const {
		value,
		disabled = false,
		class: extraClasses,
		children,
		actions,
		...restProps
	}: Props = $props();

	const labelId = $props.id();

	const tabs = useTabs();
	const reorder = useTabsReorder();
	const drag = useTabsDrag();

	const isMovable = $derived(reorder?.reorderable === true && !disabled);
	const position = $derived(reorder?.order.indexOf(value) ?? -1);
	const lastPosition = $derived((reorder?.order.length ?? 0) - 1);

	const triggerClasses: Record<TabsVariant, string> = {
		underline: 'underline-tab',
		file: 'file-tab'
	};

	let element = $state<HTMLElement>();

	// Scrolls the list itself, since `scrollIntoView` can scroll the page too.
	$effect(() => {
		const list = element?.parentElement;
		if (!element || !list || tabs?.variant !== 'file' || tabs.value !== value) return;
		const tab = element.getBoundingClientRect();
		const view = list.getBoundingClientRect();
		if (tab.left < view.left) list.scrollLeft += tab.left - view.left;
		else if (tab.right > view.right) list.scrollLeft += tab.right - view.right;
	});

	$effect(() => tabs?.register(value));

	$effect(() => {
		if (!element || !reorder) return;
		return reorder.track(value, element);
	});

	$effect(() => {
		if (!element || !drag || !isMovable) return;
		return watchTabDrag(element, value, drag);
	});

	const moveBy = (step: number) => {
		if (!reorder || !isMovable) return;
		reorder.move(value, position + step, { focus: true });
	};

	const moveByKey = (event: KeyboardEvent) => {
		const step = reorderStepOf(event);
		if (step === undefined) return false;
		event.preventDefault();
		moveBy(step);
		return true;
	};

	const handleKeydown = (event: KeyboardEvent, triggerKeydown?: (event: KeyboardEvent) => void) => {
		// A key from a control inside the tab must not reach bits-ui, which would swallow Enter and Space.
		if (event.target !== event.currentTarget) return;
		if (isMovable && moveByKey(event)) return;
		triggerKeydown?.(event);
	};

	const move: TabsMove = {
		movePrevious: () => moveBy(-1),
		moveNext: () => moveBy(1),
		get canMovePrevious() {
			return isMovable && position > 0;
		},
		get canMoveNext() {
			return isMovable && position < lastPosition;
		}
	};

	const isNamedByLabel = $derived(
		actions !== undefined &&
			restProps['aria-label'] === undefined &&
			restProps['aria-labelledby'] === undefined
	);

	// bits-ui renders a button, so it sets the button-only `type` and `disabled` that a div must not carry.
	const buttonOnlyAttributes = { type: undefined, disabled: undefined };

	// bits-ui types its trigger as a button, which the div attributes exceed; it merges handlers and classes itself.
	const triggerProps = $derived(restProps as Record<string, unknown>);
</script>

<Tabs.Trigger
	{value}
	{disabled}
	class={[triggerClasses[tabs?.variant ?? DEFAULT_TABS_VARIANT], extraClasses]}
	{...triggerProps}
>
	{#snippet child({ props })}
		{@const { onkeydown } = props as { onkeydown?: (event: KeyboardEvent) => void }}
		{#if drag?.isChipBefore(value)}
			<LandingChip label={drag.label} />
		{/if}
		<div
			bind:this={element}
			{...props}
			{...buttonOnlyAttributes}
			{...isNamedByLabel ? { 'aria-labelledby': labelId } : {}}
			aria-disabled={disabled || undefined}
			aria-keyshortcuts={isMovable ? REORDER_KEYSHORTCUTS : undefined}
			hidden={drag?.lifted === value || undefined}
			onkeydown={(event) => handleKeydown(event, onkeydown)}
		>
			<span class="contents" id={labelId} data-tab-label>{@render children?.()}</span>
			{@render actions?.(move)}
		</div>
	{/snippet}
</Tabs.Trigger>
