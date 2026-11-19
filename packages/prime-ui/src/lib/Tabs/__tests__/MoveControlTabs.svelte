<script lang="ts">
	import { Tabs } from '../tabs.ts';

	interface Props {
		disabledTab?: string;
		isRefusing?: boolean;
		isUnbound?: boolean;
	}

	const { disabledTab, isRefusing = false, isUnbound = false }: Props = $props();

	const labels: Record<string, string> = { overview: 'Overview', usage: 'Usage', api: 'API' };

	let order = $state(['overview', 'usage', 'api']);
	const ids = ['overview', 'usage', 'api'];
</script>

<Tabs>
	{#if isUnbound}
		<Tabs.List aria-label="Details" reorderable>
			{#each ids as id (id)}
				<Tabs.Trigger value={id} disabled={id === disabledTab}>
					{labels[id]}
					{#snippet actions({ movePrevious, moveNext, canMovePrevious, canMoveNext })}
						<button type="button" disabled={!canMovePrevious} onclick={movePrevious}>
							Move {labels[id]} left
						</button>
						<button type="button" disabled={!canMoveNext} onclick={moveNext}>
							Move {labels[id]} right
						</button>
					{/snippet}
				</Tabs.Trigger>
			{/each}
		</Tabs.List>
	{:else}
		<Tabs.List
			aria-label="Details"
			reorderable
			bind:order={
				() => order,
				(next) => {
					if (!isRefusing) order = next;
				}
			}
		>
			{#each order as id (id)}
				<Tabs.Trigger value={id} disabled={id === disabledTab}>
					{labels[id]}
					{#snippet actions({ movePrevious, moveNext, canMovePrevious, canMoveNext })}
						<button type="button" disabled={!canMovePrevious} onclick={movePrevious}>
							Move {labels[id]} left
						</button>
						<button type="button" disabled={!canMoveNext} onclick={moveNext}>
							Move {labels[id]} right
						</button>
					{/snippet}
				</Tabs.Trigger>
			{/each}
		</Tabs.List>
	{/if}
</Tabs>
<span data-testid="order">{order.join(',')}</span>
