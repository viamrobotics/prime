<script lang="ts">
	import type { DateValue } from '@internationalized/date';

	import { DatePicker } from '../date-picker.ts';

	let value = $state<DateValue>();
</script>

<DatePicker bind:value>
	<DatePicker.Field>
		<DatePicker.Trigger />
	</DatePicker.Field>
	<DatePicker.Content>
		<DatePicker.Calendar />
	</DatePicker.Content>
</DatePicker>
<span data-testid="owner">{String(value)}</span>
