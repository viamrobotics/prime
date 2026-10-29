<script lang="ts">
	import '../../src/routes/layout.css';

	import { untrack } from 'svelte';

	import { Tree } from '../../src/lib/Tree/tree.ts';
	import type { TreeBranchClick } from '../../src/lib/Tree/branch-click.ts';
	import { sampleAccessors, sampleNodes } from '../nodes.ts';

	interface Props {
		selectionMode?: 'single' | 'multiple';
		branchClick?: TreeBranchClick;
		initialExpanded?: string[];
	}

	const { selectionMode, branchClick, initialExpanded = [] }: Props = $props();

	let expanded = $state<string[]>(untrack(() => [...initialExpanded]));
	let selected = $state<string[]>([]);

	export function getExpanded() {
		return $state.snapshot(expanded);
	}

	export function getSelected() {
		return $state.snapshot(selected);
	}
</script>

<Tree
	aria-label="Sample"
	nodes={sampleNodes}
	bind:expanded
	bind:selected
	{selectionMode}
	{branchClick}
	{...sampleAccessors}
>
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
