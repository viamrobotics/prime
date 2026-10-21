<script lang="ts">
	import '../../../routes/layout.css';

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
	}

	const { probe }: Props = $props();

	let layout = $state<LayoutNode<PaneData> | undefined>(structuredClone(layoutRoot));

	const rootRatio = $derived(layout?.type === 'split' ? layout.ratio : undefined);
</script>

<button type="button" onclick={() => (layout = setSplitRatio(layout, ids.rootSplit, 0.7))}>
	Set root to 70%
</button>
<span data-testid="owner">{rootRatio}</span>
<div data-testid="frame" style="width: 800px; height: 600px">
	<SplitView bind:layout>
		{#snippet pane(node)}
			<div data-testid="pane" data-pane-id={node.id}>{node.data.label}</div>
			{#if probe}
				<UpdateProbePane {probe} />
			{/if}
		{/snippet}
	</SplitView>
</div>
