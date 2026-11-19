<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import FileInput from '../FileInput.svelte';

	type Props = Omit<ComponentProps<typeof FileInput>, 'value'>;

	const { ...rest }: Props = $props();

	let value = $state<File[]>([]);
</script>

<FileInput aria-label="Upload" {...rest} bind:value />
<button type="button" onclick={() => (value = [])}>Reset</button>
<span data-testid="owner">{value.map((file) => file.name).join('|')}</span>
