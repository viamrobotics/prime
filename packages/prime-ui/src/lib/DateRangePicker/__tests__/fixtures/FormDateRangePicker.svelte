<script lang="ts">
	import { CalendarDate } from '@internationalized/date';

	import type { DateRange } from '../../date-range.ts';

	import Field from '../../../Field/Field.svelte';
	import { DateRangePicker } from '../../date-range-picker.ts';

	const { disabled }: { disabled?: boolean } = $props();

	let value = $state<DateRange | undefined>({
		start: new CalendarDate(2026, 3, 10),
		end: new CalendarDate(2026, 3, 20)
	});
</script>

<form onsubmit={(event) => event.preventDefault()}>
	<Field label="Billing period">
		<DateRangePicker name="period" {disabled} bind:value>
			<DateRangePicker.Field>
				<DateRangePicker.Trigger />
			</DateRangePicker.Field>
			<DateRangePicker.Content>
				<DateRangePicker.Calendar />
			</DateRangePicker.Content>
		</DateRangePicker>
	</Field>
</form>
