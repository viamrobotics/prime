/**
 * The state of one node, passed to the `node` snippet as its second argument. Each `Tree` part
 * placed inside the snippet also carries the matching `aria-*` and `data-*` attributes.
 */
export interface TreeNodeState {
	/** The node's value from `nodeToValue`, the key `expanded` and `selected` hold. */
	readonly value: string;
	/** The node has children, or `nodeToChildrenCount` says it may. A leaf is never expanded. */
	readonly isBranch: boolean;
	/** The branch is open and its children render. Always `false` on a leaf. */
	readonly expanded: boolean;
	/** The node is in `selected`. */
	readonly selected: boolean;
	/** The node holds the tree's roving focus, whether or not the tree has DOM focus. */
	readonly focused: boolean;
	/** `isNodeDisabled` returned `true`. A disabled node cannot be selected or expanded. */
	readonly disabled: boolean;
	/** Nesting depth, starting at 1 for a root node. Matches `aria-level` and `--depth`. */
	readonly depth: number;
	/** The index of the node and of each ancestor within its siblings, root first. */
	readonly indexPath: readonly number[];
}
