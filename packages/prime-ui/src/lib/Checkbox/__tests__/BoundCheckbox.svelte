<script lang="ts">
	import Checkbox from '../Checkbox.svelte';

	let checked = $state(false);
</script>

<Checkbox bind:checked />
<span data-testid="owner">{checked}</span>
