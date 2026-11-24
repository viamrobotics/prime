<!--
@component
Renders one node through the `node` snippet, and no element of its own. Use it in a `children` snippet of [`Tree`](./Tree.svelte) or [`Tree.BranchContent`](./BranchContent.svelte) to arrange the rows yourself, as when windowing a long list. Pass the node and its index among its siblings.
-->
<script lang="ts" generics="TNode">
	import TreeNodeRow from './TreeNodeRow.svelte';
	import { useParentTreeNode, useTree } from './useTree.svelte.ts';

	interface Props {
		/** The node to render. */
		node: TNode;
		/** The node's position among its siblings, from zero. */
		index: number;
	}

	const { node, index }: Props = $props();

	const tree = useTree();
	const parent = useParentTreeNode();

	const indexPath = $derived([...(parent?.indexPath ?? []), index]);
	const setSize = $derived(
		tree.api.collection.getNodeChildren(parent ? parent.node : tree.api.collection.rootNode).length
	);
</script>

<TreeNodeRow {node} {indexPath} {setSize} />
