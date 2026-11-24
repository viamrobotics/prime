<script lang="ts">
	import '../tailwind.css';

	import { createStackLayout } from '../layouts.ts';
	import type { LayoutNode } from '../../src/lib/layout.ts';
	import type { PaneData } from '../layouts.ts';
	import { Panes } from '../../src/lib/Panes/panes.ts';

	interface Props {
		hasTabList: boolean;
	}

	const { hasTabList }: Props = $props();

	let layout = $state<LayoutNode<PaneData> | undefined>(createStackLayout());
</script>

<div style="width: 800px; height: 600px">
	<Panes bind:layout paneLabel={(node) => node.data.label} class="size-full">
		{#snippet pane(node)}
			{#if hasTabList}
				<Panes.TabList aria-label="Tabs of {node.id}" />
			{/if}
			<Panes.PaneBody id="body-{node.id}" data-pane-body={node.id}>
				{node.data.label}
			</Panes.PaneBody>
		{/snippet}
	</Panes>
</div>
