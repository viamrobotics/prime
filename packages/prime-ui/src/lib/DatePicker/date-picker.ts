import Root from './DatePicker.svelte';
import Calendar from './DatePickerCalendar.svelte';
import Content from './DatePickerContent.svelte';
import Field from './DatePickerField.svelte';
import Trigger from './DatePickerTrigger.svelte';

export const DatePicker: typeof Root & {
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
