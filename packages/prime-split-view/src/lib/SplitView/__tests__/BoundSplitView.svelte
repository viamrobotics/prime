<script lang="ts">
	import '../../../routes/layout.css';

	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { ids, layoutRoot } from '../../__tests__/layout-fixture.ts';
	import type { PaneData } from '../../__tests__/layout-fixture.ts';
	import type { LayoutNode } from '../../layout.ts';
	import { setSplitRatio } from '../../tree.ts';
	import SplitView from '../SplitView.svelte';
	import UpdateProbePane from './UpdateProbePane.svelte';
	import type { UpdateProbe } from './update-probe.ts';

	interface Props {
		/** Receives the context's `update` from inside a pane. */
		probe?: UpdateProbe;
		/** Passed to `SplitView`. */
		reorderable?: boolean;
		/** Renders a grip button carrying `dragTrigger` and `moveTrigger` in every pane. */
		handles?: boolean;
		/** Names panes by their `label`. When false, `SplitView` falls back to the pane id. */
		labelPanes?: boolean;
		/** Spread onto every grip button. */
		handleProps?: HTMLButtonAttributes;
	}

	const { probe, reorderable, handles = false, labelPanes = true, handleProps }: Props = $props();

	let layout = $state<LayoutNode<PaneData> | undefined>(structuredClone(layoutRoot));

	export function getLayout() {
		return $state.snapshot(layout);
	}

	const rootRatio = $derived(layout?.type === 'split' ? layout.ratio : undefined);
</script>

<button type="button" onclick={() => (layout = setSplitRatio(layout, ids.rootSplit, 0.7))}>
	Set root to 70%
</button>
<span data-testid="owner">{rootRatio}</span>
<div data-testid="frame" style="width: 800px; height: 600px">
	<SplitView
		bind:layout
		{reorderable}
		paneLabel={labelPanes ? (node) => node.data.label : undefined}
		class="size-full"
	>
		{#snippet pane(node, controls)}
			{#if handles}
				<button
					type="button"
					aria-label="Move {node.data.label}"
					class="absolute top-2 left-2 size-6 border border-medium"
					{@attach controls.dragTrigger}
					{@attach controls.moveTrigger}
					{...handleProps}
				>
					::
				</button>
			{/if}
			<div data-testid="pane" data-pane-id={node.id} class="size-full">{node.data.label}</div>
			{#if probe}
				<UpdateProbePane {probe} />
			{/if}
		{/snippet}
	</SplitView>
</div>
