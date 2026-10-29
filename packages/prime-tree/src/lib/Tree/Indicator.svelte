<script lang="ts">
	import { mergeProps } from '@zag-js/svelte';
	import type { HTMLAttributes } from 'svelte/elements';

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

		return mergeProps(indicatorProps, rest);
	});
</script>

<span {...attrs}>
	{@render children?.()}
</span>
