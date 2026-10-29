<script lang="ts">
	import Checkbox from '../Checkbox.svelte';

	let checked = $state<boolean>();
</script>

<Checkbox bind:checked />
<span data-testid="owner">{String(checked)}</span>
