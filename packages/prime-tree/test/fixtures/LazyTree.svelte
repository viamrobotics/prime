<script lang="ts">
	import '../tailwind.css';

	import { untrack } from 'svelte';

	import { Tree } from '../../src/lib/Tree/tree.ts';

	interface LazyNode {
		id: string;
		label: string;
		childCount?: number;
		children?: LazyNode[];
	}

	interface Props {
		initialExpanded?: string[];
	}

	const { initialExpanded = [] }: Props = $props();

	let nodes = $state<LazyNode[]>([
		{ id: 'remote', label: 'Remote', childCount: 2 },
		{ id: 'notes', label: 'Notes' }
	]);
	let expanded = $state<string[]>(untrack(() => [...initialExpanded]));

	const loadRemote = () => {
		nodes[0]!.children = [
			{ id: 'alpha', label: 'Alpha' },
			{ id: 'beta', label: 'Beta' }
		];
	};
</script>

<button type="button" onclick={loadRemote}>Load Remote</button>

<Tree
	aria-label="Lazy"
	{nodes}
	bind:expanded
	getValue={(node) => node.id}
	getLabel={(node) => node.label}
	getChildren={(node) => node.children}
	getChildCount={(node) => node.childCount}
>
	{#snippet node(item, state)}
		{#if state.isBranch}
			<Tree.Branch aria-label={item.label}>
				<Tree.BranchControl>{item.label}</Tree.BranchControl>
				<Tree.BranchContent />
			</Tree.Branch>
		{:else}
			<Tree.Item aria-label={item.label}>{item.label}</Tree.Item>
		{/if}
	{/snippet}
</Tree>
