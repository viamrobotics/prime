<script lang="ts">
	import '../../../routes/layout.css';

	import { ids, layoutRoot } from '../../__tests__/layout-fixture.ts';
	import type { PaneData } from '../../__tests__/layout-fixture.ts';
	import type { LayoutNode } from '../../layout.ts';
	import { movePane, removePane } from '../../tree.ts';
	import SplitView from '../SplitView.svelte';

	let layout = $state<LayoutNode<PaneData> | undefined>(structuredClone(layoutRoot));

	export function relocateCamera() {
		layout = movePane(layout, ids.mycam, ids.mycam2, 'row', 'second', 'relocated-split');
	}

	export function removeCamera() {
		layout = removePane(layout, ids.mycam);
	}

	export async function removeAndRestoreCamera() {
		const before = layout;
		layout = removePane(layout, ids.mycam);
		await Promise.resolve();
		layout = before;
	}
</script>

<div data-testid="frame" style="width: 800px; height: 600px">
	<SplitView bind:layout paneLabel={(node) => node.data.label} class="size-full">
		{#snippet pane(node, controls)}
			<button
				type="button"
				aria-label="Move {node.data.label}"
				class="absolute top-2 left-2 size-6 border border-medium"
				{@attach controls.moveTrigger}
			>
				::
			</button>
			<div data-testid="pane" data-pane-id={node.id} class="size-full">{node.data.label}</div>
		{/snippet}
	</SplitView>
</div>
