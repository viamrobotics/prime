<script lang="ts">
	import '../../../routes/layout.css';

	import type { PaneData } from '../../__tests__/layout-fixture.ts';
	import type { LayoutNode } from '../../layout.ts';
	import { SplitView } from '../split-view.ts';

	let layout = $state<LayoutNode<PaneData> | undefined>({
		type: 'pane',
		id: 'only',
		data: { label: 'Only' }
	});
</script>

<div data-testid="frame" style="width: 800px; height: 600px">
	<SplitView bind:layout paneLabel={(node) => node.data.label} class="size-full">
		{#snippet pane(node)}
			<SplitView.DragTrigger>
				<SplitView.MoveTrigger
					aria-label="Move {node.data.label}"
					class="absolute top-2 left-2 size-6"
				>
					::
				</SplitView.MoveTrigger>
			</SplitView.DragTrigger>
			<div data-testid="pane" data-pane-id={node.id} class="size-full">{node.data.label}</div>
		{/snippet}
	</SplitView>
</div>
