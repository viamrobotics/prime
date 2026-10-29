<script lang="ts">
	import { mdiContentCopy } from '@mdi/js';

	import Icon from '../../Icon/Icon.svelte';
	import { Tooltip } from '../tooltip.ts';

	let open = $state<boolean>();
</script>

<div style="padding: 120px 160px">
	<Tooltip openDelay={0} bind:open>
		<Tooltip.Trigger>
			<button type="button" class="icon-button" aria-label="Copy"
				><Icon icon={mdiContentCopy} /></button
			>
		</Tooltip.Trigger>
		<Tooltip.Content>Copy to clipboard</Tooltip.Content>
	</Tooltip>
</div>
<span data-testid="owner">{String(open)}</span>
