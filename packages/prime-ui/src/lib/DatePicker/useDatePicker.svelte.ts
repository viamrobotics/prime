import { getContext, setContext } from 'svelte';

interface PickerContextOptions {
	disabled: () => boolean;
	readonly: () => boolean;
	open: () => boolean;
	locale: () => string;
	calendarLabel: { get: () => string | undefined; set: (label: string | undefined) => void };
}

// What a picker root shares with the parts bits-ui does not wire to it. `disabled` is already resolved against the enclosing field.
interface PickerContext {
	readonly disabled: boolean;
	readonly readonly: boolean;
	readonly open: boolean;
	readonly locale: string;
	// The calendar's accessible name, before bits-ui appends the month heading.
	calendarLabel: string | undefined;
}

export const createPickerContext = (name: string) => {
	const key = Symbol(name);

	const provide = (options: PickerContextOptions): PickerContext =>
		setContext<PickerContext>(key, {
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

	const use = (): PickerContext | undefined => getContext<PickerContext | undefined>(key);

	return { provide, use };
};

const datePicker = createPickerContext('DatePicker');

export const provideDatePicker = datePicker.provide;

export const useDatePicker = datePicker.use;
