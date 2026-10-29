<script lang="ts">
	import '../tailwind.css';

	import { CAMERA_ROW } from '../layouts.ts';
	import type { PaneData } from '../layouts.ts';
	import type { LayoutNode, PaneNode } from '../../src/lib/layout.ts';
	import { Panes } from '../../src/lib/Panes/panes.ts';

	interface Props {
		keepInactiveMounted?: boolean;
		isAccepting?: boolean;
		hasCustomTab?: boolean;
		hasTriggers?: boolean;
		dragTarget?: 'pane' | 'stack';
		moveTarget?: 'pane' | 'stack';
		hasStackTrigger?: boolean;
		isTabListInTrigger?: boolean;
		reorderable?: boolean;
		received?: (LayoutNode<PaneData> | undefined)[];
		hasTabList?: boolean;
		hasPaneBody?: boolean;
		initialLayout?: LayoutNode<PaneData>;
		hasStateProbe?: boolean;
		// strip: tab strip of a stacked pane, top 32px of an unstacked one. left: 48px strip down the left side.
		// drag-only: strip, only during a drag. top-strip: 16px above the tab list, outside it.
		dropRegion?: 'strip' | 'left' | 'top-strip' | 'drag-only' | 'none';
		bodyClass?: string;
	}

	const {
		keepInactiveMounted,
		isAccepting = true,
		hasCustomTab = false,
		hasTriggers = false,
		dragTarget = 'pane',
		moveTarget = dragTarget,
		hasStackTrigger = false,
		isTabListInTrigger = false,
		reorderable,
		received = [],
		hasTabList = true,
		hasPaneBody = false,
		initialLayout,
		hasStateProbe = false,
		dropRegion = 'strip',
		bodyClass
	}: Props = $props();

	let layout = $derived<LayoutNode<PaneData> | undefined>(
		initialLayout ?? structuredClone(CAMERA_ROW)
	);

	export function getLayout() {
		return $state.snapshot(layout);
	}
</script>

{#snippet region(isStacked: boolean)}
	{#if dropRegion === 'strip'}
		<Panes.TabListDropRegion
			class={isStacked ? 'absolute inset-0' : 'absolute inset-x-0 top-0 h-8'}
		/>
	{:else if dropRegion === 'left'}
		<Panes.TabListDropRegion class="absolute inset-y-0 left-0 w-12" />
	{:else if dropRegion === 'drag-only'}
		<Panes.TabListDropRegion class="absolute inset-x-0 top-0 hidden h-8 in-data-dragging:block" />
	{/if}
{/snippet}

{#snippet tabList(isCustom: boolean, isStacked: boolean)}
	{#if isCustom}
		<Panes.TabList
			aria-label="Cameras"
			class={dropRegion === 'strip' && isStacked ? 'relative' : undefined}
		>
			{#snippet tab(stacked: PaneNode<PaneData>)}
				<span data-custom-tab={stacked.id}>Tab {stacked.data.label}</span>
			{/snippet}
			{@render region(isStacked)}
		</Panes.TabList>
	{:else}
		<Panes.TabList
			aria-label="Cameras"
			class={dropRegion === 'strip' && isStacked ? 'relative' : undefined}
		>
			{@render region(isStacked)}
		</Panes.TabList>
	{/if}
{/snippet}

<div data-testid="frame" style="width: 800px; height: 600px">
	<Panes
		bind:layout={
			() => layout,
			(next) => {
				received.push(next);
				if (isAccepting) layout = next;
			}
		}
		{keepInactiveMounted}
		{reorderable}
		paneLabel={(node) => node.data.label}
		class="size-full"
	>
		{#snippet pane(node, state)}
			{#if hasStateProbe}
				<output
					data-state-of={node.id}
					data-is-stacked={String(state.isStacked)}
					data-is-moving={String(state.isMoving)}
					data-is-drag-armed={String(state.isDragArmed)}
				></output>
			{/if}
			{#if hasTriggers}
				<Panes.DragTrigger target={dragTarget}>
					<Panes.MoveTrigger aria-label="Move {node.data.label}" target={moveTarget}>
						Move
					</Panes.MoveTrigger>
					{#if hasStackTrigger}
						<Panes.MoveTrigger aria-label="Move stack of {node.data.label}" target="stack">
							Move stack
						</Panes.MoveTrigger>
					{/if}
				</Panes.DragTrigger>
			{/if}
			{#if hasTabList}
				{#if dropRegion === 'top-strip'}
					<Panes.TabListDropRegion class="h-4" />
				{/if}
				{#if isTabListInTrigger}
					<Panes.DragTrigger>
						{@render tabList(hasCustomTab, state.isStacked)}
					</Panes.DragTrigger>
				{:else}
					{@render tabList(hasCustomTab, state.isStacked)}
				{/if}
			{/if}
			{#if hasPaneBody}
				<Panes.PaneBody data-pane-body={node.id} class={bodyClass}>
					<input aria-label="Note for {node.data.label}" data-pane-id={node.id} />
				</Panes.PaneBody>
			{:else}
				<input aria-label="Note for {node.data.label}" data-pane-id={node.id} />
			{/if}
		{/snippet}
	</Panes>
</div>
