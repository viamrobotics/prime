<script lang="ts">
	import Folder from '../../Folder.svelte';

	let open = $state<boolean | undefined>();
</script>

<Folder title="Lighting" bind:open>
	<span>Intensity</span>
</Folder>
<output data-testid="open">{open}</output>
