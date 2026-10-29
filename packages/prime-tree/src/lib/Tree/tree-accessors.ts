/**
 * How `Tree` reads a consumer's node type. The tree never inspects a node directly, so any
 * shape works as long as these four functions describe it.
 */
export interface TreeAccessors<TNode> {
	/** A stable, unique id for the node. `expanded` and `selected` hold these values. */
	nodeToValue: (node: TNode) => string;
	/** The node's label, used for type-ahead. Rendering the label is the snippet's job. */
	nodeToString: (node: TNode) => string;
	/** The node's children. `undefined` or an empty array makes the node a leaf. */
	nodeToChildren: (node: TNode) => readonly TNode[] | undefined;
	/**
	 * How many children the node has, or `undefined` for a leaf. Return a number for a branch
	 * that may have no children, such as an empty folder, so it still renders as a branch.
	 * Defaults to the length of `nodeToChildren`.
	 */
	nodeToChildrenCount?: (node: TNode) => number | undefined;
	/** Whether the node is disabled. A disabled node cannot be selected or expanded. */
	isNodeDisabled?: (node: TNode) => boolean;
}
