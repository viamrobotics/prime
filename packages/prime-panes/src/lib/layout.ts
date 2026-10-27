/**
 * How a split arranges its two children, named after CSS `flex-direction`. `row` places `first`
 * to the left of `second`. `column` places `first` above `second`.
 */
export type SplitDirection = 'row' | 'column';

/** The child slot of a split that a node occupies. */
export type SplitKey = 'first' | 'second';

/** Divides its area between two children along `direction`. */
export interface SplitNode<TData> {
	type: 'split';
	/** Unique within the layout. */
	id: string;
	direction: SplitDirection;
	/** The share of the split given to `first`, strictly between 0 and 1. */
	ratio: number;
	first: LayoutNode<TData>;
	second: LayoutNode<TData>;
}

/** A leaf of the layout. Its `data` belongs to the consumer, and the library never reads it. */
export interface PaneNode<TData> {
	type: 'pane';
	/** Unique within the layout. */
	id: string;
	data: TData;
}

/**
 * Several panes sharing one slot, one shown at a time behind tabs. Holds at least two panes. A
 * stack never holds a split or another stack.
 */
export interface StackNode<TData> {
	type: 'stack';
	/** Unique within the layout. */
	id: string;
	/** In tab order. */
	panes: PaneNode<TData>[];
	/** The id of the shown pane, one of `panes`. When it names none of them, the first pane shows. */
	activeId: string;
}

/** A layout tree, or any subtree of one. Narrow it on `type`. */
export type LayoutNode<TData> = SplitNode<TData> | PaneNode<TData> | StackNode<TData>;
