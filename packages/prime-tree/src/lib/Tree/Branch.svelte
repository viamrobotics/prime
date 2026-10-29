<script lang="ts">
	import { mergeProps } from '@zag-js/svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { useTree, useTreeNode } from './useTree.svelte.ts';

	type Props = HTMLAttributes<HTMLDivElement>;

	const { children, ...rest }: Props = $props();

	const tree = useTree();
	const current = useTreeNode();

	const attrs = $derived(
		mergeProps(
			tree.api.getBranchProps({ node: current.node, indexPath: current.indexPath }),
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
