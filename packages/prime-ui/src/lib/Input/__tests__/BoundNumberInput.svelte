<script lang="ts">
	import NumberInput from '../NumberInput.svelte';

	let value = $state<number>();
</script>

<NumberInput bind:value />
<span data-testid="owner">{String(value)}</span>
