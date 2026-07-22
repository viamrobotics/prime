<script lang="ts">
	import Checkbox from '../../Checkbox/Checkbox.svelte';
	import Hint from '../../Hint/Hint.svelte';
	import Label from '../../Label/Label.svelte';
	import { RadioGroup } from '../../RadioGroup/radio-group.ts';
	import { Select } from '../../Select/select.ts';
	import Field from '../Field.svelte';

	const { disabled, required }: { disabled?: boolean; required?: boolean } = $props();

	const items = [
		{ value: 'sm', label: 'Small' },
		{ value: 'md', label: 'Medium' }
	];
</script>

<Field {disabled} {required} data-testid="checkbox-field">
	<Checkbox />
	<Label>Accept</Label>
	<Hint>Checkbox hint</Hint>
</Field>

<Field {disabled} {required} data-testid="radio-field">
	<Label>Size</Label>
	<RadioGroup>
		<RadioGroup.Item value="sm">Small</RadioGroup.Item>
		<RadioGroup.Item value="md">Medium</RadioGroup.Item>
	</RadioGroup>
	<Hint>Radio hint</Hint>
</Field>

<Field {disabled} {required} data-testid="select-field">
	<Label>Size</Label>
	<Select {items}>
		<Select.Trigger>
			<Select.Value placeholder="Pick" />
		</Select.Trigger>
	</Select>
	<Hint>Select hint</Hint>
</Field>
