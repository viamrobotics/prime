<script lang="ts">
	import { Tabs } from '../tabs.ts';

	const { label = 'Details', disabled }: { label?: string; disabled?: string } = $props();

	const labels: Record<string, string> = { overview: 'Overview', usage: 'Usage', api: 'API' };

	let value = $state<string>('overview');
	let ids = $state(['overview', 'usage', 'api']);
</script>

<Tabs bind:value>
	<Tabs.List aria-label={label}>
		{#each ids as id (id)}
			<Tabs.Trigger value={id} disabled={id === disabled}>{labels[id]}</Tabs.Trigger>
		{/each}
	</Tabs.List>
	{#each ids as id (id)}
		<Tabs.Content value={id}>
			<p>{labels[id]} panel</p>
		</Tabs.Content>
	{/each}
</Tabs>
<span data-testid="owner">{value}</span>
<button type="button" onclick={() => (value = 'usage')}>Select Usage</button>
{#each Object.keys(labels) as id (id)}
	<button type="button" onclick={() => (ids = ids.filter((existing) => existing !== id))}>
		Remove {labels[id]}
	</button>
{/each}
