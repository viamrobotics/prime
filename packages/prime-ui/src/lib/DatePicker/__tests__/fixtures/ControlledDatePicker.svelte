<script lang="ts">
	import { CalendarDate, type DateValue } from '@internationalized/date';
	import { untrack } from 'svelte';

	import Field from '../../../Field/Field.svelte';
	import { DatePicker } from '../../date-picker.ts';

	interface Props {
		accept?: boolean;
		empty?: boolean;
	}

	const { accept = false, empty = false }: Props = $props();

	let value = $state<DateValue | undefined>(
		untrack(() => (empty ? undefined : new CalendarDate(2026, 3, 10)))
	);
</script>

<Field label="Start date">
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
</Field>
<span data-testid="owner">{String(value)}</span>
