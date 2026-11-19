<script lang="ts">
	import type { TabsVariant } from '../variant.ts';

	import { Tabs } from '../tabs.ts';

	interface Props {
		reorderable?: boolean;
		disabledTab?: string;
		variant?: TabsVariant;
	}

	const { reorderable = true, disabledTab, variant }: Props = $props();

	const INITIAL_ORDER = ['overview', 'usage', 'api'];
	const labels: Record<string, string> = { overview: 'Overview', usage: 'Usage', api: 'API' };
	const ariaLabels: Record<string, string> = { api: 'API reference' };

	let value = $state('overview');
	let order = $state([...INITIAL_ORDER]);
</script>

<Tabs bind:value {variant}>
	<Tabs.List aria-label="Details" {reorderable} bind:order>
		{#each order as id (id)}
			<Tabs.Trigger value={id} disabled={id === disabledTab} aria-label={ariaLabels[id]}>
				{labels[id]}
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
<span data-testid="owner">{value}</span>
<button type="button" onclick={() => (order = [...INITIAL_ORDER])}>Reset order</button>
<button type="button" onclick={() => (order = order.filter((id) => id !== 'usage'))}>
	Remove Usage
</button>
