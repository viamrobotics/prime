<script lang="ts">
	import { untrack } from 'svelte';

	import { Select } from '../select.ts';

	let { initial, disabled }: { initial?: string; disabled?: boolean } = $props();

	const items = [
		{ value: 'move', label: 'Move' },
		{ value: 'rotate', label: 'Rotate' },
		{ value: 'scale', label: 'Scale' }
	];

	let value = $state(untrack(() => initial));
</script>

<Select bind:value {items} {disabled}>
	<Select.Trigger aria-label="Mode">
		<Select.Value placeholder="Pick a mode" />
	</Select.Trigger>
	<Select.Content>
		<Select.Viewport>
			<Select.Items />
		</Select.Viewport>
	</Select.Content>
</Select>
<output data-testid="owner">{value}</output>
