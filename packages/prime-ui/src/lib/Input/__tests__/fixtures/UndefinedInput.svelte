<script lang="ts">
	import Input from '../../Input.svelte';

	let value = $state<string | undefined>(undefined);
</script>

<Input aria-label="Name" bind:value />
<span data-testid="owner">{JSON.stringify(value)}</span>
