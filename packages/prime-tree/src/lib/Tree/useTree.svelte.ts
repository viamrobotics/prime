import { getContext, setContext } from 'svelte';
import type { Snippet } from 'svelte';
import type { PropTypes } from '@zag-js/svelte';
import type { Api } from '@zag-js/tree-view';

import type { TreeBranchClick } from './branch-click.ts';
import type { TreeNodeState } from './tree-node-state.ts';

const TREE_KEY = Symbol('prime-tree');
const NODE_KEY = Symbol('prime-tree-node');

export interface TreeContext<TNode> {
	readonly api: Api<PropTypes, TNode>;
	readonly node: Snippet<[TNode, TreeNodeState]>;
	readonly branchClick: TreeBranchClick;
}

export interface TreeNodeContext<TNode> {
	readonly node: TNode;
	readonly indexPath: number[];
	/** How many siblings the node has, itself included. The parts' `aria-setsize`. */
	readonly setSize: number;
	readonly state: TreeNodeState;
}

export function provideTree<TNode>(context: TreeContext<TNode>): TreeContext<TNode> {
	return setContext(TREE_KEY, context);
}

export function useTree(): TreeContext<unknown> {
	const context = getContext<TreeContext<unknown> | undefined>(TREE_KEY);
	if (!context) throw new Error('Tree parts must be rendered inside a Tree.');
	return context;
}

export function provideTreeNode<TNode>(context: TreeNodeContext<TNode>): TreeNodeContext<TNode> {
	return setContext(NODE_KEY, context);
}

export function useTreeNode(): TreeNodeContext<unknown> {
	const context = useParentTreeNode();
	if (!context) throw new Error('Tree parts must be rendered inside the node snippet.');
	return context;
}

export function useParentTreeNode(): TreeNodeContext<unknown> | undefined {
	return getContext<TreeNodeContext<unknown> | undefined>(NODE_KEY);
}
