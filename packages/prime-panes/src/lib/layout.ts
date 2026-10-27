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

/** A window's position and size in pixels, relative to the box of the float node that holds it. */
export interface FloatRect {
	x: number;
	y: number;
	width: number;
	height: number;
}

/** One window of a float node. */
export interface FloatEntry<TData> {
	/** Unique within the layout. Stays the same when `content` is replaced by a drop. */
	id: string;
	rect: FloatRect;
	content: LayoutNode<TData>;
}

/**
 * Windows drawn over a base node, inside the float node's box. Holds at least one entry. A float
 * node left with none is replaced by its `base`.
 */
export interface FloatNode<TData> {
	type: 'float';
	/** Unique within the layout. */
	id: string;
	/** Fills the box behind the windows. Absent once its last pane leaves. */
	base?: LayoutNode<TData>;
	/** In stacking order, the last on top. */
	floats: FloatEntry<TData>[];
}

/** A layout tree, or any subtree of one. Narrow it on `type`. */
export type LayoutNode<TData> =
	| SplitNode<TData>
	| PaneNode<TData>
	| StackNode<TData>
	| FloatNode<TData>;
