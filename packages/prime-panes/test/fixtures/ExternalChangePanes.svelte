<script lang="ts">
	import '../../src/routes/layout.css';

	import { ids, layoutRoot } from '../layouts.ts';
	import type { PaneData } from '../layouts.ts';
	import type { LayoutNode } from '../../src/lib/layout.ts';
	import { movePane, removePane } from '../../src/lib/tree.ts';
	import { Panes } from '../../src/lib/Panes/panes.ts';

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
	<Panes bind:layout paneLabel={(node) => node.data.label} class="size-full">
		{#snippet pane(node)}
			<Panes.MoveTrigger
				aria-label="Move {node.data.label}"
				class="absolute top-2 left-2 size-6 border border-medium"
			>
				::
			</Panes.MoveTrigger>
			<section
				aria-label={node.data.label}
				data-testid="pane"
				data-pane-id={node.id}
				class="size-full"
			>
				{node.data.label}
			</section>
		{/snippet}
	</Panes>
</div>
