<script lang="ts">
	import { Select } from '../select.ts';

	const items = [
		{ value: 'move', label: 'Move' },
		{ value: 'rotate', label: 'Rotate' },
		{ value: 'scale', label: 'Scale' }
	];

	let value = $state<string>();
</script>

<Select {items} bind:value aria-label="Mode" placeholder="Pick a mode" />
<output data-testid="owner">{value}</output>
