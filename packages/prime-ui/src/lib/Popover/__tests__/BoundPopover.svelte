<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { Popover } from '../popover.ts';

	const {
		placement = {}
	}: { placement?: Pick<ComponentProps<typeof Popover.Content>, 'side' | 'align'> } = $props();

	let open = $state(false);
</script>

<div style="padding: 300px 0">
	<Popover bind:open>
		<Popover.Trigger class="button">Open</Popover.Trigger>
		<Popover.Content aria-label="Details" {...placement}>
			<p>Details</p>
			<input aria-label="Name" />
			<Popover.Close />
		</Popover.Content>
	</Popover>
</div>
<span data-testid="owner">{open}</span>
<button type="button">Outside</button>
