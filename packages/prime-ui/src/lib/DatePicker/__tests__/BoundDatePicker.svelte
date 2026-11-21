<script lang="ts">
	import { CalendarDate, type DateValue } from '@internationalized/date';

	import type { FieldState } from '../../Field/state.ts';

	import { DatePicker } from '../date-picker.ts';

	const {
		disabled,
		name,
		min,
		max,
		granularity,
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
		granularity?: 'day' | 'minute';
		readonly?: boolean;
		locale?: string;
		calendarLabel?: string;
		state?: FieldState;
		triggerProps?: { 'aria-label'?: string; disabled?: boolean };
		contentProps?: { 'aria-label'?: string; 'aria-labelledby'?: string };
	} = $props();

	let value = $state<DateValue | undefined>(new CalendarDate(2026, 3, 10));
	let open = $state(false);
</script>

<DatePicker {disabled} {name} {min} {max} {granularity} {readonly} {locale} bind:value bind:open>
	<DatePicker.Field state={fieldState}>
		<DatePicker.Trigger {...triggerProps} />
	</DatePicker.Field>
	<DatePicker.Content {...contentProps}>
		<DatePicker.Calendar aria-label={calendarLabel} />
	</DatePicker.Content>
</DatePicker>
<span data-testid="owner">{String(value)}</span>
<span data-testid="open">{open}</span>
