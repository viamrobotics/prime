<script lang="ts">
	import { Field } from '../../../Field/field.ts';
	import { Combobox } from '../../combobox.ts';

	const items = [
		{ value: 'sm', label: 'Small' },
		{ value: 'md', label: 'Medium' },
		{ value: 'lg', label: 'Large' }
	];

	let value = $state<string>();
	let query = $state<string>();
</script>

<Field aria-label="Size">
	<Combobox {items} bind:value bind:query>
		<Combobox.Input placeholder="Pick a size" />
		<Combobox.Content>
			<Combobox.Viewport>
				<Combobox.Items />
			</Combobox.Viewport>
		</Combobox.Content>
	</Combobox>
</Field>
<span data-testid="owner">{String(value)}</span>
