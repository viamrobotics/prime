/** What a `Tabs.Trigger` passes its `actions` snippet, so a consumer's control can move its tab. */
export interface TabsMove {
	/** Move this tab one place toward the start and focus it, as Alt+Shift+ArrowLeft does. */
	movePrevious: () => void;
	/** Move this tab one place toward the end and focus it, as Alt+Shift+ArrowRight does. */
	moveNext: () => void;
	/** Whether this tab can move toward the start. False at the first place, on a disabled tab, and on a list that is not `reorderable`. */
	readonly canMovePrevious: boolean;
	/** Whether this tab can move toward the end. False at the last place, on a disabled tab, and on a list that is not `reorderable`. */
	readonly canMoveNext: boolean;
}
