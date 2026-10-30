<script lang="ts">
	import { mdiClose } from '@mdi/js';

	import Icon from '../../Icon/Icon.svelte';
	import { Tabs } from '../tabs.ts';

	const labels: Record<string, string> = { overview: 'Overview', usage: 'Usage', api: 'API' };

	let value = $state<string>();
	let ids = $state(['overview', 'usage', 'api']);

	const close = (event: MouseEvent, id: string) => {
		event.stopPropagation();
		ids = ids.filter((existing) => existing !== id);
	};
</script>

<Tabs bind:value>
	<Tabs.List aria-label="Details">
		{#each ids as id (id)}
			<Tabs.Trigger value={id}>
				<span>{labels[id]}</span>
				<button
					type="button"
					class="icon-button"
					aria-label="Close {labels[id]}"
					onclick={(event) => close(event, id)}
				>
					<Icon icon={mdiClose} />
				</button>
			</Tabs.Trigger>
		{/each}
	</Tabs.List>
	{#each ids as id (id)}
		<Tabs.Content value={id}>
			<p>{labels[id]} panel</p>
		</Tabs.Content>
	{/each}
</Tabs>
<span data-testid="owner">{String(value)}</span>
