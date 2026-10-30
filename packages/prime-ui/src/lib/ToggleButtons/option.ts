/** One option of a `ToggleButtons` group, when the options are given as data. */
export interface ToggleButtonsOption {
	/** The value the group holds when this option is selected. */
	value: string;
	/** The option's text. */
	label: string;
	/** Disable this option alone. */
	disabled?: boolean;
}
