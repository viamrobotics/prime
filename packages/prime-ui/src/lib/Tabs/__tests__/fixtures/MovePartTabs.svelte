<script lang="ts">
	import { Tabs } from '../../tabs.ts';

	const labels: Record<string, string> = { overview: 'Overview', usage: 'Usage', api: 'API' };

	let order = $state(['overview', 'usage', 'api']);
</script>

<Tabs>
	<Tabs.List aria-label="Details" reorderable bind:order>
		{#each order as id (id)}
			<Tabs.Trigger value={id}>
				{labels[id]}
				{#snippet actions()}
					<Tabs.MovePrevious />
					<Tabs.MoveNext />
				{/snippet}
			</Tabs.Trigger>
		{/each}
	</Tabs.List>
	{#each order as id (id)}
		<Tabs.Content value={id}>
			<p>{labels[id]} panel</p>
		</Tabs.Content>
	{/each}
</Tabs>
<span data-testid="order">{order.join(',')}</span>
