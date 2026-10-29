<script lang="ts">
	import '../../src/routes/layout.css';

	import { Tree } from '../../src/lib/Tree/tree.ts';
	import { sampleAccessors, sampleNodes } from '../nodes.ts';

	let expanded = $state<string[]>([]);
	let selected = $state<string[]>([]);

	export function getExpanded() {
		return $state.snapshot(expanded);
	}

	export function getSelected() {
		return $state.snapshot(selected);
	}
</script>

<button type="button" onclick={() => (expanded = ['docs'])}>Expand Docs</button>
<button type="button" onclick={() => (selected = ['notes'])}>Select Notes</button>

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
				<Tree.BranchContent />
			</Tree.Branch>
		{:else}
			<Tree.Item aria-label={item.label}>
				{item.label}
			</Tree.Item>
		{/if}
	{/snippet}
</Tree>
