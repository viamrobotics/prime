<script lang="ts">
	import { Input } from '../../Input/input.ts';
	import { Combobox } from '../combobox.ts';

	const items = [{ value: 'sm', label: 'Small' }];
</script>

<Combobox {items} value="sm">
	<Input.Group>
		<Combobox.Input aria-label="Size" />
		<Combobox.Trigger>
			{#snippet indicator()}
				<span data-testid="indicator">v</span>
			{/snippet}
		</Combobox.Trigger>
	</Input.Group>
</Combobox>
