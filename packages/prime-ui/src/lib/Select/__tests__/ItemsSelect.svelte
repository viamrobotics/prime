<script lang="ts">
	import { Select } from '../select.ts';
	import SelectItems from '../SelectItems.svelte';

	const items = [
		{ value: 'sm', label: 'Small' },
		{ value: 'md', label: 'Medium', disabled: true },
		{ value: 'lg', label: 'Large' }
	];

	let value = $state('sm');
</script>

<Select {items} bind:value>
	<Select.Trigger>
		<Select.Value placeholder="Pick a size" />
	</Select.Trigger>
	<Select.Portal>
		<Select.Content>
			<Select.Viewport>
				<SelectItems />
			</Select.Viewport>
		</Select.Content>
	</Select.Portal>
</Select>
<span data-testid="owner">{value}</span>
