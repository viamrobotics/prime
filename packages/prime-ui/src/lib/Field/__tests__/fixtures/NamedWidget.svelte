<script lang="ts">
	import Checkbox from '../../../Checkbox/Checkbox.svelte';
	import { Combobox } from '../../../Combobox/combobox.ts';
	import { DatePicker } from '../../../DatePicker/date-picker.ts';
	import { DateRangePicker } from '../../../DateRangePicker/date-range-picker.ts';
	import { RadioGroup } from '../../../RadioGroup/radio-group.ts';
	import { Select } from '../../../Select/select.ts';
	import Switch from '../../../Switch/Switch.svelte';
	import { ToggleButtons } from '../../../ToggleButtons/toggle-buttons.ts';
	import Field from '../../Field.svelte';

	interface Props {
		control:
			| 'Checkbox'
			| 'Switch'
			| 'Select.Trigger'
			| 'Combobox.Input'
			| 'RadioGroup'
			| 'ToggleButtons'
			| 'DatePicker.Field'
			| 'DateRangePicker.Field';
		naming: 'none' | 'field' | 'aria-label' | 'label-for';
	}

	const { control, naming }: Props = $props();

	const CONTROL_ID = 'named-widget';

	const items = [
		{ value: 'sm', label: 'Small' },
		{ value: 'md', label: 'Medium' }
	];

	const attributes = $derived({
		id: naming === 'label-for' ? CONTROL_ID : undefined,
		'aria-label': naming === 'aria-label' ? 'Name' : undefined
	});
</script>

{#snippet rendered()}
	{#if control === 'Checkbox'}
		<Checkbox {...attributes} />
	{:else if control === 'Switch'}
		<Switch {...attributes} />
	{:else if control === 'Select.Trigger'}
		<Select {items}>
			<Select.Trigger {...attributes}>
				<Select.Value placeholder="Pick one" />
			</Select.Trigger>
		</Select>
	{:else if control === 'Combobox.Input'}
		<Combobox {items}>
			<Combobox.Input {...attributes} />
		</Combobox>
	{:else if control === 'RadioGroup'}
		<RadioGroup {...attributes}>
			<RadioGroup.Item value="sm">Small</RadioGroup.Item>
		</RadioGroup>
	{:else if control === 'ToggleButtons'}
		<ToggleButtons {...attributes} {items} />
	{:else if control === 'DatePicker.Field'}
		<DatePicker>
			<DatePicker.Field {...attributes} />
		</DatePicker>
	{:else}
		<DateRangePicker>
			<DateRangePicker.Field {...attributes} />
		</DateRangePicker>
	{/if}
{/snippet}

{#if naming === 'field'}
	<Field label="Name">
		{@render rendered()}
	</Field>
{:else}
	{#if naming === 'label-for'}
		<label for={CONTROL_ID}>Name</label>
	{/if}
	{@render rendered()}
{/if}
