<script lang="ts">
	import { Popover } from '../popover.ts';

	const { accept = false }: { accept?: boolean } = $props();

	let open = $state(false);
</script>

<Popover
	bind:open={
		() => open,
		(next) => {
			if (accept) open = next;
		}
	}
>
	<Popover.Trigger class="button">Open</Popover.Trigger>
	<Popover.Content aria-label="Details">
		<p>Details</p>
		<input aria-label="Name" />
		<Popover.Close />
	</Popover.Content>
</Popover>
<span data-testid="owner">{open}</span>
