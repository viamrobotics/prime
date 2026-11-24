<script lang="ts">
	import { Field } from '../../../Field/field.ts';
	import { Select } from '../../select.ts';
	import SelectItems from '../../SelectItems.svelte';

	const items = [
		{ value: 'sm', label: 'Small' },
		{ value: 'lg', label: 'Large' }
	];
</script>

<Field aria-label="Size">
	<Select {items}>
		<Select.Trigger>
			<Select.Value placeholder="Pick a size" />
		</Select.Trigger>
		<Select.Content>
			<Select.Viewport>
				<SelectItems>
					{#snippet children({ item })}
						<span>{item.label.toUpperCase()}</span>
					{/snippet}
				</SelectItems>
			</Select.Viewport>
		</Select.Content>
	</Select>
</Field>
