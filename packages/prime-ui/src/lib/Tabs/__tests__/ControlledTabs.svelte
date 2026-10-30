<script lang="ts">
	import { Tabs } from '../tabs.ts';

	const { accept = false }: { accept?: boolean } = $props();

	let value = $state<string>('overview');
</script>

<Tabs
	bind:value={
		() => value,
		(next) => {
			if (accept) value = next;
		}
	}
>
	<Tabs.List aria-label="Details">
		<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
		<Tabs.Trigger value="usage">Usage</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="overview">
		<p>Overview panel</p>
	</Tabs.Content>
	<Tabs.Content value="usage">
		<p>Usage panel</p>
	</Tabs.Content>
</Tabs>
<span data-testid="owner">{value}</span>
