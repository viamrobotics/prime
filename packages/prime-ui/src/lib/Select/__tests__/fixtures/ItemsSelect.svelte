<script lang="ts">
	import { Field } from '../../../Field/field.ts';
	import { Select } from '../../select.ts';
	import SelectItems from '../../SelectItems.svelte';

	const items = [
		{ value: 'sm', label: 'Small' },
		{ value: 'md', label: 'Medium', disabled: true },
		{ value: 'lg', label: 'Large' }
	];

	let value = $state('sm');
</script>

<Field aria-label="Size">
	<Select {items} bind:value>
		<Select.Trigger>
			<Select.Value placeholder="Pick a size" />
		</Select.Trigger>
		<Select.Content>
			<Select.Viewport>
				<SelectItems />
			</Select.Viewport>
		</Select.Content>
	</Select>
</Field>
<span data-testid="owner">{value}</span>
