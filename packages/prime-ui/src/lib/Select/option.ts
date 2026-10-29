/** One entry of a `Select`'s `items`. */
export interface SelectOption {
	/** Submitted and bound value. */
	value: string;
	/** Text shown for the option and matched by typeahead. */
	label: string;
	/** Prevent the option from being selected. */
	disabled?: boolean;
}
