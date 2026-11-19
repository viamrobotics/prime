<script lang="ts">
	import { Combobox } from '../combobox.ts';

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

	let value = $state('sm');
</script>

<Combobox
	{items}
	bind:value={
		() => value,
		(next) => {
			if (accept) value = next;
		}
	}
>
	<Combobox.Input aria-label="Size" />
	<Combobox.Content>
		<Combobox.Viewport>
			<Combobox.Items />
		</Combobox.Viewport>
	</Combobox.Content>
</Combobox>
<span data-testid="owner">{value}</span>
