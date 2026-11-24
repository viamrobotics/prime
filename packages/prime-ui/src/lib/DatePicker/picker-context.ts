export interface PickerContextOptions {
	disabled: () => boolean;
	required: () => boolean;
	readonly: () => boolean;
	open: () => boolean;
	locale: () => string;
	formName?: () => string | undefined;
	calendarLabel: { get: () => string | undefined; set: (label: string | undefined) => void };
}

// What a picker root shares with the parts bits-ui does not wire to it. `disabled` and `required` are already resolved against the enclosing field.
export interface PickerContext {
	readonly disabled: boolean;
	readonly required: boolean;
	readonly readonly: boolean;
	readonly open: boolean;
	readonly locale: string;
	// The name the field's form input submits under, `undefined` when nothing is submitted.
	readonly formName: string | undefined;
	// The calendar's accessible name, before bits-ui appends the month heading.
	calendarLabel: string | undefined;
	// `calendarLabel`, or the picker's default name. The panel and the calendar both take it.
	readonly calendarName: string;
}
