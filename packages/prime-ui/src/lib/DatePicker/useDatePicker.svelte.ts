import { getContext, setContext } from 'svelte';

const key = Symbol('DatePicker');

interface DatePickerOptions {
	disabled: () => boolean;
	readonly: () => boolean;
	open: () => boolean;
	locale: () => string;
	calendarLabel: { get: () => string | undefined; set: (label: string | undefined) => void };
}

/** What a `DatePicker` shares with the parts bits-ui does not wire to its root. */
export interface DatePickerContext {
	/** The root's resolved `disabled`, after the enclosing field's. */
	readonly disabled: boolean;
	/** The root's `readonly`. */
	readonly readonly: boolean;
	/** Whether the calendar is open. */
	readonly open: boolean;
	/** The root's BCP 47 `locale`. */
	readonly locale: string;
	/** The calendar's accessible name, before bits-ui appends the month heading. */
	calendarLabel: string | undefined;
}

export const provideDatePicker = (options: DatePickerOptions): DatePickerContext =>
	setContext<DatePickerContext>(key, {
		get disabled() {
			return options.disabled();
		},
		get readonly() {
			return options.readonly();
		},
		get open() {
			return options.open();
		},
		get locale() {
			return options.locale();
		},
		get calendarLabel() {
			return options.calendarLabel.get();
		},
		set calendarLabel(label) {
			options.calendarLabel.set(label);
		}
	});

/** The enclosing `DatePicker`, or `undefined` when a part is rendered on its own. */
export const useDatePicker = (): DatePickerContext | undefined =>
	getContext<DatePickerContext | undefined>(key);
