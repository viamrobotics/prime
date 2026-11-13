<script lang="ts">
	import Folder from '../Folder.svelte';

	interface Props {
		open?: boolean;
		disabled?: boolean;
	}

	let { open = $bindable(true), disabled = false }: Props = $props();
</script>

<Folder title="Lighting" bind:open {disabled}>
	<span>Intensity</span>
</Folder>
<output data-testid="open">{open}</output>
