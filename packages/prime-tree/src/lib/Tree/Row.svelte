<script lang="ts" generics="TNode">
	import TreeNodeRow from './TreeNodeRow.svelte';
	import { useParentTreeNode, useTree } from './useTree.svelte.ts';

	interface Props {
		node: TNode;
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
