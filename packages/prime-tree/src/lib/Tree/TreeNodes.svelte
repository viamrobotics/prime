<script lang="ts" generics="TNode">
	import TreeNodeRow from './TreeNodeRow.svelte';
	import { useTree } from './useTree.svelte.ts';

	interface Props {
		nodes: readonly TNode[];
		indexPath: number[];
	}

	const { nodes, indexPath }: Props = $props();

	const tree = useTree();
</script>

{#each nodes as child, index (tree.api.collection.getNodeValue(child))}
	<TreeNodeRow node={child} indexPath={[...indexPath, index]} setSize={nodes.length} />
{/each}
