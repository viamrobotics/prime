<script lang="ts">
	import { Collapsible } from '../collapsible.ts';

	const { accept = false }: { accept?: boolean } = $props();

	let open = $state(false);
</script>

<Collapsible
	bind:open={
		() => open,
		(next) => {
			if (accept) open = next;
		}
	}
>
	<Collapsible.Trigger>Advanced</Collapsible.Trigger>
	<Collapsible.Content>
		<p>More settings</p>
	</Collapsible.Content>
</Collapsible>
<span data-testid="owner">{open}</span>
