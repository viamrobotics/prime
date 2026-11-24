<script lang="ts">
	import { Field } from '../../../Field/field.ts';
	import { Select } from '../../select.ts';

	const items = [
		{ value: 'sm', label: 'Small' },
		{ value: 'md', label: 'Medium' },
		{ value: 'lg', label: 'Large' }
	];

	let value = $state<string>();
</script>

<Field aria-label="Size">
	<Select {items} bind:value>
		<Select.Trigger>
			<Select.Value placeholder="Pick a size" />
		</Select.Trigger>
		<Select.Content>
			<Select.Viewport>
				{#each items as item (item.value)}
					<Select.Item value={item.value} label={item.label} />
				{/each}
			</Select.Viewport>
		</Select.Content>
	</Select>
</Field>
<span data-testid="owner">{String(value)}</span>
