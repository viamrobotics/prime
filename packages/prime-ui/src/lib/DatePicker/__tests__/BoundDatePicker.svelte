<script lang="ts">
	import { CalendarDate, type DateValue } from '@internationalized/date';

	import type { FieldState } from '../../Field/state.ts';

	import { DatePicker } from '../date-picker.ts';

	const {
		disabled,
		name,
		min,
		readonly,
		state: fieldState
	}: {
		disabled?: boolean;
		name?: string;
		min?: DateValue;
		readonly?: boolean;
		state?: FieldState;
	} = $props();

	let value = $state<DateValue | undefined>(new CalendarDate(2026, 3, 10));
</script>

<DatePicker {disabled} {name} {min} {readonly} bind:value>
	<DatePicker.Field state={fieldState}>
		<DatePicker.Trigger />
	</DatePicker.Field>
	<DatePicker.Content>
		<DatePicker.Calendar />
	</DatePicker.Content>
</DatePicker>
<span data-testid="owner">{String(value)}</span>
