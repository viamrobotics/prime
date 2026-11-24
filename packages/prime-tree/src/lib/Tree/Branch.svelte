<!--
@component
The `role="treeitem"` element of a node that has children, and the outermost part of a branch row. Place it first inside the `node` snippet, with [`Tree.BranchControl`](./BranchControl.svelte) and [`Tree.BranchContent`](./BranchContent.svelte) inside it. It sets the `--depth` custom property, which a consumer reads to indent the row.
-->
<script lang="ts">
	import { mergeProps } from '@zag-js/svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { disableRow } from './disabled-node.ts';
	import { useTree, useTreeNode } from './useTree.svelte.ts';

	type Props = HTMLAttributes<HTMLDivElement>;

	const { children, ...rest }: Props = $props();

	const tree = useTree();
	const current = useTreeNode();

	const attrs = $derived(
		mergeProps(
			disableRow(
				tree.api.getBranchProps({ node: current.node, indexPath: current.indexPath }),
				current.state.disabled
			),
			{
				'aria-posinset': current.indexPath.at(-1)! + 1,
				'aria-setsize': current.setSize
			},
			rest
		)
	);
</script>

<div {...attrs}>
	{@render children?.()}
</div>
