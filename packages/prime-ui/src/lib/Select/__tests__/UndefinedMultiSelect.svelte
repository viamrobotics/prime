<script lang="ts">
	import { MultiSelect } from '../multi-select.ts';

	const items = [
		{ value: 'sm', label: 'Small' },
		{ value: 'md', label: 'Medium' },
		{ value: 'lg', label: 'Large' }
	];

	let value = $state<string[]>();
</script>

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
<span data-testid="owner">{String(value)}</span>
