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
