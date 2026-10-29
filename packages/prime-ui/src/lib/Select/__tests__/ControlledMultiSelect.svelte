<script lang="ts">
	import { MultiSelect } from '../multi-select.ts';

	interface Props {
		/** When false, the setter rejects every change (controlled veto). */
		accept?: boolean;
	}

	const { accept = false }: Props = $props();

	const items = [
		{ value: 'sm', label: 'Small' },
		{ value: 'md', label: 'Medium' },
		{ value: 'lg', label: 'Large' }
	];

	let value = $state(['sm']);
</script>

<MultiSelect
	{items}
	bind:value={
		() => value,
		(next) => {
			if (accept) value = next;
		}
	}
>
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
