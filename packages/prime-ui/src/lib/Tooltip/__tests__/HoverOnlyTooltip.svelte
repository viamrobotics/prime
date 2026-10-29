<script lang="ts">
	import { mdiInformationOutline } from '@mdi/js';

	import Icon from '../../Icon/Icon.svelte';
	import { Tooltip } from '../tooltip.ts';
</script>

<div style="padding: 120px 160px">
	<Tooltip openDelay={0}>
		<Tooltip.Trigger data-testid="trigger">
			<Icon icon={mdiInformationOutline} />
		</Tooltip.Trigger>
		<Tooltip.Content>More about this setting</Tooltip.Content>
	</Tooltip>
</div>
