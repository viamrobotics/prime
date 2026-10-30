<script lang="ts">
	import Textarea from '../Textarea.svelte';

	interface Props {
		accept?: boolean;
	}

	const { accept = false }: Props = $props();

	let value = $state('');
</script>

<Textarea
	bind:value={
		() => value,
		(v) => {
			if (accept) value = v as string;
		}
	}
/>
<span data-testid="owner">{value}</span>
