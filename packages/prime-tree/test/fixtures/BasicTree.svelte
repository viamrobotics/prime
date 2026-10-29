<script lang="ts">
	import '../tailwind.css';

	import { Tree } from '../../src/lib/Tree/tree.ts';
	import { sampleAccessors, sampleNodes } from '../nodes.ts';
	import type { SampleNode } from '../nodes.ts';

	let nodes = $state<SampleNode[]>(structuredClone(sampleNodes));
	let expanded = $state<string[]>([]);
	let selected = $state<string[]>([]);

	export function getExpanded() {
		return $state.snapshot(expanded);
	}

	export function getSelected() {
		return $state.snapshot(selected);
	}

	const appendToDocs = () => {
		nodes[0]?.children?.push({ id: 'added', label: 'Added' });
	};
</script>

<button type="button" onclick={appendToDocs}>Append to Docs</button>

<Tree aria-label="Sample" {nodes} bind:expanded bind:selected {...sampleAccessors}>
	{#snippet node(item, state)}
		{#if state.isBranch}
			<Tree.Branch aria-label={item.label} data-depth={state.depth} data-is-branch={state.isBranch}>
				<Tree.BranchControl>
					<Tree.BranchTrigger>
						<Tree.Indicator>&gt;</Tree.Indicator>
					</Tree.BranchTrigger>
					{item.label}
				</Tree.BranchControl>
				<Tree.BranchContent />
			</Tree.Branch>
		{:else}
			<Tree.Item aria-label={item.label} data-depth={state.depth} data-is-branch={state.isBranch}>
				{item.label}
			</Tree.Item>
		{/if}
	{/snippet}
</Tree>
