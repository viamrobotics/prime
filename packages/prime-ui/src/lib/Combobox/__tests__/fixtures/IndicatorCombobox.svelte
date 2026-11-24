<script lang="ts">
	import { Field } from '../../../Field/field.ts';
	import { Input } from '../../../Input/input.ts';
	import { Combobox } from '../../combobox.ts';

	const items = [{ value: 'sm', label: 'Small' }];
</script>

<Field aria-label="Size">
	<Combobox {items} value="sm">
		<Input.Group>
			<Combobox.Input />
			<Combobox.Trigger>
				{#snippet indicator()}
					<span data-testid="indicator">v</span>
				{/snippet}
			</Combobox.Trigger>
		</Input.Group>
	</Combobox>
</Field>
