<!--
@component
Renders the tabs of the stack that its pane belongs to. Place it in the `pane` snippet of [`Panes`](./Panes.svelte), usually in the header. It renders in every pane, so every pane can include it. An unstacked pane still carries the container, which holds a [`Panes.TabListDropRegion`](./TabListDropRegion.svelte), but the `tablist` role and the tabs appear only when the pane is stacked.

Give the list a name with `aria-label`, since a screen reader announces it on entry. Tabs inherit the list's text size, and the shown tab carries `aria-selected` for styling. Each tab shows the pane's label from `paneLabel`, or the content of the `tab` snippet. The tabs follow the WAI-ARIA tabs pattern with automatic selection. The list has the `tablist` role and each tab the `tab` role. A tab panel is opt-in through [`Panes.PaneBody`](./PaneBody.svelte). A tab drags its own pane, and the empty area of the list drags the whole stack.

`Panes.TabList` cannot infer `TData`, so an unannotated `tab` snippet receives `PaneNode<unknown>`. Annotate the parameter.

```svelte
{#snippet tab(item: PaneNode<PaneData>)}
	{item.data.label}
{/snippet}

<Panes.TabList {tab} aria-label="Stacked panes" />
```
-->
<script lang="ts" generics="TData">
	import { untrack } from 'svelte';
	import type { Snippet } from 'svelte';
	import { flip } from 'svelte/animate';
	import type { Attachment } from 'svelte/attachments';
	import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import type { PaneNode } from '../layout.ts';

	import { claimPresses } from './classify-press.ts';
	import { reorderStepOf, targetIndexFor } from './tab-list-keys.ts';
	import { usePane, usePanes } from './usePanes.svelte.ts';
	import type { DragSource, TabInsertion } from './usePanes.svelte.ts';
	import { watchDragPress } from './watch-drag-press.ts';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'role'> {
		/** One tab's content. Defaults to the pane's label from `paneLabel`. */
		tab?: Snippet<[PaneNode<TData>]>;

		/**
		 * Content after the tabs. Place `Panes.TabListDropRegion` here, since a drop stacks onto a
		 * pane only over one. The container renders in every pane, so an unstacked pane has its region
		 * too. Only a stacked pane renders the tabs and the `tablist` role.
		 */
		children?: Snippet;
	}

	const {
		tab,
		children,
		class: className,
		onkeydown,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		...rest
	}: Props = $props();

	interface TabSlot {
		key: string;
		pane: PaneNode<unknown>;
		isPreview: boolean;
	}

	const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
	const REORDER_SHORTCUTS = 'Alt+Shift+ArrowLeft Alt+Shift+ArrowRight';
	const PREVIEW_ATTRIBUTES: HTMLAttributes<HTMLElement> = {
		'aria-hidden': true,
		inert: true,
		'data-tab-preview': '',
		class: 'inline-block rounded bg-info-light px-2 py-1 text-info-dark'
	};

	const context = usePanes();
	const pane = usePane();

	const stack = $derived(pane.stack);
	const dragInsertion = $derived.by((): TabInsertion | undefined => {
		const { dragOver, dragPreview } = context;
		if (dragOver?.paneId !== pane.paneId || dragOver.target.region !== 'stack') return undefined;
		return dragPreview && { index: dragOver.target.index ?? Infinity, panes: dragPreview.panes };
	});
	const insertion = $derived(dragInsertion ?? pane.moveInsertion);
	const liftedId = $derived(
		context.dragSource?.type === 'pane' ? context.dragSource.id : insertion?.liftedId
	);
	const slots = $derived.by(() => {
		const tabs = (stack?.panes ?? [])
			.filter((stacked) => stacked.id !== liftedId)
			.map((stacked): TabSlot => ({ key: `tab-${stacked.id}`, pane: stacked, isPreview: false }));
		if (insertion === undefined) return tabs;

		const previews = insertion.panes.map(
			(dragged): TabSlot => ({ key: `preview-${dragged.id}`, pane: dragged, isPreview: true })
		);
		return tabs.toSpliced(insertion.index, 0, ...previews);
	});

	// Svelte drives the shift itself, so a CSS media query would not stop it.
	const flipParams = () => (matchMedia(REDUCED_MOTION_QUERY).matches ? { duration: 0 } : {});

	function sourceAt(event: PointerEvent): DragSource {
		const tab =
			event.target instanceof Element
				? event.target.closest<HTMLElement>('[data-tab-pane-id]')
				: null;
		const tabPaneId = tab?.dataset.tabPaneId;
		if (tabPaneId === undefined) return pane.sourceFor('stack');
		return { type: 'pane', id: tabPaneId };
	}

	const joinPane: Attachment<HTMLElement> = (tabList) => {
		const unregister = untrack(() => pane.registerTabList(tabList));
		const stopWatchingPresses = watchDragPress(tabList, pane, sourceAt);

		return () => {
			stopWatchingPresses();
			unregister();
		};
	};

	function tabAttributes(stacked: PaneNode<unknown>, activeId: string): HTMLButtonAttributes {
		const isActive = stacked.id === activeId;
		return {
			type: 'button',
			role: 'tab',
			id: pane.tabId(stacked.id),
			'data-tab-pane-id': stacked.id,
			'aria-selected': isActive,
			'aria-controls': context.hasPanel(stacked.id) ? pane.panelId(stacked.id) : undefined,
			tabindex: isActive ? 0 : -1,
			'aria-keyshortcuts': context.reorderable ? REORDER_SHORTCUTS : undefined,
			class:
				'rounded px-2 py-1 hover:bg-ghost-light focus-visible:bg-ghost-light active:bg-ghost-medium aria-selected:font-semibold',
			onclick: () => pane.select(stacked.id)
		};
	}

	function handleKeydown(
		event: KeyboardEvent & { currentTarget: HTMLDivElement },
		panes: PaneNode<unknown>[]
	) {
		onkeydown?.(event);
		if (event.defaultPrevented) return;

		const focusedIndex = panes.findIndex((candidate) => candidate.id === focusedTabId(event));
		if (focusedIndex === -1) return;

		const reorderStep = reorderStepOf(event);
		if (reorderStep !== undefined) {
			const reorderedIndex = focusedIndex + reorderStep;
			if (!context.reorderable || reorderedIndex < 0 || reorderedIndex >= panes.length) return;

			event.preventDefault();
			pane.reorder(panes[focusedIndex].id, reorderedIndex);
			return;
		}
		if (event.ctrlKey || event.altKey || event.metaKey) return;

		const targetIndex = targetIndexFor(event.key, focusedIndex, panes.length);
		if (targetIndex === undefined) return;

		event.preventDefault();
		pane.select(panes[targetIndex].id);
	}

	function focusedTabId(event: KeyboardEvent) {
		return event.target instanceof HTMLElement ? event.target.dataset.tabPaneId : undefined;
	}
