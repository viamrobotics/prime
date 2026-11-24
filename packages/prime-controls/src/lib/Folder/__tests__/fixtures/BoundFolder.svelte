<script lang="ts">
	import type { ClassValue } from 'svelte/elements';

	import Folder from '../../Folder.svelte';

	interface Props {
		open?: boolean;
		disabled?: boolean;
		summary?: string;
		class?: ClassValue;
	}

	let { open = $bindable(true), disabled = false, summary, class: extraClasses }: Props = $props();
</script>

<Folder title="Lighting" {summary} bind:open {disabled} class={extraClasses}>
	<span>Intensity</span>
</Folder>
<output data-testid="open">{open}</output>
