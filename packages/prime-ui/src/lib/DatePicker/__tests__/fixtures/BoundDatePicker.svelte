<script lang="ts">
	import { CalendarDate, type DateValue } from '@internationalized/date';

	import type { FieldState } from '../../../Field/state.ts';

	import Field from '../../../Field/Field.svelte';
	import { DatePicker } from '../../date-picker.ts';

	const {
		disabled,
		required,
		name,
		min,
		max,
		granularity,
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
		granularity?: 'day' | 'minute';
		readonly?: boolean;
		locale?: string;
		calendarLabel?: string;
		chevrons?: boolean;
		state?: FieldState;
		fieldProps?: { 'data-state'?: string };
		triggerProps?: { 'aria-label'?: string; disabled?: boolean };
		contentProps?: { 'aria-label'?: string; 'aria-labelledby'?: string };
	} = $props();

	let value = $state<DateValue | undefined>(new CalendarDate(2026, 3, 10));
	let open = $state(false);
</script>

{#snippet previous()}
	<span data-testid="previous-chevron">‹</span>
{/snippet}

{#snippet next()}
	<span data-testid="next-chevron">›</span>
{/snippet}

<Field label="Start date">
	<DatePicker
		{disabled}
		{required}
		{name}
		{min}
		{max}
		{granularity}
		{readonly}
		{locale}
		bind:value
		bind:open
	>
		<DatePicker.Field state={fieldState} {...fieldProps}>
			<DatePicker.Trigger {...triggerProps} />
		</DatePicker.Field>
		<DatePicker.Content {...contentProps}>
			<DatePicker.Calendar
				aria-label={calendarLabel}
				previousChevron={chevrons ? previous : undefined}
				nextChevron={chevrons ? next : undefined}
			/>
		</DatePicker.Content>
	</DatePicker>
</Field>
<span data-testid="owner">{String(value)}</span>
<span data-testid="open">{open}</span>
