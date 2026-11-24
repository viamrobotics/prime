<script lang="ts">
	import Input from '../../Input.svelte';

	interface Props {
		accept?: boolean;
	}

	const { accept = false }: Props = $props();

	let value = $state('');
</script>

<Input
	aria-label="Name"
	bind:value={
		() => value,
		(v) => {
			if (accept) value = v as string;
		}
	}
/>
<span data-testid="owner">{value}</span>
