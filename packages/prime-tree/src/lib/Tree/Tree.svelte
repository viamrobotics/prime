<script lang="ts" generics="TNode">
	import * as treeView from '@zag-js/tree-view';
	import { mergeProps, normalizeProps, useMachine } from '@zag-js/svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import TreeNodes from './TreeNodes.svelte';
	import type { TreeBranchClick } from './branch-click.ts';
	import type { TreeAccessors } from './tree-accessors.ts';
	import type { TreeNodeState } from './tree-node-state.ts';
	import { provideTree } from './useTree.svelte.ts';

	/**
	 * Renders `nodes` as a tree with roving focus and keyboard navigation. Name the tree with
	 * `aria-label` or `aria-labelledby`, which pass through to the tree element.
	 */
	interface Props extends TreeAccessors<TNode>, Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		/** The root nodes, the single source of truth for what the tree renders. */
		nodes: readonly TNode[];
		/** The values of the expanded branches. Bind it, or pass a function binding to veto a change. */
		expanded?: string[];
		/** The values of the selected nodes. Bind it, or pass a function binding to veto a change. */
		selected?: string[];
		/** Whether one node or several can be selected at a time. */
		selectionMode?: 'single' | 'multiple';
		/** What a click, Enter, or Space on a branch row does. The trigger always toggles. */
		branchClick?: TreeBranchClick;
		/** Renders one node. Compose it from the `Tree` parts. */
		node: Snippet<[TNode, TreeNodeState]>;
		/**
		 * Renders the root rows in place of the default, one `Tree.Row` per node, so a consumer can
		 * window or otherwise arrange them. Receives the root nodes.
		 */
		children?: Snippet<[readonly TNode[]]>;
	}

	let {
		nodes,
		expanded = $bindable([]),
		selected = $bindable([]),
		selectionMode = 'single',
		branchClick = 'toggle-and-select',
		node,
		children,
		nodeToValue,
		nodeToString,
		nodeToChildren,
		nodeToChildrenCount,
		isNodeDisabled,
		...rest
	}: Props = $props();

	const id = $props.id();

	const rootNode = {} as TNode;
	const isRoot = (candidate: TNode) => candidate === rootNode;

	const collection = $derived(
		treeView.collection<TNode>({
			rootNode,
			nodeToValue: (candidate) => (isRoot(candidate) ? 'prime-tree-root' : nodeToValue(candidate)),
			nodeToString: (candidate) => (isRoot(candidate) ? '' : nodeToString(candidate)),
			nodeToChildren: (candidate) => [
				...((isRoot(candidate) ? nodes : nodeToChildren(candidate)) ?? [])
			],
			nodeToChildrenCount: nodeToChildrenCount
				? (candidate) => (isRoot(candidate) ? nodes.length : nodeToChildrenCount(candidate))
				: undefined,
			isNodeDisabled: (candidate) => !isRoot(candidate) && (isNodeDisabled?.(candidate) ?? false)
		})
	);

	const service = useMachine(treeView.machine as treeView.Machine<TNode>, () => ({
		id,
		collection,
		selectionMode,
		expandOnClick: branchClick !== 'select',
		expandedValue: expanded,
		selectedValue: selected,
		onExpandedChange: (details: { expandedNodes: TNode[] }) => {
			// Expand-all-siblings (`*`) also lists leaf siblings, which have nothing to expand.
			expanded = details.expandedNodes.filter(collection.isBranchNode).map(collection.getNodeValue);
		},
		onSelectionChange: (details: { selectedValue: string[] }) => {
			selected = details.selectedValue;
		}
	}));

	const api = $derived(treeView.connect(service, normalizeProps));

	provideTree<TNode>({
		get api() {
			return api;
		},
		get node() {
			return node;
		},
		get branchClick() {
			return branchClick;
		}
	});

	// zag labels the tree by an element this component never renders, so its label must not shadow the consumer's.
	const treeProps = $derived(
		mergeProps(api.getTreeProps(), { 'aria-labelledby': undefined, 'aria-label': undefined }, rest)
	);
</script>

<div {...treeProps}>
	{#if children}
		{@render children(nodes)}
	{:else}
		<TreeNodes {nodes} indexPath={[]} />
	{/if}
</div>
