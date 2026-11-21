<script lang="ts">
	import NumberInput from '../NumberInput.svelte';

	let value = $state<number | undefined>(undefined);
</script>

<NumberInput bind:value />
<span data-testid="owner">{JSON.stringify(value) ?? 'undefined'}</span>
