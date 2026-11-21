<script lang="ts">
	import { Popover } from '../popover.ts';

	interface Props {
		label?: string;
	}

	const { label }: Props = $props();
</script>

<Popover>
	<Popover.Trigger class="button">Open</Popover.Trigger>
	<Popover.Content aria-label="Details">
		<p>Details</p>
		<Popover.Close class="button" aria-label={label}>Cancel</Popover.Close>
	</Popover.Content>
</Popover>
