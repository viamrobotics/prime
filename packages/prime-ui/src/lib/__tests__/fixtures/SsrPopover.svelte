<script lang="ts">
	import { Popover } from '../../Popover/popover.ts';
</script>

<Popover>
	<Popover.Trigger>Open popover</Popover.Trigger>
	<Popover.Content aria-label="Details">
		Details
		<Popover.Close aria-label="Close" />
	</Popover.Content>
</Popover>
