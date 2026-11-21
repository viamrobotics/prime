<script lang="ts">
	import { Select } from '../select.ts';

	interface Props {
		accept?: boolean;
	}

	const { accept = false }: Props = $props();

	const items = [
		{ value: 'sm', label: 'Small' },
		{ value: 'md', label: 'Medium' },
		{ value: 'lg', label: 'Large' }
	];

	let value = $state('sm');
</script>

<Select
	{items}
	bind:value={
		() => value,
		(next) => {
			if (accept) value = next;
		}
	}
>
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
<span data-testid="owner">{value}</span>
