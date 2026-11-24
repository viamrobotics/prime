<!--
@component
A `span` a consumer styles as the indentation guide of a branch's children. It is `aria-hidden` and draws nothing by itself. Place it inside [`Tree.BranchContent`](./BranchContent.svelte), usually in its `children` snippet.
-->
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
			tree.api.getBranchIndentGuideProps({ node: current.node, indexPath: current.indexPath }),
			{ 'aria-hidden': true },
			rest
		)
	);
</script>

<span {...attrs}>
	{@render children?.()}
</span>
