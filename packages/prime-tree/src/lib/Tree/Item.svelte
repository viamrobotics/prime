<script lang="ts">
	import { mergeProps } from '@zag-js/svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { deferFocus } from './defer-focus.ts';
	import { useTree, useTreeNode } from './useTree.svelte.ts';

	type Props = HTMLAttributes<HTMLDivElement>;

	const { children, ...rest }: Props = $props();

	const tree = useTree();
	const current = useTreeNode();

	const attrs = $derived(
		mergeProps(
			deferFocus(tree.api.getItemProps({ node: current.node, indexPath: current.indexPath })),
			{
				'aria-posinset': current.indexPath.at(-1)! + 1,
				'aria-setsize': current.setSize
			},
			{ 'aria-current': undefined },
			rest
		)
	);
</script>

<div {...attrs}>
	{@render children?.()}
</div>
