<script lang="ts">
	import { Tabs } from '../tabs.ts';

	const { accept = false }: { accept?: boolean } = $props();

	const labels: Record<string, string> = { overview: 'Overview', usage: 'Usage', api: 'API' };

	let order = $state(['overview', 'usage', 'api']);
</script>

<Tabs>
	<Tabs.List
		aria-label="Details"
		reorderable
		bind:order={
			() => order,
			(next) => {
				if (accept) order = next;
			}
		}
	>
		{#each order as id (id)}
			<Tabs.Trigger value={id}>{labels[id]}</Tabs.Trigger>
		{/each}
	</Tabs.List>
	{#each order as id (id)}
		<Tabs.Content value={id}>
			<p>{labels[id]} panel</p>
		</Tabs.Content>
	{/each}
</Tabs>
<span data-testid="order">{order.join(',')}</span>
