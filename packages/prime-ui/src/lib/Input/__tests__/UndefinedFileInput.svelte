<script lang="ts">
	import FileInput from '../FileInput.svelte';

	let value = $state<File[] | undefined>(undefined);
</script>

<FileInput aria-label="Upload" bind:value />
<span data-testid="owner">{JSON.stringify(value?.map((file) => file.name))}</span>
