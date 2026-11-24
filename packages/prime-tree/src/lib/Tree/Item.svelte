<script lang="ts">
	import { mergeProps } from '@zag-js/svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { deferFocus } from './defer-focus.ts';
	import { disableActivation } from './disabled-node.ts';
	import { omitKeys } from './omit-keys.ts';
	import { useTree, useTreeNode } from './useTree.svelte.ts';

	type Props = HTMLAttributes<HTMLDivElement>;

	const { children, ...rest }: Props = $props();

	const tree = useTree();
	const current = useTreeNode();

	const attrs = $derived(
		mergeProps(
			disableActivation(
				// aria-selected carries the selection. aria-current would announce a navigation target.
				omitKeys(
					deferFocus(tree.api.getItemProps({ node: current.node, indexPath: current.indexPath })),
					['aria-current']
				),
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
