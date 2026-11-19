<script lang="ts">
	import { CalendarDate } from '@internationalized/date';

	import type { DateRange } from '../date-range.ts';

	import { DateRangePicker } from '../date-range-picker.ts';

	interface Props {
		/** When false, the setter rejects every change (controlled veto). */
		accept?: boolean;
	}

	const { accept = false }: Props = $props();

	let value = $state<DateRange | undefined>({
		start: new CalendarDate(2026, 3, 10),
		end: new CalendarDate(2026, 3, 20)
	});
</script>

<DateRangePicker
	bind:value={
		() => value,
		(next) => {
			if (accept) value = next;
		}
	}
>
	<DateRangePicker.Field>
		<DateRangePicker.Trigger />
	</DateRangePicker.Field>
	<DateRangePicker.Content>
		<DateRangePicker.Calendar />
	</DateRangePicker.Content>
</DateRangePicker>
<span data-testid="owner">{value ? `${value.start} ${value.end}` : 'undefined'}</span>
