<script lang="ts">
	import type { FieldState } from '../../Field/state.ts';

	import { Select } from '../select.ts';

	const {
		disabled,
		name,
		state: fieldState
	}: { disabled?: boolean; name?: string; state?: FieldState } = $props();

	const items = [
		{ value: 'sm', label: 'Small' },
		{ value: 'md', label: 'Medium' },
		{ value: 'lg', label: 'Large' }
	];

	let value = $state('sm');
</script>

<Select {items} {disabled} {name} bind:value>
	<Select.Trigger state={fieldState}>
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
