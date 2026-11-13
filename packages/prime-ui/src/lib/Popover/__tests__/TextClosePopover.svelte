<script lang="ts">
	import { Popover } from '../popover.ts';
</script>

<Popover>
	<Popover.Trigger class="button">Open</Popover.Trigger>
	<Popover.Content aria-label="Details">
		<p>Details</p>
		<Popover.Close class="button">Cancel</Popover.Close>
	</Popover.Content>
</Popover>
