<script lang="ts">
	import { Field } from '../../../Field/field.ts';
	import { MultiSelect } from '../../multi-select.ts';

	const items = [
		{ value: 'sm', label: 'Small' },
		{ value: 'md', label: 'Medium' },
		{ value: 'lg', label: 'Large' }
	];

	let value = $state<string[]>();
</script>

<Field aria-label="Sizes">
	<MultiSelect {items} bind:value>
		<MultiSelect.Trigger>
			<MultiSelect.Value placeholder="Pick sizes" />
		</MultiSelect.Trigger>
		<MultiSelect.Content>
			<MultiSelect.Viewport>
				<MultiSelect.Items />
			</MultiSelect.Viewport>
		</MultiSelect.Content>
	</MultiSelect>
</Field>
<span data-testid="owner">{String(value)}</span>
