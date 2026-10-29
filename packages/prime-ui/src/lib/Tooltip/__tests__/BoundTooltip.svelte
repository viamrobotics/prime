<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { mdiContentCopy } from '@mdi/js';

	import Icon from '../../Icon/Icon.svelte';
	import { Tooltip } from '../tooltip.ts';

	type Props = Pick<ComponentProps<typeof Tooltip>, 'disabled' | 'interactive' | 'openDelay'> &
		Pick<ComponentProps<typeof Tooltip.Content>, 'placement'>;

	const { disabled, interactive, openDelay, placement }: Props = $props();

	let open = $state(false);
</script>

<div style="padding: 120px 160px">
	<Tooltip bind:open {disabled} {interactive} {openDelay}>
		<Tooltip.Trigger>
			<button type="button" class="icon-button" aria-label="Copy"
				><Icon icon={mdiContentCopy} /></button
			>
		</Tooltip.Trigger>
		<Tooltip.Content {placement}>Copy to clipboard</Tooltip.Content>
	</Tooltip>
</div>
<span data-testid="owner">{open}</span>
