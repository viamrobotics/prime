<script lang="ts">
	import { Field } from '../../../Field/field.ts';
	import { Select } from '../../select.ts';

	const items = [{ value: 'sm', label: 'Small' }];
</script>

<Field aria-label="Size">
	<Select {items} value="sm">
		<Select.Trigger>
			<Select.Value placeholder="Pick a size" />
			{#snippet indicator()}
				<span data-testid="indicator">v</span>
			{/snippet}
		</Select.Trigger>
	</Select>
</Field>
