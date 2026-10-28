import type { LayoutNode, PaneNode, StackNode } from './layout.ts';
import { splitAdapter } from './SplitPanes/split-adapter.ts';
import { stackAdapter } from './stack-adapter.ts';

export type ContainerNode<TData> = Exclude<LayoutNode<TData>, PaneNode<TData>>;

type ContainerKind = ContainerNode<unknown>['type'];

type ContainerOfKind<TData, TKind extends ContainerKind> = Extract<
	ContainerNode<TData>,
	{ type: TKind }
>;

export type Slot<TData> = PaneNode<TData> | StackNode<TData>;

export interface ContainerAdapter<TKind extends ContainerKind> {
	// In a fixed order that `index` arguments refer to.
	children<TData>(node: ContainerOfKind<TData, TKind>): readonly LayoutNode<TData>[];
	// Returns `node` itself when every child is the same reference.
	withChildren<TData>(
		node: ContainerOfKind<TData, TKind>,
		children: readonly LayoutNode<TData>[]
	): ContainerNode<TData>;
	// A split collapses to its other child, a stack left with one pane to that pane. `undefined` when the node leaves too.
	removeChild<TData>(
		node: ContainerOfKind<TData, TKind>,
		index: number
	): LayoutNode<TData> | undefined;
}

const ADAPTERS: { [TKind in ContainerKind]: ContainerAdapter<TKind> } = {
	split: splitAdapter,
	stack: stackAdapter
};

// The registry pairs each kind with its own adapter, so the adapter at `node.type` accepts `node`.
function adapterFor<TData>(node: ContainerNode<TData>): ContainerAdapter<ContainerKind> {
	return ADAPTERS[node.type] as ContainerAdapter<ContainerKind>;
}

export function isContainer<TData>(node: LayoutNode<TData>): node is ContainerNode<TData> {
	return node.type !== 'pane';
}

export function isSlot<TData>(node: LayoutNode<TData>): node is Slot<TData> {
	return node.type === 'pane' || node.type === 'stack';
}

export function childrenOf<TData>(node: LayoutNode<TData>): readonly LayoutNode<TData>[] {
	return isContainer(node) ? adapterFor(node).children(node) : [];
}

// Returns `node` itself when `child` is already at `index`.
export function replaceChild<TData>(
	node: ContainerNode<TData>,
	index: number,
	child: LayoutNode<TData>
): ContainerNode<TData> {
	const adapter = adapterFor(node);
	return adapter.withChildren(node, adapter.children(node).with(index, child));
}

export function withChildren<TData>(
	node: ContainerNode<TData>,
	children: readonly LayoutNode<TData>[]
): ContainerNode<TData> {
	return adapterFor(node).withChildren(node, children);
}

export function removeChild<TData>(
	node: ContainerNode<TData>,
	index: number
): LayoutNode<TData> | undefined {
	return adapterFor(node).removeChild(node, index);
}
