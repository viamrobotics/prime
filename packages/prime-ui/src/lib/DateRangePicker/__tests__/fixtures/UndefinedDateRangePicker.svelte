<script lang="ts">
	import type { DateRange } from '../../date-range.ts';

	import Field from '../../../Field/Field.svelte';
	import { DateRangePicker } from '../../date-range-picker.ts';

	let value = $state<DateRange>();
</script>

<Field label="Billing period">
	<DateRangePicker bind:value>
		<DateRangePicker.Field>
			<DateRangePicker.Trigger />
		</DateRangePicker.Field>
		<DateRangePicker.Content>
			<DateRangePicker.Calendar />
		</DateRangePicker.Content>
	</DateRangePicker>
</Field>
<span data-testid="owner">{value ? `${value.start} ${value.end}` : 'undefined'}</span>
