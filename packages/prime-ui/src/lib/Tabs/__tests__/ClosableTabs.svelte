<script lang="ts">
	import { mdiClose } from '@mdi/js';

	import type { TabsVariant } from '../variant.ts';

	import Icon from '../../Icon/Icon.svelte';
	import { Tabs } from '../tabs.ts';

	interface Props {
		variant?: TabsVariant;
		extraTabCount?: number;
		width?: string;
		triggerClass?: string;
		reorderable?: boolean;
	}

	const { variant, extraTabCount = 0, width, triggerClass, reorderable = false }: Props = $props();

	const labels: Record<string, string> = { overview: 'Overview', usage: 'Usage', api: 'API' };

	let value = $state<string>();
	// svelte-ignore state_referenced_locally
	let ids = $state([
		'overview',
		'usage',
		'api',
		...Array.from({ length: extraTabCount }, (_, index) => `extra-${index}`)
	]);

	const labelOf = (id: string) => labels[id] ?? id;

	const close = (event: MouseEvent, id: string) => {
		event.stopPropagation();
		ids = ids.filter((existing) => existing !== id);
	};
</script>

<div style:width>
	<Tabs bind:value {variant}>
		<Tabs.List aria-label="Details" {reorderable} bind:order={ids}>
			{#each ids as id (id)}
				<Tabs.Trigger value={id} class={triggerClass}>
					<span>{labelOf(id)}</span>
					{#snippet actions()}
						<button
							type="button"
							class="icon-button"
							aria-label="Close {labelOf(id)}"
							onclick={(event) => close(event, id)}
						>
							<Icon icon={mdiClose} />
						</button>
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
