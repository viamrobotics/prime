<script lang="ts">
	import '../tailwind.css';

	import { Tree } from '../../src/lib/Tree/tree.ts';
	import { sampleAccessors, sampleNodes } from '../nodes.ts';

	interface Props {
		allowExpand?: boolean;
		allowSelect?: boolean;
	}

	const { allowExpand = true, allowSelect = true }: Props = $props();

	let expanded = $state<string[]>([]);
	let selected = $state<string[]>([]);
	let attempts = $state(0);

	export function getExpanded() {
		return $state.snapshot(expanded);
	}

	export function getSelected() {
		return $state.snapshot(selected);
	}
</script>

<span data-testid="attempts">{attempts}</span>

<Tree
	aria-label="Sample"
	nodes={sampleNodes}
	bind:expanded={
		() => expanded,
		(next) => {
			attempts += 1;
			if (allowExpand) expanded = next;
		}
	}
	bind:selected={
		() => selected,
		(next) => {
			attempts += 1;
			if (allowSelect) selected = next;
		}
	}
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
