<script lang="ts">
	import { SplitView } from '../lib/index.ts';
	import type { LayoutNode } from '../lib/index.ts';

	let layout = $state<LayoutNode<{ label: string }> | undefined>({
		type: 'split',
		id: 'root',
		direction: 'column',
		ratio: 0.3,
		first: { type: 'pane', id: 'camera', data: { label: 'Camera' } },
		second: {
			type: 'split',
			id: 'middle',
			direction: 'row',
			ratio: 0.6,
			first: { type: 'pane', id: 'time-series', data: { label: 'Time series' } },
			second: {
				type: 'split',
				id: 'lower',
				direction: 'column',
				ratio: 0.5,
				first: { type: 'pane', id: 'stat', data: { label: 'Sensor stat' } },
				second: { type: 'pane', id: 'camera-2', data: { label: 'Camera 2' } }
			}
		}
	});
</script>

<div class="flex h-screen">
	<SplitView bind:layout class="min-w-0 flex-1">
		{#snippet pane(node)}
			<div
				class="flex size-full items-center justify-center border border-light bg-white text-sm text-default"
			>
				{node.data.label}
			</div>
		{/snippet}
	</SplitView>
	<pre
		class="w-96 shrink-0 overflow-auto border-l border-light bg-light p-3 text-xs text-default">{JSON.stringify(
			layout,
			null,
			2
		)}</pre>
</div>
