<script lang="ts">
	import { Popover } from '../popover.ts';

	let open = $state<boolean>();
</script>

<Popover bind:open>
	<Popover.Trigger class="button">Open</Popover.Trigger>
	<Popover.Content aria-label="Details">
		<p>Details</p>
		<input aria-label="Name" />
		<Popover.Close />
	</Popover.Content>
</Popover>
<span data-testid="owner">{String(open)}</span>
