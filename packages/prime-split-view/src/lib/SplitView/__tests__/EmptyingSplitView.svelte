<script lang="ts">
	import '../../../routes/layout.css';

	import { layoutRoot } from '../../__tests__/layout-fixture.ts';
	import type { PaneData } from '../../__tests__/layout-fixture.ts';
	import type { LayoutNode } from '../../layout.ts';
	import SplitView from '../SplitView.svelte';

	interface Props {
		/** Renders an `empty` snippet when true. */
		withEmpty?: boolean;
	}

	const { withEmpty = true }: Props = $props();

	let layout = $state<LayoutNode<PaneData> | undefined>(structuredClone(layoutRoot));
</script>

<button type="button" onclick={() => (layout = undefined)}>Clear layout</button>
{#snippet pane(node: { id: string; data: PaneData })}
	<div data-testid="pane" data-pane-id={node.id} class="size-full">{node.data.label}</div>
{/snippet}
{#snippet empty()}
	<p data-testid="empty">No panes</p>
{/snippet}
<div data-testid="frame" style="width: 800px; height: 600px">
	{#if withEmpty}
		<SplitView bind:layout class="size-full" data-testid="root" {pane} {empty} />
	{:else}
		<SplitView bind:layout class="size-full" data-testid="root" {pane} />
	{/if}
</div>
