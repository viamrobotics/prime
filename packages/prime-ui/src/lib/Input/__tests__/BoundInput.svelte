<script lang="ts">
	import Input from '../Input.svelte';

	let value = $state('');
</script>

<Input bind:value />
<span data-testid="owner">{value}</span>
