<script lang="ts">
	import '../tailwind.css';

	import { Tree } from '../../src/lib/Tree/tree.ts';
	import { sampleAccessors, sampleNodes } from '../nodes.ts';
	import type { SampleNode } from '../nodes.ts';

	const asSampleNodes = (rows: readonly unknown[]) => rows as readonly SampleNode[];

	let expanded = $state<string[]>(['docs']);
	let selected = $state<string[]>([]);
</script>

<Tree aria-label="Sample" nodes={sampleNodes} bind:expanded bind:selected {...sampleAccessors}>
	{#snippet node(item, state)}
		{#if state.isBranch}
			<Tree.Branch aria-label={item.label}>
				<Tree.BranchControl>
					<Tree.BranchTrigger>
						<Tree.Indicator>&gt;</Tree.Indicator>
					</Tree.BranchTrigger>
					{item.label}
				</Tree.BranchControl>
				<Tree.BranchContent>
					{#snippet children(rows)}
						<Tree.IndentGuide data-testid="guide-{item.id}" />
						{#if rows.length === 0}
							<p data-testid="placeholder-{item.id}">Nothing here</p>
						{/if}
						<ul data-testid="rows-{item.id}">
							{#each asSampleNodes(rows).toReversed() as row, index (row.id)}
								<li><Tree.Row node={row} index={rows.length - 1 - index} /></li>
							{/each}
						</ul>
					{/snippet}
				</Tree.BranchContent>
			</Tree.Branch>
		{:else}
			<Tree.Item aria-label={item.label}>
				{item.label}
			</Tree.Item>
		{/if}
	{/snippet}
	{#snippet children(rows)}
		<div data-testid="root-rows">
			{#each asSampleNodes(rows) as row, index (row.id)}
				<Tree.Row node={row} {index} />
			{/each}
		</div>
	{/snippet}
</Tree>
