/** One entry of the `items` a `Select`, `MultiSelect`, or `Combobox` takes. */
export interface SelectOption {
	/** Submitted and bound value. */
	value: string;
	/** Text shown for the option and matched by typeahead. */
	label: string;
	/** Prevent the option from being selected. */
	disabled?: boolean;
}
