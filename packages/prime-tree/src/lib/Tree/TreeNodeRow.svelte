<script lang="ts" generics="TNode">
	import type { TreeNodeState } from './tree-node-state.ts';
	import { provideTreeNode, useTree } from './useTree.svelte.ts';

	interface Props {
		node: TNode;
		indexPath: number[];
		setSize: number;
	}

	const { node, indexPath, setSize }: Props = $props();

	const tree = useTree();

	const state = $derived.by((): TreeNodeState => {
		const nodeState = tree.api.getNodeState({ node, indexPath });
		return {
			value: nodeState.value,
			isBranch: nodeState.isBranch,
			expanded: nodeState.expanded,
			selected: nodeState.selected,
			focused: nodeState.focused,
			// zag's own state reads a `disabled` field off the node, not `isNodeDisabled`.
			disabled: tree.api.collection.getNodeDisabled(node),
			depth: nodeState.depth,
			indexPath: nodeState.indexPath
		};
	});

	provideTreeNode({
		get node() {
			return node;
		},
		get indexPath() {
			return indexPath;
		},
		get setSize() {
			return setSize;
		},
		get state() {
			return state;
		}
	});
</script>

{@render tree.node(node, state)}
