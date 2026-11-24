<script lang="ts">
	import { Select } from '../../select.ts';

	const items = [
		{ value: 'a', label: 'Alpha' },
		{ value: 'b', label: 'Beta', disabled: true }
	];

	let value = $state<string>();
</script>

<Select bind:value {items}>
	<Select.Trigger aria-label="Mode">
		<Select.Value placeholder="Pick a mode" />
	</Select.Trigger>
	<Select.Content>
		<Select.Viewport>
			<Select.Items>
				{#snippet children({ item, selected })}
					<span>{item.label}:{selected}</span>
				{/snippet}
			</Select.Items>
		</Select.Viewport>
	</Select.Content>
</Select>
<output data-testid="owner">{value}</output>
