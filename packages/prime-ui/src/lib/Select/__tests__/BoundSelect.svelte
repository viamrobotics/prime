<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	import type { FieldState } from '../../Field/state.ts';

	import { Select } from '../select.ts';

	const {
		allowDeselect,
		class: triggerClass,
		disabled,
		name,
		state: fieldState
	}: {
		allowDeselect?: boolean;
		class?: ClassValue;
		disabled?: boolean;
		name?: string;
		state?: FieldState;
	} = $props();

	const items = [
		{ value: 'sm', label: 'Small' },
		{ value: 'md', label: 'Medium' },
		{ value: 'lg', label: 'Large' }
	];

	let value = $state('sm');
</script>

<Select {items} {allowDeselect} {disabled} {name} bind:value>
	<Select.Trigger class={triggerClass} state={fieldState}>
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
