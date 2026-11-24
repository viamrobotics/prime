<script lang="ts">
	import FileInput from '../../FileInput.svelte';

	interface Props {
		accept?: boolean;
	}

	const { accept = false }: Props = $props();

	let value = $state<File[]>([]);
</script>

<FileInput
	aria-label="Upload"
	bind:value={
		() => value,
		(next) => {
			if (accept && next) value = next;
		}
	}
/>
<span data-testid="owner">{value.map((file) => file.name).join('|')}</span>
