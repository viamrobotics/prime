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
		state: fieldState
	}: {
		disabled?: boolean;
		name?: string;
		min?: DateValue;
		max?: DateValue;
		readonly?: boolean;
		state?: FieldState;
	} = $props();

	let value = $state<DateRange | undefined>({
		start: new CalendarDate(2026, 3, 10),
		end: new CalendarDate(2026, 3, 20)
	});
</script>

<DateRangePicker {disabled} {name} {min} {max} {readonly} bind:value>
	<DateRangePicker.Field state={fieldState}>
		<DateRangePicker.Trigger />
	</DateRangePicker.Field>
	<DateRangePicker.Content>
		<DateRangePicker.Calendar />
	</DateRangePicker.Content>
</DateRangePicker>
<span data-testid="owner">{value ? `${value.start} ${value.end}` : 'undefined'}</span>
