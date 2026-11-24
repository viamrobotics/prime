import { getContext, setContext } from 'svelte';

import { createPickerContext } from '../DatePicker/useDatePicker.svelte.ts';

const DATE_RANGE_PICKER_FRAME_KEY = Symbol('DateRangePickerFrame');

const dateRangePicker = createPickerContext('DateRangePicker', 'Choose a date range');

export const provideDateRangePicker = dateRangePicker.provide;

export const useDateRangePicker = dateRangePicker.use;

// The attributes bits-ui computes for the range field's root element, which `DateRangePicker.Field` renders.
export const provideDateRangePickerFrame = (props: () => Record<string, unknown>): void => {
	setContext(DATE_RANGE_PICKER_FRAME_KEY, props);
};

export const useDateRangePickerFrame = (): (() => Record<string, unknown>) | undefined =>
	getContext<(() => Record<string, unknown>) | undefined>(DATE_RANGE_PICKER_FRAME_KEY);
