<script lang="ts">
	import NumberInput from '../NumberInput.svelte';

	interface Props {
		accept?: boolean;
	}

	const { accept = false }: Props = $props();

	let value = $state<number>();
</script>

<NumberInput
	bind:value={
		() => value,
		(v) => {
			if (accept) value = v;
		}
	}
/>
<span data-testid="owner">{value}</span>
