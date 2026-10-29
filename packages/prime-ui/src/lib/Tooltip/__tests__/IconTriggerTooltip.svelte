<script lang="ts">
	import { mdiInformationOutline } from '@mdi/js';

	import Icon from '../../Icon/Icon.svelte';
	import { Tooltip } from '../tooltip.ts';
</script>

<div style="padding: 120px 160px">
	<Tooltip openDelay={0}>
		<Tooltip.Trigger>
			<Icon icon={mdiInformationOutline} aria-label="About retries" tabindex={0} />
		</Tooltip.Trigger>
		<Tooltip.Content>Failed requests retry up to three times</Tooltip.Content>
	</Tooltip>
</div>
