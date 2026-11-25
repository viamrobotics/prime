<!--
@component
One tab of a [`Tabs`](./Tabs.svelte) strip. Its children are the tab's label. It is a
`role="tab"` element rather than a `<button>`, so controls can sit inside it. Under a `closable`
list the tab renders its own close button, shown on the selected tab and on a hovered one, with
its space kept on the others. It leaves the Tab order, since Delete closes the focused tab. A
`status`, such as an unsaved dot, fills that space while the close button is hidden. Place other
controls through the `actions` snippet: [`Tabs.MovePrevious`](./TabsMovePrevious.svelte) and
[`Tabs.MoveNext`](./TabsMoveNext.svelte) leave the Tab order too, while a control of your own,
such as a menu trigger, keeps its Tab stop and its own keys. It must stop click propagation
itself, or its click also selects the tab. Under the root's `file` variant the tab is a boxed
file tab, and selecting it scrolls the strip to show it.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { mdiClose } from '@mdi/js';
	import { Tabs } from 'bits-ui';

	import type { TabsMove } from './move.ts';
	import type { TabsVariant } from './variant.ts';

	import Icon from '../Icon/Icon.svelte';
	import { CLOSE_KEYSHORTCUT, isCloseKey } from './close.ts';
	import { watchTabDrag } from './drag-reorder.ts';
	import LandingChip from './LandingChip.svelte';
	import { REORDER_KEYSHORTCUTS, reorderStepOf } from './reorder.ts';
	import { useTabs } from './useTabs.svelte.ts';
	import { useTabsDrag } from './useTabsDrag.svelte.ts';
	import { useTabsReorder } from './useTabsReorder.svelte.ts';
	import { provideTabsTrigger } from './useTabsTrigger.svelte.ts';
	import { DEFAULT_TABS_VARIANT } from './variant.ts';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
		/** The value the root holds when this tab is selected. */
		value: string;
		/** Disable this tab. @default false */
		disabled?: boolean;
		/**
		 * Controls placed after the label, such as a menu trigger or `Tabs.MovePrevious` and
		 * `Tabs.MoveNext`. A control of your own keeps its Tab stop. The tab is named from `children`
		 * alone unless `aria-label` or `aria-labelledby` is given.
		 */
		actions?: Snippet<[TabsMove]>;
		/**
		 * A mark such as an unsaved dot, shown in the close button's place while that button is hidden,
		 * or always when the list is not `closable`. Its text describes the tab, so give a visual-only
		 * mark a visually hidden word.
		 */
		status?: Snippet;
	}

	const {
		value: valueProp,
		disabled = false,
		class: extraClasses,
		children,
		actions,
		status,
		...restProps
	}: Props = $props();

	// The prop re-notifies when its source changes, such as a keyed `{#each}` item replaced by an
	// equal one. A `$derived` notifies only when the string changes.
	const value = $derived(valueProp);

	const uid = $props.id();
	const labelId = `${uid}-label`;
	const closeId = `${uid}-close`;
	const statusId = `${uid}-status`;

	const tabs = useTabs();
	const reorder = useTabsReorder();
	const drag = useTabsDrag();

	const isMovable = $derived(reorder?.reorderable === true && !disabled);
	const hasCloseButton = $derived(reorder?.closable === true);
	const isClosable = $derived(hasCloseButton && !disabled);
	const isSelected = $derived(tabs?.value === value);
	const keyshortcuts = $derived(
		[isClosable && CLOSE_KEYSHORTCUT, isMovable && REORDER_KEYSHORTCUTS].filter(Boolean).join(' ')
	);
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

	$effect(() => {
		if (!element || !tabs) return;
		return tabs.register(value, element);
	});

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

	const close = () => {
		if (isClosable) reorder?.close(value);
	};

	const closeByClick = (event: MouseEvent) => {
		event.stopPropagation();
		close();
	};

	const handleKeydown = (event: KeyboardEvent, triggerKeydown?: (event: KeyboardEvent) => void) => {
		// A key from a control inside the tab must not reach bits-ui, which would swallow Enter and Space.
		if (event.target !== event.currentTarget) return;
		if (isMovable && moveByKey(event)) return;
		if (isClosable && isCloseKey(event)) {
			event.preventDefault();
			close();
			return;
		}
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

	provideTabsTrigger({ move, labelId });

	const hasControls = $derived(actions !== undefined || status !== undefined || hasCloseButton);

	const isNamedByLabel = $derived(
		hasControls &&
			restProps['aria-label'] === undefined &&
			restProps['aria-labelledby'] === undefined
	);

	const isDescribedByStatus = $derived(
		status !== undefined && restProps['aria-describedby'] === undefined
	);

	// The close button and the status share one cell, so hiding the button keeps its space.
	const closeVisibility = $derived(isSelected ? 'visible' : 'invisible group-hover/tab:visible');
	const statusVisibility = $derived(isSelected ? 'invisible' : 'group-hover/tab:invisible');

	// bits-ui renders a button, so it sets the button-only `type` and `disabled` that a div must not carry.
	const buttonOnlyAttributes = { type: undefined, disabled: undefined };

	// bits-ui types its trigger as a button, which the div attributes exceed; it merges handlers and classes itself.
	const triggerProps = $derived(restProps as Record<string, unknown>);
</script>

<Tabs.Trigger
	{value}
	{disabled}
	class={[triggerClasses[tabs?.variant ?? DEFAULT_TABS_VARIANT], 'group/tab', extraClasses]}
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
			{...isDescribedByStatus ? { 'aria-describedby': statusId } : {}}
			aria-disabled={disabled || undefined}
			aria-keyshortcuts={keyshortcuts || undefined}
			hidden={drag?.lifted === value || undefined}
			onkeydown={(event) => handleKeydown(event, onkeydown)}
		>
			<span class="contents" id={labelId} data-tab-label>{@render children?.()}</span>
			{@render actions?.(move)}
			{#if hasCloseButton || status}
				<span class="inline-grid flex-none place-items-center align-middle">
					{#if status}
						<span
							id={statusId}
							class={['flex items-center [grid-area:1/1]', isClosable && statusVisibility]}
						>
							{@render status()}
						</span>
					{/if}
					{#if isClosable}
						<button
							type="button"
							id={closeId}
							class={['icon-button [grid-area:1/1]', closeVisibility]}
							tabindex={-1}
							aria-label="Close"
							aria-labelledby="{closeId} {labelId}"
							data-tab-close
							onclick={closeByClick}
						>
							<Icon icon={mdiClose} size="sm" />
						</button>
					{/if}
				</span>
			{/if}
		</div>
	{/snippet}
</Tabs.Trigger>
