import { getContext, setContext } from 'svelte';

interface PickerContextOptions {
	disabled: () => boolean;
	required: () => boolean;
	readonly: () => boolean;
	open: () => boolean;
	locale: () => string;
	formName?: () => string | undefined;
	calendarLabel: { get: () => string | undefined; set: (label: string | undefined) => void };
}

// What a picker root shares with the parts bits-ui does not wire to it. `disabled` and `required` are already resolved against the enclosing field.
interface PickerContext {
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

export const createPickerContext = (name: string, defaultCalendarName: string) => {
	const key = Symbol(name);

	const provide = (options: PickerContextOptions): PickerContext =>
		setContext<PickerContext>(key, {
			get disabled() {
				return options.disabled();
			},
			get required() {
				return options.required();
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
			get formName() {
				return options.formName?.();
			},
			get calendarLabel() {
				return options.calendarLabel.get();
			},
			set calendarLabel(label) {
				options.calendarLabel.set(label);
			},
			get calendarName() {
				return options.calendarLabel.get() ?? defaultCalendarName;
			}
		});

	const use = (): PickerContext | undefined => getContext<PickerContext | undefined>(key);

	return { provide, use };
};

const datePicker = createPickerContext('DatePicker', 'Choose a date');

export const provideDatePicker = datePicker.provide;

export const useDatePicker = datePicker.use;
