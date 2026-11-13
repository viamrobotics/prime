<!--
@component
The month calendar of a [`DatePicker`](./DatePicker.svelte): a header with the previous and next
month buttons around the month heading, the weekday names, and the day grid. Render it inside
[`DatePicker.Content`](./DatePickerContent.svelte).

Arrow keys move between days, and Enter or Space selects the focused day. The header buttons
change the month, and their names ("Last month" and "Next month" in `en-US`) follow the
picker's `locale`. The calendar's accessible name is its `aria-label` followed by the month
on show.

```svelte
<DatePicker.Content>
	<DatePicker.Calendar aria-label="Choose a start date" />
</DatePicker.Content>
```
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
	import { DatePicker } from 'bits-ui';

	import Icon from '../Icon/Icon.svelte';
	import { useDatePicker } from './useDatePicker.svelte.ts';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/**
		 * The calendar's accessible name. The month on show is appended to it.
		 * @default 'Choose a date'
		 */
		'aria-label'?: string;
	}

	const { class: extraClasses, 'aria-label': label, ...restProps }: Props = $props();

	const picker = useDatePicker();

	$effect(() => {
		if (!picker) return;
		picker.calendarLabel = label;
		return () => {
			picker.calendarLabel = undefined;
		};
	});

	const monthButtonName = (step: -1 | 1): string => {
		const locale = picker?.locale ?? 'en-US';
		const name = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).format(step, 'month');
		return name.charAt(0).toLocaleUpperCase(locale) + name.slice(1);
	};

	const previousMonthName = $derived(monthButtonName(-1));
	const nextMonthName = $derived(monthButtonName(1));

	const MONTH_BUTTON_CLASSES =
		'inline-flex size-7 cursor-pointer items-center justify-center rounded-sm text-subtle-2 transition-colors focus-ring hover:bg-light hover:text-default data-disabled:cursor-not-allowed data-disabled:text-disabled-dark';
</script>

<DatePicker.Calendar class={['text-sm text-default select-none', extraClasses]} {...restProps}>
	{#snippet children({ months, weekdays })}
		<DatePicker.Header class="mb-2 flex items-center justify-between gap-2">
			<DatePicker.PrevButton class={MONTH_BUTTON_CLASSES}>
				{#snippet child({ props })}
					<button {...props} aria-label={previousMonthName}>
						<Icon icon={mdiChevronLeft} size="base" />
					</button>
				{/snippet}
			</DatePicker.PrevButton>
			<DatePicker.Heading class="font-medium text-heading" />
			<DatePicker.NextButton class={MONTH_BUTTON_CLASSES}>
				{#snippet child({ props })}
					<button {...props} aria-label={nextMonthName}>
						<Icon icon={mdiChevronRight} size="base" />
					</button>
				{/snippet}
			</DatePicker.NextButton>
		</DatePicker.Header>
		{#each months as month (month.value.toString())}
			<DatePicker.Grid class="border-collapse">
				<DatePicker.GridHead>
					<DatePicker.GridRow class="flex">
						{#each weekdays as weekday, index (index)}
							<DatePicker.HeadCell class="w-8 pb-1 text-xs font-normal text-subtle-2">
								{weekday}
							</DatePicker.HeadCell>
						{/each}
					</DatePicker.GridRow>
				</DatePicker.GridHead>
				<DatePicker.GridBody>
					{#each month.weeks as week (week[0]?.toString())}
						<DatePicker.GridRow class="flex">
							{#each week as date (date.toString())}
								<DatePicker.Cell {date} month={month.value} class="p-0">
									<DatePicker.Day
										class={[
											'inline-flex size-8 cursor-pointer items-center justify-center rounded-sm focus-ring',
											'not-data-disabled:not-data-selected:hover:bg-light',
											'data-today:font-semibold not-data-selected:data-today:text-heading',
											'data-outside-month:text-subtle-2',
											'data-selected:bg-gray-9 data-selected:text-white',
											'data-disabled:cursor-not-allowed data-disabled:text-disabled-dark',
											'data-unavailable:line-through'
										]}
									/>
								</DatePicker.Cell>
							{/each}
						</DatePicker.GridRow>
					{/each}
				</DatePicker.GridBody>
			</DatePicker.Grid>
		{/each}
	{/snippet}
</DatePicker.Calendar>
