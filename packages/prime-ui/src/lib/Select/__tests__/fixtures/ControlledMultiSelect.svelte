<script lang="ts">
	import { Field } from '../../../Field/field.ts';
	import { MultiSelect } from '../../multi-select.ts';

	interface Props {
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

<Field aria-label="Sizes">
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
		<MultiSelect.Content>
			<MultiSelect.Viewport>
				<MultiSelect.Items />
			</MultiSelect.Viewport>
		</MultiSelect.Content>
	</MultiSelect>
</Field>
<span data-testid="owner">{value.join(',')}</span>
