<script lang="ts">
	import NumberInput from '../../NumberInput.svelte';

	let value = $state<number | undefined>(3);
</script>

<NumberInput aria-label="Quantity" bind:value />
<span data-testid="owner">{JSON.stringify(value) ?? 'undefined'}</span>
