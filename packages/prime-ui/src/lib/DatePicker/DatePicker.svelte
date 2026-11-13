<!--
@component
A date picker: a segmented date field with a calendar that opens from a trigger. Render
[`DatePicker.Field`](./DatePickerField.svelte) with a [`DatePicker.Trigger`](./DatePickerTrigger.svelte)
inside it, and [`DatePicker.Content`](./DatePickerContent.svelte) holding a
[`DatePicker.Calendar`](./DatePickerCalendar.svelte). Inside a [`Field`](../Field/Field.svelte) it takes
`disabled` and `required` from there.

The value is a `DateValue` from `@internationalized/date`, such as `new CalendarDate(2026, 3, 10)`
or `parseDate('2026-03-10')`.

Built on [bits-ui `DatePicker`](https://bits-ui.com/docs/components/date-picker).

```svelte
<DatePicker bind:value>
	<DatePicker.Field>
		<DatePicker.Trigger />
	</DatePicker.Field>
	<DatePicker.Content>
		<DatePicker.Calendar />
	</DatePicker.Content>
</DatePicker>
```
-->
<script lang="ts">
	import type { DateValue } from '@internationalized/date';
	import type { Snippet } from 'svelte';

	import { DatePicker } from 'bits-ui';

	import { useField } from '../Field/useField.svelte.ts';
	import { provideDatePicker } from './useDatePicker.svelte.ts';

	interface Props {
		/** The selected date. Two-way bindable. */
		value?: DateValue;

		/** Whether the calendar is open. Two-way bindable. */
		open?: boolean;

		/** The earliest selectable date. */
		min?: DateValue;

		/** The latest selectable date. */
		max?: DateValue;

		/** The smallest unit the field edits. @default 'day' */
		granularity?: 'day' | 'hour' | 'minute' | 'second';

		/**
		 * BCP 47 locale for segment order, month names, and the names of the calendar's month
		 * buttons. @default 'en-US'
		 */
		locale?: string;

		/** Name for form submission. */
		name?: string;

		/** Disable the picker. Defaults to the enclosing field's `disabled`. */
		disabled?: boolean;

		/** Make a date required. Defaults to the enclosing field's `required`. */
		required?: boolean;

		/** Make the field read-only. @default false */
		readonly?: boolean;

		/** The `DatePicker.*` parts. */
		children?: Snippet;
	}

	let {
		value = $bindable(),
		open = $bindable(),
		min,
		max,
		granularity = 'day',
		locale = 'en-US',
		name,
		disabled,
		required,
		readonly = false,
		children
	}: Props = $props();

	const field = useField();
	const isDisabled = $derived(disabled ?? field?.disabled ?? false);

	let calendarLabel = $state<string>();

	provideDatePicker({
		disabled: () => isDisabled,
		readonly: () => readonly,
		open: () => open ?? false,
		locale: () => locale,
		calendarLabel: { get: () => calendarLabel, set: (label) => (calendarLabel = label) }
	});
</script>

<DatePicker.Root
	bind:value={() => value, (next) => (value = next)}
	bind:open={() => open ?? false, (next) => (open = next)}
	minValue={min}
	maxValue={max}
	{granularity}
	{locale}
	{readonly}
	disabled={isDisabled}
	required={required ?? field?.required ?? false}
	calendarLabel={calendarLabel ?? 'Choose a date'}
>
	{@render children?.()}
</DatePicker.Root>
{#if name}
	<input type="hidden" {name} value={value?.toString() ?? ''} />
{/if}