</script>

{#snippet tabContent(stacked: PaneNode<TData>)}
	{#if tab}
		{@render tab(stacked)}
	{:else}
		{context.labelFor(stacked.id)}
	{/if}
{/snippet}

<div
	{...rest}
	role={stack ? 'tablist' : undefined}
	aria-label={stack ? ariaLabel : undefined}
	aria-labelledby={stack ? ariaLabelledby : undefined}
	class={[className, context.reorderable && 'touch-none']}
	onkeydown={(event) => handleKeydown(event, stack?.panes ?? [])}
	{@attach claimPresses}
	{@attach joinPane}
>
	{#if stack}
		{#each slots as slot (slot.key)}
			<svelte:element
				this={slot.isPreview ? 'span' : 'button'}
				{...slot.isPreview ? PREVIEW_ATTRIBUTES : tabAttributes(slot.pane, stack.activeId)}
				animate:flip={flipParams()}
			>
				{#if slot.isPreview && dragInsertion}
					<!-- The ghost already shows the label during a drag, so the preview keeps only its width. -->
					<span class="invisible">{@render tabContent(slot.pane as PaneNode<TData>)}</span>
				{:else}
					{@render tabContent(slot.pane as PaneNode<TData>)}
				{/if}
			</svelte:element>
		{/each}
	{/if}
	{@render children?.()}
</div>
