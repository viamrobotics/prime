<script lang="ts">
	import { untrack } from 'svelte';

	import { Tabs } from '../../tabs.ts';

	interface Tab {
		id: string;
		label: string;
	}

	interface Props {
		tabs: Tab[];
		initial?: string;
		// Keys each tab by its object, so fresh objects remount every trigger and panel.
		remount?: boolean;
	}

	const { tabs, initial = 'details', remount = false }: Props = $props();

	let value = $state<string>(untrack(() => initial));
	let writes = $state(0);
</script>

<Tabs
	bind:value={
		() => value,
		(next) => {
			value = next;
			writes += 1;
		}
	}
>
	<Tabs.List aria-label="Sections">
		{#each tabs as tab (remount ? tab : tab.id)}
			<Tabs.Trigger value={tab.id}>{tab.label}</Tabs.Trigger>
		{/each}
	</Tabs.List>
	{#each tabs as tab (remount ? tab : tab.id)}
		<Tabs.Content value={tab.id}>
			<p>{tab.label} panel</p>
		</Tabs.Content>
	{/each}
</Tabs>
<span data-testid="owner">{value}</span>
<span data-testid="writes">{writes}</span>
