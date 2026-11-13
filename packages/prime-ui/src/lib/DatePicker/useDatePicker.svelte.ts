import { getContext, setContext } from 'svelte';

const key = Symbol('DatePicker');

interface DatePickerOptions {
	disabled: () => boolean;
	readonly: () => boolean;
}

/** What a `DatePicker` shares with the parts bits-ui does not wire to its root. */
export interface DatePickerContext {
	/** The root's resolved `disabled`, after the enclosing field's. */
	readonly disabled: boolean;
	/** The root's `readonly`. */
	readonly readonly: boolean;
}

export const provideDatePicker = (options: DatePickerOptions): DatePickerContext =>
	setContext<DatePickerContext>(key, {
		get disabled() {
			return options.disabled();
		},
		get readonly() {
			return options.readonly();
		}
	});

/** The enclosing `DatePicker`, or `undefined` when a part is rendered on its own. */
export const useDatePicker = (): DatePickerContext | undefined =>
	getContext<DatePickerContext | undefined>(key);
