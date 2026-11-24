<script lang="ts">
	import Folder from '../../Folder.svelte';

	let { summary }: { summary?: string } = $props();
</script>

<Folder title="Lighting" {summary}>
	{#snippet indicator({ open }: { open: boolean })}
		<span data-testid="indicator" aria-hidden="true">{open ? 'Hide' : 'Show'}</span>
	{/snippet}
	<span>Intensity</span>
</Folder>
