<script lang="ts">
	import { CalendarDate, type DateValue } from '@internationalized/date';
	import { untrack } from 'svelte';

	import Field from '../../../Field/Field.svelte';
	import { DatePicker } from '../../date-picker.ts';

	interface Props {
		empty?: boolean;
		disabled?: boolean;
		required?: boolean;
	}

	const { empty = false, disabled, required }: Props = $props();

	let value = $state<DateValue | undefined>(
		untrack(() => (empty ? undefined : new CalendarDate(2026, 3, 10)))
	);
</script>

<form onsubmit={(event) => event.preventDefault()}>
	<Field label="Start date">
		<DatePicker name="start" {disabled} {required} bind:value>
			<DatePicker.Field>
				<DatePicker.Trigger />
			</DatePicker.Field>
			<DatePicker.Content>
				<DatePicker.Calendar />
			</DatePicker.Content>
		</DatePicker>
	</Field>
</form>
