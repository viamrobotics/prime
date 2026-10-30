<script lang="ts">
	import Switch from '../Switch.svelte';

	let checked = $state<boolean>();
</script>

<Switch bind:checked />
<span data-testid="owner">{String(checked)}</span>
