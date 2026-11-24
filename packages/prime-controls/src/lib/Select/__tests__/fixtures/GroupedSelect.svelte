<script lang="ts">
	import { Select } from '../../select.ts';

	const items = [
		{ value: 'a', label: 'Alpha' },
		{ value: 'b', label: 'Beta' }
	];

	let value = $state<string>();
</script>

<Select bind:value {items}>
	<Select.Trigger aria-label="Mode" class="trigger-extra">
		<Select.Value placeholder="Pick a mode" />
	</Select.Trigger>
	<Select.Content>
		<Select.Viewport>
			<Select.Group>
				<Select.GroupHeading>Modes</Select.GroupHeading>
				<Select.Item value="a" label="Alpha" class="item-extra" />
				<Select.Item value="b" label="Beta" disabled />
			</Select.Group>
		</Select.Viewport>
	</Select.Content>
</Select>
<output data-testid="owner">{value}</output>
