import { getContext, setContext } from 'svelte';

import type { PickerContext, PickerContextOptions } from './picker-context.ts';

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
