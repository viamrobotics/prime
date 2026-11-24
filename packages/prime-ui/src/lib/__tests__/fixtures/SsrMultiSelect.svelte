<script lang="ts">
	import { MultiSelect } from '../../Select/multi-select.ts';

	const items = [
		{ value: 'move', label: 'Move' },
		{ value: 'rotate', label: 'Rotate' }
	];
</script>

<MultiSelect {items} value={['move']}>
	<MultiSelect.Trigger aria-label="Modes">
		<MultiSelect.Value placeholder="Pick modes" />
	</MultiSelect.Trigger>
	<MultiSelect.Content>
		<MultiSelect.ScrollUpButton />
		<MultiSelect.Viewport>
			<MultiSelect.Items />
			<MultiSelect.Group>
				<MultiSelect.GroupHeading>Extras</MultiSelect.GroupHeading>
				<MultiSelect.Item value="scale" label="Scale" />
			</MultiSelect.Group>
		</MultiSelect.Viewport>
		<MultiSelect.ScrollDownButton />
	</MultiSelect.Content>
</MultiSelect>
