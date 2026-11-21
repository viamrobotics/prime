<script lang="ts">
	import { CalendarDate, type DateValue } from '@internationalized/date';

	import type { FieldState } from '../../Field/state.ts';
	import type { DateRange } from '../date-range.ts';

	import { DateRangePicker } from '../date-range-picker.ts';

	const {
		disabled,
		name,
		min,
		max,
		readonly,
		locale,
		calendarLabel,
		state: fieldState,
		triggerProps,
		contentProps
	}: {
		disabled?: boolean;
		name?: string;
		min?: DateValue;
		max?: DateValue;
		readonly?: boolean;
		locale?: string;
		calendarLabel?: string;
		state?: FieldState;
		triggerProps?: { 'aria-label'?: string; disabled?: boolean };
		contentProps?: { 'aria-label'?: string; 'aria-labelledby'?: string };
	} = $props();

	let value = $state<DateRange | undefined>({
		start: new CalendarDate(2026, 3, 10),
		end: new CalendarDate(2026, 3, 20)
	});
	let open = $state(false);
</script>

<DateRangePicker {disabled} {name} {min} {max} {readonly} {locale} bind:value bind:open>
	<DateRangePicker.Field state={fieldState}>
		<DateRangePicker.Trigger {...triggerProps} />
	</DateRangePicker.Field>
	<DateRangePicker.Content {...contentProps}>
		<DateRangePicker.Calendar aria-label={calendarLabel} />
	</DateRangePicker.Content>
</DateRangePicker>
<span data-testid="owner">{value ? `${value.start} ${value.end}` : 'undefined'}</span>
<span data-testid="open">{open}</span>
