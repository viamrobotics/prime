<script lang="ts">
	import { mergeProps } from '@zag-js/svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import TreeNodes from './TreeNodes.svelte';
	import { useTree, useTreeNode } from './useTree.svelte.ts';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		children?: Snippet<[readonly unknown[]]>;
	}

	const { children, ...rest }: Props = $props();

	const tree = useTree();
	const current = useTreeNode();

	const attrs = $derived(
		mergeProps(
			tree.api.getBranchContentProps({ node: current.node, indexPath: current.indexPath }),
			rest
		)
	);

	const childNodes = $derived(tree.api.collection.getNodeChildren(current.node));
</script>

<div {...attrs}>
	{#if children}
		{@render children(childNodes)}
	{:else}
		<TreeNodes nodes={childNodes} indexPath={current.indexPath} />
	{/if}
</div>
