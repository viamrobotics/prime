<script lang="ts">
	import Folder from '../Folder.svelte';

	interface Props {
		open?: boolean;
		disabled?: boolean;
		summary?: string;
	}

	let { open = $bindable(true), disabled = false, summary }: Props = $props();
</script>

<Folder title="Lighting" {summary} bind:open {disabled}>
	<span>Intensity</span>
</Folder>
<output data-testid="open">{open}</output>
