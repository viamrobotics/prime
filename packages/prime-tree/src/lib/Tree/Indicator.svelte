<!--
@component
A `span` that marks a node's state, with no visuals of its own. On a branch it carries `data-state` as `open` or `closed`. On a leaf it is hidden until the leaf is selected. It is `aria-hidden`. Place it inside [`Tree.BranchTrigger`](./BranchTrigger.svelte) or [`Tree.Item`](./Item.svelte).
-->
<script lang="ts">
	import { mergeProps } from '@zag-js/svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { markDisabled } from './disabled-node.ts';
	import { useTree, useTreeNode } from './useTree.svelte.ts';

	type Props = HTMLAttributes<HTMLSpanElement>;

	const { children, ...rest }: Props = $props();

	const tree = useTree();
	const current = useTreeNode();

	const attrs = $derived.by(() => {
		const nodeProps = { node: current.node, indexPath: current.indexPath };
		const indicatorProps = current.state.isBranch
			? tree.api.getBranchIndicatorProps(nodeProps)
			: tree.api.getItemIndicatorProps(nodeProps);

		return mergeProps(markDisabled(indicatorProps, current.state.disabled), rest);
	});
</script>

<span {...attrs}>
	{@render children?.()}
</span>
