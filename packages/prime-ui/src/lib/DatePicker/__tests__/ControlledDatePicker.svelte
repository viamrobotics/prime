<script lang="ts">
	import { CalendarDate, type DateValue } from '@internationalized/date';

	import { DatePicker } from '../date-picker.ts';

	interface Props {
		/** When false, the setter rejects every change (controlled veto). */
		accept?: boolean;
	}

	const { accept = false }: Props = $props();

	let value = $state<DateValue | undefined>(new CalendarDate(2026, 3, 10));
</script>

<DatePicker
	bind:value={
		() => value,
		(next) => {
			if (accept) value = next;
		}
	}
>
	<DatePicker.Field>
		<DatePicker.Trigger />
	</DatePicker.Field>
	<DatePicker.Content>
		<DatePicker.Calendar />
	</DatePicker.Content>
</DatePicker>
<span data-testid="owner">{String(value)}</span>
