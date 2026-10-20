<script lang="ts">
	import { Select } from '../select.ts';

	const { disabled }: { disabled?: boolean } = $props();

	const items = [
		{ value: 'sm', label: 'Small' },
		{ value: 'md', label: 'Medium' },
		{ value: 'lg', label: 'Large' }
	];

	let value = $state('sm');
</script>

<Select {items} {disabled} bind:value>
	<Select.Trigger>
		<Select.Value placeholder="Pick a size" />
	</Select.Trigger>
	<Select.Portal>
		<Select.Content>
			<Select.Viewport>
				{#each items as item (item.value)}
					<Select.Item value={item.value} label={item.label} />
				{/each}
			</Select.Viewport>
		</Select.Content>
	</Select.Portal>
</Select>
<span data-testid="owner">{value}</span>
