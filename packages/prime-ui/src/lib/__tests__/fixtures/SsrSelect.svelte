<script lang="ts">
	import { Select } from '../../Select/select.ts';

	const items = [
		{ value: 'move', label: 'Move' },
		{ value: 'rotate', label: 'Rotate' }
	];
</script>

<Select {items} value="move">
	<Select.Trigger aria-label="Mode">
		<Select.Value placeholder="Pick a mode" />
	</Select.Trigger>
	<Select.Content>
		<Select.ScrollUpButton />
		<Select.Viewport>
			<Select.Items />
			<Select.Group>
				<Select.GroupHeading>Extras</Select.GroupHeading>
				<Select.Item value="scale" label="Scale" />
			</Select.Group>
		</Select.Viewport>
		<Select.ScrollDownButton />
	</Select.Content>
</Select>
