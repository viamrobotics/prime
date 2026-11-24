<script lang="ts">
	import Input from '../../Input.svelte';

	let value = $state('');
</script>

<Input aria-label="Name" bind:value />
<span data-testid="owner">{value}</span>
