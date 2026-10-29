<script lang="ts">
	import { mdiContentCopy } from '@mdi/js';

	import Icon from '../../Icon/Icon.svelte';
	import { Tooltip } from '../tooltip.ts';

	interface Props {
		/** When false, the setter rejects every change (controlled veto). */
		accept?: boolean;
	}

	const { accept = false }: Props = $props();

	let open = $state(false);
</script>

<div style="padding: 120px 160px">
	<Tooltip
		openDelay={0}
		bind:open={
			() => open,
			(next) => {
				if (accept) open = next;
			}
		}
	>
		<Tooltip.Trigger>
			<button type="button" class="icon-button" aria-label="Copy"
				><Icon icon={mdiContentCopy} /></button
			>
		</Tooltip.Trigger>
		<Tooltip.Content>Copy to clipboard</Tooltip.Content>
	</Tooltip>
</div>
<span data-testid="owner">{open}</span>
