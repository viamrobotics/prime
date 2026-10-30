<script lang="ts">
	import { Tabs } from '../tabs.ts';

	let value = $state<string>();
</script>

<Tabs bind:value>
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
<span data-testid="owner">{String(value)}</span>
