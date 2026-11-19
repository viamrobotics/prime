<script lang="ts">
	import type { FieldState } from '../state.ts';

	import Checkbox from '../../Checkbox/Checkbox.svelte';
	import { Combobox } from '../../Combobox/combobox.ts';
	import { DatePicker } from '../../DatePicker/date-picker.ts';
	import { DateRangePicker } from '../../DateRangePicker/date-range-picker.ts';
	import Hint from '../../Hint/Hint.svelte';
	import Label from '../../Label/Label.svelte';
	import { RadioGroup } from '../../RadioGroup/radio-group.ts';
	import { Select } from '../../Select/select.ts';
	import Switch from '../../Switch/Switch.svelte';
	import { ToggleButtons } from '../../ToggleButtons/toggle-buttons.ts';
	import Field from '../Field.svelte';

	const {
		disabled,
		required,
		state
	}: { disabled?: boolean; required?: boolean; state?: FieldState } = $props();

	const items = [
		{ value: 'sm', label: 'Small' },
		{ value: 'md', label: 'Medium' }
	];
</script>

<Field {disabled} {required} {state} data-testid="checkbox-field">
	<Checkbox />
	<Label>Accept</Label>
	<Hint>Checkbox hint</Hint>
</Field>

<Field {disabled} {required} {state} data-testid="radio-field">
	<Label>Size</Label>
	<RadioGroup>
		<RadioGroup.Item value="sm">Small</RadioGroup.Item>
		<RadioGroup.Item value="md">Medium</RadioGroup.Item>
	</RadioGroup>
	<Hint>Radio hint</Hint>
</Field>

<Field {disabled} {required} {state} data-testid="select-field">
	<Label>Size</Label>
	<Select {items}>
		<Select.Trigger>
			<Select.Value placeholder="Pick" />
		</Select.Trigger>
	</Select>
	<Hint>Select hint</Hint>
</Field>

<Field {disabled} {required} {state} data-testid="combobox-field">
	<Label>Region</Label>
	<Combobox {items}>
		<Combobox.Input />
		<Combobox.Trigger />
	</Combobox>
	<Hint>Combobox hint</Hint>
</Field>

<Field {disabled} {required} {state} data-testid="date-field">
	<Label>Start date</Label>
	<DatePicker>
		<DatePicker.Field>
			<DatePicker.Trigger />
		</DatePicker.Field>
	</DatePicker>
	<Hint>Date hint</Hint>
</Field>

<Field {disabled} {required} {state} data-testid="daterange-field">
	<Label>Reporting period</Label>
	<DateRangePicker>
		<DateRangePicker.Field>
			<DateRangePicker.Trigger />
		</DateRangePicker.Field>
	</DateRangePicker>
	<Hint>Date range hint</Hint>
</Field>

<Field {disabled} {required} {state} data-testid="switch-field">
	<Switch />
	<Label>Notify</Label>
	<Hint>Switch hint</Hint>
</Field>

<Field {disabled} {required} {state} data-testid="toggle-field">
	<Label>Units</Label>
	<ToggleButtons {items} />
	<Hint>Toggle hint</Hint>
</Field>
