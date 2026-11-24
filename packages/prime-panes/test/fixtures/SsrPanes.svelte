<script lang="ts">
	import type { LayoutNode } from '../../src/lib/layout.ts';
	import { Panes } from '../../src/lib/Panes/panes.ts';

	interface PaneData {
		label: string;
	}

	let layout = $state<LayoutNode<PaneData> | undefined>({
		type: 'float',
		id: 'ssr-float',
		base: {
			type: 'split',
			id: 'ssr-split',
			direction: 'row',
			ratio: 0.5,
			first: {
				type: 'stack',
				id: 'ssr-stack',
				activeId: 'ssr-tab-one',
				panes: [
					{ type: 'pane', id: 'ssr-tab-one', data: { label: 'Tab one' } },
					{ type: 'pane', id: 'ssr-tab-two', data: { label: 'Tab two' } }
				]
			},
			second: { type: 'pane', id: 'ssr-solo', data: { label: 'Solo pane' } }
		},
		floats: [
			{
				id: 'ssr-entry',
				rect: { x: 10, y: 10, width: 200, height: 120 },
				content: { type: 'pane', id: 'ssr-window', data: { label: 'Window pane' } }
			}
		]
	});
</script>

<div style="width: 800px; height: 600px">
	<Panes bind:layout paneLabel={(node) => node.data.label} class="size-full">
		{#snippet pane(node)}
			{@const label = node.data.label}
			<Panes.DragTrigger>
				<header>
					<Panes.TabList aria-label="Tabs of {label}">
						<Panes.TabListDropRegion />
					</Panes.TabList>
					<Panes.MoveTrigger aria-label="Move {label}">Move</Panes.MoveTrigger>
				</header>
			</Panes.DragTrigger>
			<Panes.PaneBody>Body of {label}</Panes.PaneBody>
		{/snippet}
	</Panes>
</div>
