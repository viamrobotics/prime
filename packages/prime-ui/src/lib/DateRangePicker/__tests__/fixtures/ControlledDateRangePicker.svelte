<script lang="ts">
	import { CalendarDate } from '@internationalized/date';

	import type { DateRange } from '../../date-range.ts';

	import Field from '../../../Field/Field.svelte';
	import { DateRangePicker } from '../../date-range-picker.ts';

	interface Props {
		accept?: boolean;
	}

	const { accept = false }: Props = $props();

	let value = $state<DateRange | undefined>({
		start: new CalendarDate(2026, 3, 10),
		end: new CalendarDate(2026, 3, 20)
	});
</script>

<Field label="Billing period">
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
</Field>
<span data-testid="owner">{value ? `${value.start} ${value.end}` : 'undefined'}</span>
