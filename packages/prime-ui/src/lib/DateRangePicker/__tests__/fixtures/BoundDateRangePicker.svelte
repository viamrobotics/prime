<script lang="ts">
	import { CalendarDate, type DateValue } from '@internationalized/date';

	import type { FieldState } from '../../../Field/state.ts';
	import type { DateRange } from '../../date-range.ts';

	import Field from '../../../Field/Field.svelte';
	import { DateRangePicker } from '../../date-range-picker.ts';

	const {
		disabled,
		required,
		name,
		min,
		max,
		readonly,
		locale,
		calendarLabel,
		chevrons = false,
		state: fieldState,
		fieldProps,
		triggerProps,
		contentProps
	}: {
		disabled?: boolean;
		required?: boolean;
		name?: string;
		min?: DateValue;
		max?: DateValue;
		readonly?: boolean;
		locale?: string;
		calendarLabel?: string;
		chevrons?: boolean;
		state?: FieldState;
		fieldProps?: { 'data-state'?: string };
		triggerProps?: { 'aria-label'?: string; disabled?: boolean };
		contentProps?: { 'aria-label'?: string; 'aria-labelledby'?: string };
	} = $props();

	let value = $state<DateRange | undefined>({
		start: new CalendarDate(2026, 3, 10),
		end: new CalendarDate(2026, 3, 20)
	});
	let open = $state(false);
</script>

{#snippet previous()}
	<span data-testid="previous-chevron">‹</span>
{/snippet}

{#snippet next()}
	<span data-testid="next-chevron">›</span>
{/snippet}

<Field label="Billing period">
	<DateRangePicker
		{disabled}
		{required}
		{name}
		{min}
		{max}
		{readonly}
		{locale}
		bind:value
		bind:open
	>
		<DateRangePicker.Field state={fieldState} {...fieldProps}>
			<DateRangePicker.Trigger {...triggerProps} />
		</DateRangePicker.Field>
		<DateRangePicker.Content {...contentProps}>
			<DateRangePicker.Calendar
				aria-label={calendarLabel}
				previousChevron={chevrons ? previous : undefined}
				nextChevron={chevrons ? next : undefined}
			/>
		</DateRangePicker.Content>
	</DateRangePicker>
</Field>
<span data-testid="owner">{value ? `${value.start} ${value.end}` : 'undefined'}</span>
<span data-testid="open">{open}</span>
