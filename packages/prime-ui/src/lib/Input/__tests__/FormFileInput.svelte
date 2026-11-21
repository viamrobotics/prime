<script lang="ts">
	import FileInput from '../FileInput.svelte';

	interface Props {
		cancelReset?: boolean;
	}

	const { cancelReset = false }: Props = $props();

	let value = $state<File[]>([]);
</script>

<form
	onreset={(event) => {
		if (cancelReset) event.preventDefault();
	}}
>
	<FileInput aria-label="Upload" name="clip" bind:value />
	<button type="reset">Reset form</button>
</form>
<span data-testid="owner">{value.map((file) => file.name).join('|')}</span>
