<script lang="ts">
	import { Combobox } from '../../Combobox/combobox.ts';

	const items = [
		{ value: 'move', label: 'Move' },
		{ value: 'rotate', label: 'Rotate' }
	];
</script>

<Combobox {items}>
	<Combobox.Input aria-label="Mode" placeholder="Pick a mode" />
	<Combobox.Trigger aria-label="Open modes" />
	<Combobox.Content>
		<Combobox.Viewport>
			<Combobox.Items />
			<Combobox.Group>
				<Combobox.GroupHeading>Extras</Combobox.GroupHeading>
				<Combobox.Item value="scale" label="Scale" />
			</Combobox.Group>
			<Combobox.Empty>No matches</Combobox.Empty>
		</Combobox.Viewport>
	</Combobox.Content>
</Combobox>
