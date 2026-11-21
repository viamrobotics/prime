<script lang="ts">
	import Input from '../Input.svelte';

	let value = $state<string | undefined>(undefined);
</script>

<Input bind:value />
<span data-testid="owner">{JSON.stringify(value)}</span>
