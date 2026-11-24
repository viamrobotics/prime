<script lang="ts">
	import '../tailwind.css';

	import { untrack } from 'svelte';

	import { Tree } from '../../src/lib/Tree/tree.ts';
	import { sampleAccessors, sampleNodes } from '../nodes.ts';

	interface Props {
		initialExpanded?: string[];
		initialSelected?: string[];
		currentValue?: string;
	}

	const { initialExpanded = [], initialSelected = [], currentValue }: Props = $props();

	let expanded = $state<string[]>(untrack(() => [...initialExpanded]));
	let selected = $state<string[]>(untrack(() => [...initialSelected]));
</script>

<h2 id="parts-heading">Files</h2>

<Tree
	aria-labelledby="parts-heading"
	class={['tree-root', { 'tree-root-active': true, 'tree-root-idle': false }]}
	dir="rtl"
	data-testid="tree"
	nodes={sampleNodes}
	bind:expanded
	bind:selected
	{...sampleAccessors}
>
	{#snippet node(item, state)}
		{#if state.isBranch}
			<Tree.Branch aria-label={item.label} dir="rtl" data-testid="branch-{item.id}">
				<Tree.BranchControl dir="rtl" data-testid="branch-control-{item.id}">
					<Tree.BranchTrigger dir="rtl" data-testid="branch-trigger-{item.id}">
						<Tree.Indicator data-testid="indicator-{item.id}">&gt;</Tree.Indicator>
					</Tree.BranchTrigger>
					{item.label}
				</Tree.BranchControl>
				<Tree.BranchContent dir="rtl" data-testid="branch-content-{item.id}" />
			</Tree.Branch>
		{:else}
			<Tree.Item
				aria-label={item.label}
				aria-current={item.id === currentValue ? 'page' : undefined}
				dir="rtl"
				data-testid="item-{item.id}"
			>
				<Tree.Indicator data-testid="indicator-{item.id}">*</Tree.Indicator>
				{item.label}
			</Tree.Item>
		{/if}
	{/snippet}
</Tree>
