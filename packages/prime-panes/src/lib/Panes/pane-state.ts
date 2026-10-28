/**
 * The state of one pane, passed to the `pane` snippet as its second argument. Each value also
 * appears as a data attribute on the pane's wrapper, for styling without script.
 */
export interface PaneState {
	/** The pane shares its slot with other panes in a stack. Matches `data-stacked`. */
	readonly isStacked: boolean;
	/** The pane, or its whole stack, is being moved in move mode. Matches `data-moving`. */
	readonly isMoving: boolean;
	/** A press has armed the pane to drag. Matches `data-drag-armed`. */
	readonly isDragArmed: boolean;
}
