<script lang="ts">
	import { mergeProps } from '@zag-js/svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { useTree, useTreeNode } from './useTree.svelte.ts';

	type Props = HTMLAttributes<HTMLSpanElement>;

	const { children, ...rest }: Props = $props();

	const tree = useTree();
	const current = useTreeNode();

	const attrs = $derived(
		mergeProps(
			tree.api.getBranchTriggerProps({ node: current.node, indexPath: current.indexPath }),
			rest
		)
	);
</script>

<span {...attrs}>
	{@render children?.()}
</span>
