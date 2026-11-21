<!--
@component
The month calendar of a [`DateRangePicker`](./DateRangePicker.svelte): a header with the previous
and next month buttons around the month heading, the weekday names, and the day grid. Render it
inside [`DateRangePicker.Content`](./DateRangePickerContent.svelte).

The first day picked is the start and the second is the end. Picking an earlier day second swaps
them. While only the start is set, the days between it and the hovered or focused day are shaded
as a preview. Arrow keys move between days, and Enter or Space picks the focused day. The header
buttons change the month, and their names ("Last month" and "Next month" in `en-US`) follow the
picker's `locale`. The calendar's accessible name is its `aria-label` followed by the month on
show.

```svelte
<DateRangePicker.Content>
	<DateRangePicker.Calendar aria-label="Choose a reporting period" />
</DateRangePicker.Content>
```
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
	import { DateRangePicker } from 'bits-ui';

	import { monthButtonName } from '../DatePicker/month-button-name.ts';
	import Icon from '../Icon/Icon.svelte';
	import { useDateRangePicker } from './useDateRangePicker.svelte.ts';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/**
		 * The calendar's accessible name. The month on show is appended to it.
		 * @default 'Choose a date range'
		 */
		'aria-label'?: string;
	}

	const { class: extraClasses, 'aria-label': label, ...restProps }: Props = $props();

	const picker = useDateRangePicker();

	$effect(() => {
		if (!picker) return;
		picker.calendarLabel = label;
		return () => {
			picker.calendarLabel = undefined;
		};
	});

	const previousMonthName = $derived(monthButtonName(-1, picker?.locale));
	const nextMonthName = $derived(monthButtonName(1, picker?.locale));
</script>

<DateRangePicker.Calendar class={['text-sm text-default select-none', extraClasses]} {...restProps}>
	{#snippet children({ months, weekdays })}
		<DateRangePicker.Header class="mb-2 flex items-center justify-between gap-2">
			<DateRangePicker.PrevButton class="calendar-nav">
				{#snippet child({ props })}
					<button {...props} aria-label={previousMonthName}>
						<Icon icon={mdiChevronLeft} size="base" />
					</button>
				{/snippet}
			</DateRangePicker.PrevButton>
			<DateRangePicker.Heading class="font-medium text-heading" />
			<DateRangePicker.NextButton class="calendar-nav">
				{#snippet child({ props })}
					<button {...props} aria-label={nextMonthName}>
						<Icon icon={mdiChevronRight} size="base" />
					</button>
				{/snippet}
			</DateRangePicker.NextButton>
		</DateRangePicker.Header>
		{#each months as month (month.value.toString())}
			<DateRangePicker.Grid class="border-collapse">
				<DateRangePicker.GridHead>
					<DateRangePicker.GridRow class="flex">
						{#each weekdays as weekday, index (index)}
							<DateRangePicker.HeadCell class="calendar-weekday">
								{weekday}
							</DateRangePicker.HeadCell>
						{/each}
					</DateRangePicker.GridRow>
				</DateRangePicker.GridHead>
				<DateRangePicker.GridBody>
					{#each month.weeks as week (week[0]?.toString())}
						<DateRangePicker.GridRow class="flex">
							{#each week as date (date.toString())}
								<DateRangePicker.Cell {date} month={month.value} class="p-0">
									<DateRangePicker.Day class="calendar-day calendar-day-range" />
								</DateRangePicker.Cell>
							{/each}
						</DateRangePicker.GridRow>
					{/each}
				</DateRangePicker.GridBody>
			</DateRangePicker.Grid>
		{/each}
	{/snippet}
</DateRangePicker.Calendar>
