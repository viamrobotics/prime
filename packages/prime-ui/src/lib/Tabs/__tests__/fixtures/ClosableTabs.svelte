<script lang="ts">
	import { untrack } from 'svelte';

	import type { TabsVariant } from '../../variant.ts';

	import { Tabs } from '../../tabs.ts';

	interface Props {
		variant?: TabsVariant;
		extraTabCount?: number;
		width?: string;
		triggerClass?: string;
		reorderable?: boolean;
		disabledTab?: string;
		statusTab?: string;
		hasMenu?: boolean;
		isRefusing?: boolean;
	}

	const {
		variant,
		extraTabCount = 0,
		width,
		triggerClass,
		reorderable = false,
		disabledTab,
		statusTab,
		hasMenu = false,
		isRefusing = false
	}: Props = $props();

	const labels: Record<string, string> = { overview: 'Overview', usage: 'Usage', api: 'API' };

	let value = $state<string>();
	let ids = $state(
		untrack(() => [
			'overview',
			'usage',
			'api',
			...Array.from({ length: extraTabCount }, (_, index) => `extra-${index}`)
		])
	);

	const labelOf = (id: string) => labels[id] ?? id;
</script>

{#snippet unsaved()}
	<span class="sr-only">Unsaved</span>
	<span aria-hidden="true">●</span>
{/snippet}

<div style:width>
	<Tabs bind:value {variant}>
		<Tabs.List
			aria-label="Details"
			{reorderable}
			closable
			bind:order={
				() => ids,
				(next) => {
					if (!isRefusing) ids = next;
				}
			}
		>
			{#each ids as id (id)}
				<Tabs.Trigger
					value={id}
					class={triggerClass}
					disabled={id === disabledTab}
					status={id === statusTab ? unsaved : undefined}
				>
					<span>{labelOf(id)}</span>
					{#snippet actions()}
						{#if hasMenu}
							<button
								type="button"
								aria-label="Options for {labelOf(id)}"
								onclick={(event) => event.stopPropagation()}
							>
								…
							</button>
						{/if}
					{/snippet}
				</Tabs.Trigger>
			{/each}
		</Tabs.List>
		{#each ids as id (id)}
			<Tabs.Content value={id}>
				<p>{labelOf(id)} panel</p>
			</Tabs.Content>
		{/each}
	</Tabs>
</div>
<button type="button" onclick={() => (value = ids.at(-1))}>Select last</button>
<span data-testid="owner">{String(value)}</span>
<span data-testid="order">{ids.join(',')}</span>
