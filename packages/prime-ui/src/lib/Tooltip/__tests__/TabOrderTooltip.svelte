<script lang="ts">
	import { Tooltip } from '../tooltip.ts';
</script>

<input aria-label="Before" />
<Tooltip openDelay={0}>
	<Tooltip.Trigger>
		<button type="button">Copy</button>
	</Tooltip.Trigger>
	<Tooltip.Content>Copy to clipboard</Tooltip.Content>
</Tooltip>
