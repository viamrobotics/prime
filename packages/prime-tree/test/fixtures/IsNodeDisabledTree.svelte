<script lang="ts">
	import '../tailwind.css';

	import { Tree } from '../../src/lib/Tree/tree.ts';

	interface LockableNode {
		key: string;
		name: string;
		kids?: LockableNode[];
		locked?: boolean;
	}

	interface Props {
		selectionMode?: 'single' | 'multiple';
	}

	const { selectionMode }: Props = $props();

	const nodes: LockableNode[] = [
		{ key: 'alpha', name: 'Alpha' },
		{ key: 'bravo', name: 'Bravo', locked: true },
		{ key: 'charlie', name: 'Charlie', locked: true, kids: [{ key: 'child', name: 'Child' }] }
	];

	let expanded = $state<string[]>([]);
	let selected = $state<string[]>([]);

	export function getExpanded() {
		return $state.snapshot(expanded);
	}

	export function getSelected() {
		return $state.snapshot(selected);
	}
</script>

<Tree
	aria-label="Lockable"
	{nodes}
	bind:expanded
	bind:selected
	{selectionMode}
	nodeToValue={(node) => node.key}
	nodeToString={(node) => node.name}
	nodeToChildren={(node) => node.kids}
	isNodeDisabled={(node) => node.locked ?? false}
>
	{#snippet node(item, state)}
		{#if state.isBranch}
			<Tree.Branch aria-label={item.name} data-state-disabled={state.disabled}>
				<Tree.BranchControl>
					<Tree.BranchTrigger aria-label="Toggle {item.name}">+</Tree.BranchTrigger>
					{item.name}
				</Tree.BranchControl>
				<Tree.BranchContent />
			</Tree.Branch>
		{:else}
			<Tree.Item aria-label={item.name} data-state-disabled={state.disabled}>{item.name}</Tree.Item>
		{/if}
	{/snippet}
</Tree>
