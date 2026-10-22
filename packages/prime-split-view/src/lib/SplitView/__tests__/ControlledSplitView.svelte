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
		/** When false, the setter rejects every change (controlled veto). */
		accept?: boolean;
		/** Collects every value the setter receives. */
		received?: (LayoutNode<PaneData> | undefined)[];
		/** The root split's starting `ratio`. */
		initialRatio?: number;
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

	const {
		accept = false,
		received = [],
		initialRatio,
		probe,
		reorderable,
		handles = false,
		labelPanes = true,
		handleProps
	}: Props = $props();

	let layout = $derived<LayoutNode<PaneData> | undefined>(
		initialRatio === undefined ? layoutRoot : setSplitRatio(layoutRoot, ids.rootSplit, initialRatio)
	);

	const rootRatio = $derived(layout?.type === 'split' ? layout.ratio : undefined);

	export function getLayout() {
		return layout;
	}
</script>

<button type="button" onclick={() => (layout = setSplitRatio(layout, ids.rootSplit, 0.7))}>
	Set root to 70%
</button>
<span data-testid="owner">{rootRatio}</span>
<div data-testid="frame" style="width: 800px; height: 600px">
	<SplitView
		bind:layout={
			() => layout,
			(next) => {
				received.push(next);
				if (accept) layout = next;
			}
		}
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
