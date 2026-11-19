<script lang="ts">
	import FileInput from '../FileInput.svelte';

	let value = $state<File[]>([]);
</script>

<form>
	<FileInput aria-label="Upload" name="clip" bind:value />
	<button type="reset">Reset form</button>
</form>
<span data-testid="owner">{value.map((file) => file.name).join('|')}</span>
