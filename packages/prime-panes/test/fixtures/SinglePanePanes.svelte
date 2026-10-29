<script lang="ts">
	import '../tailwind.css';

	import type { PaneData } from '../layouts.ts';
	import type { LayoutNode } from '../../src/lib/layout.ts';
	import { Panes } from '../../src/lib/Panes/panes.ts';

	let layout = $state<LayoutNode<PaneData> | undefined>({
		type: 'pane',
		id: 'only',
		data: { label: 'Only' }
	});
</script>

<div data-testid="frame" style="width: 800px; height: 600px">
	<Panes bind:layout paneLabel={(node) => node.data.label} class="size-full">
		{#snippet pane(node)}
			<Panes.DragTrigger>
				<Panes.MoveTrigger aria-label="Move {node.data.label}" class="absolute top-2 left-2 size-6">
					::
				</Panes.MoveTrigger>
			</Panes.DragTrigger>
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
