<script lang="ts">
	import { untrack } from 'svelte';

	import type { FieldState } from '../../../Field/state.ts';
	import type { SelectOption } from '../../../Select/option.ts';
	import type { ComboboxFilter } from '../../filter.ts';

	import { Field } from '../../../Field/field.ts';
	import { Input } from '../../../Input/input.ts';
	import { Combobox } from '../../combobox.ts';

	const {
		disabled,
		required,
		allowDeselect,
		filter,
		name,
		state: fieldState,
		initial = 'sm',
		items = [
			{ value: 'sm', label: 'Small' },
			{ value: 'md', label: 'Medium' },
			{ value: 'lg', label: 'Large' }
		]
	}: {
		disabled?: boolean;
		required?: boolean;
		allowDeselect?: boolean;
		filter?: ComboboxFilter;
		name?: string;
		state?: FieldState;
		initial?: string;
		items?: SelectOption[];
	} = $props();

	let value = $state(untrack(() => initial));
	let query = $state('');
</script>

<Field aria-label="Size">
	<Combobox {items} {disabled} {required} {allowDeselect} {filter} {name} bind:value bind:query>
		<Input.Group data-testid="group">
			<Combobox.Input state={fieldState} />
			<Combobox.Trigger />
		</Input.Group>
		<Combobox.Content>
			<Combobox.Viewport>
				<Combobox.Items />
				<Combobox.Empty>No matching size</Combobox.Empty>
			</Combobox.Viewport>
		</Combobox.Content>
	</Combobox>
</Field>
<Field aria-label="Plain">
	<Input data-testid="plain" />
</Field>
<span data-testid="owner">{value}</span>
<span data-testid="query">{query}</span>
