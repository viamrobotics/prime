<!--
@component
A date range picker: one segmented field holding a start and an end date, with a range calendar
that opens from a trigger. Render [`DateRangePicker.Field`](./DateRangePickerField.svelte) with a
[`DateRangePicker.Trigger`](./DateRangePickerTrigger.svelte) inside it, and
[`DateRangePicker.Content`](./DateRangePickerContent.svelte) holding a
[`DateRangePicker.Calendar`](./DateRangePickerCalendar.svelte). Inside a [`Field`](../Field/Field.svelte)
it takes `disabled` and `required` from there.

The value is a `DateRange`, a `start` and an `end` that are each a `DateValue` from
`@internationalized/date`. It is `undefined` until a date is chosen. With one end chosen, the
other is `undefined`, so a finished range is one with both set. Picking the end before the start
in the calendar swaps them, so `start` is never after `end`.

Built on [bits-ui `DateRangePicker`](https://bits-ui.com/docs/components/date-range-picker).

```svelte
<DateRangePicker bind:value>
	<DateRangePicker.Field>
		<DateRangePicker.Trigger />
	</DateRangePicker.Field>
	<DateRangePicker.Content>
		<DateRangePicker.Calendar />
	</DateRangePicker.Content>
</DateRangePicker>
```
-->
<script lang="ts">
	import type { DateValue } from '@internationalized/date';
	import type { Snippet } from 'svelte';

	import { DateRangePicker } from 'bits-ui';

	import type { DateRange } from './date-range.ts';

	import { useField } from '../Field/useField.svelte.ts';
	import DateRangePickerFrameProps from './DateRangePickerFrameProps.svelte';
	import { provideDateRangePicker } from './useDateRangePicker.svelte.ts';

	interface Props {
		/**
		 * The selected range. Two-way bindable. `undefined` until a date is chosen, and the
		 * unchosen end is `undefined` while only one is set.
		 */
		value?: DateRange;

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

		/**
		 * Name for form submission. The submitted value is the ISO 8601 interval
		 * `<start>/<end>`, or empty unless both ends are set.
		 */
		name?: string;

		/** Disable the picker. Defaults to the enclosing field's `disabled`. */
		disabled?: boolean;

		/** Make a range required. Defaults to the enclosing field's `required`. */
		required?: boolean;

		/** Make the field read-only. @default false */
		readonly?: boolean;

		/** The `DateRangePicker.*` parts. */
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
	let refusedWrites = $state(0);

	// A fresh object after a refused write makes bits-ui re-read the range, so its segments drop the refused dates.
	const headlessRange = $derived.by((): DateRange => {
		void refusedWrites;
		return { start: value?.start, end: value?.end };
	});

	const holdsRange = (
		range: DateRange | undefined,
		start: DateValue | undefined,
		end: DateValue | undefined
	) => range?.start === start && range?.end === end;

	const writeRange = (start: DateValue | undefined, end: DateValue | undefined) => {
		if (holdsRange(value, start, end)) return;
		value = start === undefined && end === undefined ? undefined : { start, end };
		if (!holdsRange(value, start, end)) refusedWrites += 1;
	};

	const interval = $derived(value?.start && value.end ? `${value.start}/${value.end}` : '');

	provideDateRangePicker({
		disabled: () => isDisabled,
		readonly: () => readonly,
		open: () => open ?? false,
		locale: () => locale,
		calendarLabel: { get: () => calendarLabel, set: (label) => (calendarLabel = label) }
	});
</script>

<DateRangePicker.Root
	bind:value={() => headlessRange, (next) => writeRange(next?.start, next?.end)}
	bind:open={() => open ?? false, (next) => (open = next)}
	onStartValueChange={(start) => writeRange(start, value?.end)}
	onEndValueChange={(end) => writeRange(value?.start, end)}
	minValue={min}
	maxValue={max}
	{granularity}
	{locale}
	{readonly}
	disabled={isDisabled}
	required={required ?? field?.required ?? false}
	calendarLabel={calendarLabel ?? 'Choose a date range'}
>
	{#snippet child({ props })}
		<DateRangePickerFrameProps {props}>
			{@render children?.()}
		</DateRangePickerFrameProps>
	{/snippet}
</DateRangePicker.Root>
{#if name}
	<input type="hidden" {name} value={interval} />
{/if}
