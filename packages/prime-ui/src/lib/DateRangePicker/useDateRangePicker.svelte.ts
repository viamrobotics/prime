import { getContext, setContext } from 'svelte';

const key = Symbol('DateRangePicker');
const frameKey = Symbol('DateRangePickerFrame');

interface DateRangePickerOptions {
	disabled: () => boolean;
	readonly: () => boolean;
	open: () => boolean;
	locale: () => string;
	calendarLabel: { get: () => string | undefined; set: (label: string | undefined) => void };
}

/** What a `DateRangePicker` shares with the parts bits-ui does not wire to its root. */
export interface DateRangePickerContext {
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

export const provideDateRangePicker = (options: DateRangePickerOptions): DateRangePickerContext =>
	setContext<DateRangePickerContext>(key, {
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

/** The enclosing `DateRangePicker`, or `undefined` when a part is rendered on its own. */
export const useDateRangePicker = (): DateRangePickerContext | undefined =>
	getContext<DateRangePickerContext | undefined>(key);

/** Hands the attributes bits-ui computes for the range field's root element to `DateRangePicker.Field`. */
export const provideDateRangePickerFrame = (props: () => Record<string, unknown>): void => {
	setContext(frameKey, props);
};

/** The range field's root attributes, or `undefined` outside a `DateRangePicker`. */
export const useDateRangePickerFrame = (): (() => Record<string, unknown>) | undefined =>
	getContext<(() => Record<string, unknown>) | undefined>(frameKey);
