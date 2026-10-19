<script lang="ts">
	import Field from '../../Field/Field.svelte';
	import { Select } from '../select.ts';

	const items = [{ value: 'sm', label: 'Small' }];
</script>

<Field state="error">
	<Select {items}>
		<Select.Trigger>
			<Select.Value placeholder="Pick a size" />
		</Select.Trigger>
	</Select>
</Field>
