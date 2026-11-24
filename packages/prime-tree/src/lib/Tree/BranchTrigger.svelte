<!--
@component
The expand and collapse affordance of a branch row. It toggles the branch on every click, whatever `branchClick` says, and renders a `span`. Place it inside [`Tree.BranchControl`](./BranchControl.svelte), around a [`Tree.Indicator`](./Indicator.svelte).
-->
<script lang="ts">
	import { mergeProps } from '@zag-js/svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { disableActivation } from './disabled-node.ts';
	import { useTree, useTreeNode } from './useTree.svelte.ts';

	type Props = HTMLAttributes<HTMLSpanElement>;

	const { children, ...rest }: Props = $props();

	const tree = useTree();
	const current = useTreeNode();

	const attrs = $derived(
		mergeProps(
			disableActivation(
				tree.api.getBranchTriggerProps({ node: current.node, indexPath: current.indexPath }),
				current.state.disabled
			),
			rest
		)
	);
</script>

<span {...attrs}>
	{@render children?.()}
</span>
