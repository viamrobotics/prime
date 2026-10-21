<script lang="ts">
	import '../../../routes/layout.css';

	import type { PaneData } from '../../__tests__/layout-fixture.ts';
	import type { LayoutNode } from '../../layout.ts';
	import SplitView from '../SplitView.svelte';

	interface Props {
		layout: LayoutNode<PaneData> | undefined;
	}

	const { layout }: Props = $props();
</script>

<div data-testid="frame" style="width: 800px; height: 600px">
	<SplitView {layout}>
		{#snippet pane(node)}
			<div data-testid="pane" data-pane-id={node.id}>{node.data.label}</div>
		{/snippet}
		{#snippet empty()}
			<p data-testid="empty">No panes</p>
		{/snippet}
	</SplitView>
</div>
