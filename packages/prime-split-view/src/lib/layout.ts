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

/** A layout tree, or any subtree of one. Narrow it on `type`. */
export type LayoutNode<TData> = SplitNode<TData> | PaneNode<TData>;
