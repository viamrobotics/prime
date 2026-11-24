<script lang="ts">
	import type { DateValue } from '@internationalized/date';

	import Field from '../../../Field/Field.svelte';
	import { DatePicker } from '../../date-picker.ts';

	const { name }: { name?: string } = $props();

	let value = $state<DateValue>();
</script>

<Field label="Start date">
	<DatePicker {name} bind:value>
		<DatePicker.Field>
			<DatePicker.Trigger />
		</DatePicker.Field>
		<DatePicker.Content>
			<DatePicker.Calendar />
		</DatePicker.Content>
	</DatePicker>
</Field>
<span data-testid="owner">{String(value)}</span>
