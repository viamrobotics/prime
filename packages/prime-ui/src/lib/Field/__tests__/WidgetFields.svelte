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

	interface WidgetOverride {
		disabled?: boolean;
		state?: FieldState;
	}

	interface Props {
		disabled?: boolean;
		required?: boolean;
		state?: FieldState;
		checkbox?: WidgetOverride;
		radio?: WidgetOverride;
		switch?: WidgetOverride;
		toggle?: WidgetOverride;
	}

	const {
		disabled,
		required,
		state: fieldState,
		checkbox = {},
		radio = {},
		switch: switchOverride = {},
		toggle = {}
	}: Props = $props();

	const items = [
		{ value: 'sm', label: 'Small' },
		{ value: 'md', label: 'Medium' }
	];
</script>

<Field {disabled} {required} state={fieldState} data-testid="checkbox-field">
	<Checkbox {...checkbox} />
	<Label>Accept</Label>
	<Hint>Checkbox hint</Hint>
</Field>

<Field {disabled} {required} state={fieldState} data-testid="radio-field">
	<Label>Size</Label>
	<RadioGroup {...radio}>
		<RadioGroup.Item value="sm">Small</RadioGroup.Item>
		<RadioGroup.Item value="md">Medium</RadioGroup.Item>
	</RadioGroup>
	<Hint>Radio hint</Hint>
</Field>

<Field {disabled} {required} state={fieldState} data-testid="select-field">
	<Label>Size</Label>
	<Select {items}>
		<Select.Trigger>
			<Select.Value placeholder="Pick" />
		</Select.Trigger>
	</Select>
	<Hint>Select hint</Hint>
</Field>

<Field {disabled} {required} state={fieldState} data-testid="combobox-field">
	<Label>Region</Label>
	<Combobox {items}>
		<Combobox.Input />
		<Combobox.Trigger />
	</Combobox>
	<Hint>Combobox hint</Hint>
</Field>

<Field {disabled} {required} state={fieldState} data-testid="date-field">
	<Label>Start date</Label>
	<DatePicker>
		<DatePicker.Field>
			<DatePicker.Trigger />
		</DatePicker.Field>
	</DatePicker>
	<Hint>Date hint</Hint>
</Field>

<Field {disabled} {required} state={fieldState} data-testid="daterange-field">
	<Label>Reporting period</Label>
	<DateRangePicker>
		<DateRangePicker.Field>
			<DateRangePicker.Trigger />
		</DateRangePicker.Field>
	</DateRangePicker>
	<Hint>Date range hint</Hint>
</Field>

<Field {disabled} {required} state={fieldState} data-testid="switch-field">
	<Switch {...switchOverride} />
	<Label>Notify</Label>
	<Hint>Switch hint</Hint>
</Field>

<Field {disabled} {required} state={fieldState} data-testid="toggle-field">
	<Label>Units</Label>
	<ToggleButtons {items} {...toggle} />
	<Hint>Toggle hint</Hint>
</Field>
