<script lang="ts">
	import { MultiSelect } from '../multi-select.ts';

	const { name }: { name?: string } = $props();

	const items = [
		{ value: 'sm', label: 'Small' },
		{ value: 'md', label: 'Medium' },
		{ value: 'lg', label: 'Large' }
	];

	let value = $state(['sm']);
</script>

<MultiSelect {items} {name} bind:value>
	<MultiSelect.Trigger>
		<MultiSelect.Value placeholder="Pick sizes" />
	</MultiSelect.Trigger>
	<MultiSelect.Portal>
		<MultiSelect.Content>
			<MultiSelect.Viewport>
				<MultiSelect.Items />
			</MultiSelect.Viewport>
		</MultiSelect.Content>
	</MultiSelect.Portal>
</MultiSelect>
<span data-testid="owner">{value.join(',')}</span>
