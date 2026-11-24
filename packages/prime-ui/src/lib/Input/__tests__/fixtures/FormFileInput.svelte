<script lang="ts">
	import FileInput from '../../FileInput.svelte';

	interface Props {
		cancelReset?: boolean;
		unmountOnReset?: boolean;
	}

	const { cancelReset = false, unmountOnReset = false }: Props = $props();

	let value = $state<File[]>([]);
	let isMounted = $state(true);
</script>

<div
	onreset={() => {
		if (unmountOnReset) isMounted = false;
	}}
>
	<form
		onreset={(event) => {
			if (cancelReset) event.preventDefault();
		}}
	>
		{#if isMounted}
			<FileInput aria-label="Upload" name="clip" bind:value />
		{/if}
		<button type="reset">Reset form</button>
	</form>
</div>
<span data-testid="owner">{value.map((file) => file.name).join('|')}</span>
