<script lang="ts">
	import { Select } from '../select.ts';

	const items = [
		{ value: 'move', label: 'Move' },
		{ value: 'rotate', label: 'Rotate' }
	];

	let value = $state<string>();
</script>

<Select {items} bind:value aria-label="Mode" hint="How the gizmo moves the part" />
