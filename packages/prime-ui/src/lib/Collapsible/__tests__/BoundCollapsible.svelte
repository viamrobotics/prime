<script lang="ts">
	import { Collapsible } from '../collapsible.ts';

	const { disabled = false }: { disabled?: boolean } = $props();

	let open = $state(false);
</script>

<Collapsible bind:open {disabled}>
	<Collapsible.Trigger>
		<span>Advanced</span>
		<span>Extra settings</span>
	</Collapsible.Trigger>
	<Collapsible.Content>
		<p>More settings</p>
	</Collapsible.Content>
</Collapsible>
<button type="button" onclick={() => (open = !open)}>Toggle owner</button>
<span data-testid="owner">{open}</span>
