<script lang="ts">
	import TextField from '../../TextField.svelte';

	let value = $state<string | undefined>();
</script>

<TextField label="Pin" bind:value />
<span data-testid="owner">{JSON.stringify(value ?? null)}</span>
