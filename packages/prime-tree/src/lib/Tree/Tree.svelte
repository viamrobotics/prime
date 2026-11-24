<!--
@component
The root of a tree view. It renders the `role="tree"` element, draws each node through the `node` snippet, and owns roving focus, keyboard navigation, selection, and expansion. The `aria-label` or `aria-labelledby` the type requires passes through to the tree element, along with every other attribute of a `div`.
-->
<script lang="ts" generics="TNode">
	import * as treeView from '@zag-js/tree-view';
	import { mergeProps, normalizeProps, useMachine } from '@zag-js/svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import TreeNodes from './TreeNodes.svelte';
	import type { TreeBranchClick } from './branch-click.ts';
	import { omitKeys } from './omit-keys.ts';
	import { isSelectAllKey } from './select-all.ts';
	import type { TreeAccessors } from './tree-accessors.ts';
	import type { TreeNodeState } from './tree-node-state.ts';
	import { provideTree } from './useTree.svelte.ts';

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

	type AccessibleName = { 'aria-label': string } | { 'aria-labelledby': string };

	let {
		nodes,
		expanded = $bindable(),
		selected = $bindable(),
		selectionMode = 'single',
		branchClick = 'toggle-and-select',
		node,
		children,
		getValue,
		getLabel,
		getChildren,
		getChildCount,
		isDisabled,
		...rest
	}: Props & AccessibleName = $props();

	const id = $props.id();

	const ROOT_VALUE = 'prime-tree-root';

	const rootNode = {} as TNode;
	const isRoot = (candidate: TNode) => candidate === rootNode;

	const collection = $derived(
		treeView.collection<TNode>({
			rootNode,
			nodeToValue: (candidate) => (isRoot(candidate) ? ROOT_VALUE : getValue(candidate)),
			nodeToString: (candidate) => (isRoot(candidate) ? '' : getLabel(candidate)),
			nodeToChildren: (candidate) => [
				...((isRoot(candidate) ? nodes : getChildren(candidate)) ?? [])
			],
			nodeToChildrenCount: getChildCount
				? (candidate) => (isRoot(candidate) ? nodes.length : getChildCount(candidate))
				: undefined,
			isNodeDisabled: (candidate) => !isRoot(candidate) && (isDisabled?.(candidate) ?? false)
		})
	);

	const isDisabledValue = (value: string) => {
		const found = collection.findNode(value);
		return found !== undefined && collection.getNodeDisabled(found);
	};

	// zag lists disabled nodes in ranges, select-all, and expand-all-siblings. A value already bound stays.
	const withoutNewlyDisabled = (next: string[], previous: readonly string[]) =>
		next.filter((value) => previous.includes(value) || !isDisabledValue(value));

	const service = useMachine(treeView.machine as treeView.Machine<TNode>, () => ({
		id,
		collection,
		selectionMode,
		expandOnClick: branchClick !== 'select',
		expandedValue: expanded ?? [],
		selectedValue: selected ?? [],
		onExpandedChange: (details: { expandedNodes: TNode[] }) => {
			// Expand-all-siblings (`*`) also lists leaf siblings, which have nothing to expand.
			const branches = details.expandedNodes.filter(collection.isBranchNode);
			expanded = withoutNewlyDisabled(branches.map(collection.getNodeValue), expanded ?? []);
		},
		onSelectionChange: (details: { selectedValue: string[] }) => {
			selected = withoutNewlyDisabled(details.selectedValue, selected ?? []);
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

	const selectAll = (event: KeyboardEvent) => {
		if (!isSelectAllKey(event)) return;
		event.preventDefault();
		if (selectionMode === 'multiple') api.setSelectedValue(collection.getValues());
	};

	const treeProps = $derived.by(() => {
		// zag names the tree by a default label and by a label element this package never renders.
		const zagProps = omitKeys(api.getTreeProps(), ['aria-label', 'aria-labelledby']);
		return mergeProps(zagProps, { onkeydown: selectAll }, rest);
	});
</script>

<div {...treeProps}>
	{#if children}
		{@render children(nodes)}
	{:else}
		<TreeNodes {nodes} indexPath={[]} />
	{/if}
</div>
