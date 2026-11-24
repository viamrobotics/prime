<!--
@component
The `role="group"` element that holds a branch's children. By default it renders one row per child node, and a `children` snippet that receives the child nodes replaces them so the consumer arranges the rows, with [`Tree.Row`](./Row.svelte). Place it inside [`Tree.Branch`](./Branch.svelte), after the control.
-->
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
