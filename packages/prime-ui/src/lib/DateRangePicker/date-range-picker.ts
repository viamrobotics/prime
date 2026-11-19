import Root from './DateRangePicker.svelte';
import Calendar from './DateRangePickerCalendar.svelte';
import Content from './DateRangePickerContent.svelte';
import Field from './DateRangePickerField.svelte';
import Trigger from './DateRangePickerTrigger.svelte';

export const DateRangePicker: typeof Root & {
	Field: typeof Field;
	Trigger: typeof Trigger;
	Content: typeof Content;
	Calendar: typeof Calendar;
} = Object.assign(Root, {
	Field,
	Trigger,
	Content,
	Calendar
});
