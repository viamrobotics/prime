<script lang="ts">
	import '../../src/routes/layout.css';

	import { layoutRoot } from '../layouts.ts';
	import type { PaneData } from '../layouts.ts';
	import type { LayoutNode } from '../../src/lib/layout.ts';
	import { Panes } from '../../src/lib/Panes/panes.ts';

	interface Props {
		withEmpty?: boolean;
	}

	const { withEmpty = true }: Props = $props();

	let layout = $state<LayoutNode<PaneData> | undefined>(structuredClone(layoutRoot));
</script>

<button type="button" onclick={() => (layout = undefined)}>Clear layout</button>
{#snippet pane(node: { id: string; data: PaneData })}
	<section aria-label={node.data.label} data-testid="pane" data-pane-id={node.id} class="size-full">
		{node.data.label}
	</section>
{/snippet}
{#snippet empty()}
	<p data-testid="empty">No panes</p>
{/snippet}
<div data-testid="frame" style="width: 800px; height: 600px">
	{#if withEmpty}
		<Panes bind:layout class="size-full" data-testid="root" {pane} {empty} />
	{:else}
		<Panes bind:layout class="size-full" data-testid="root" {pane} />
	{/if}
</div>
