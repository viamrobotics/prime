<script lang="ts">
	import type { DateRange } from '../date-range.ts';

	import { DateRangePicker } from '../date-range-picker.ts';

	let value = $state<DateRange>();
</script>

<DateRangePicker bind:value>
	<DateRangePicker.Field>
		<DateRangePicker.Trigger />
	</DateRangePicker.Field>
	<DateRangePicker.Content>
		<DateRangePicker.Calendar />
	</DateRangePicker.Content>
</DateRangePicker>
<span data-testid="owner">{value ? `${value.start} ${value.end}` : 'undefined'}</span>
