import type { PaneNode } from '../layout.ts';

/** What is being dragged, passed to the `dragPreview` snippet of `Panes`. */
export interface DragPreview<TData> {
	/** `'pane'` for one pane, `'stack'` for a whole stack. */
	readonly type: 'pane' | 'stack';
	/**
	 * What a drop would make. `'tab'` while over a tab strip or a `TabListDropRegion`, where the drop
	 * adds tabs, and `'pane'` elsewhere.
	 */
	readonly form: 'tab' | 'pane';
	/** The dragged pane, or the stack's panes in tab order. */
	readonly panes: readonly PaneNode<TData>[];
	/** The pane's label from `paneLabel`, or the stack's labels joined into one. */
	readonly label: string;
}
