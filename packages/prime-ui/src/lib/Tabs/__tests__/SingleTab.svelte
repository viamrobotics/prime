<script lang="ts">
	import { Tabs } from '../tabs.ts';

	const ids = ['overview'];
</script>

<Tabs>
	{#if ids.length > 1}
		<Tabs.List aria-label="Details">
			{#each ids as id (id)}
				<Tabs.Trigger value={id}>Overview</Tabs.Trigger>
			{/each}
		</Tabs.List>
	{/if}
	<Tabs.Content value="overview">
		<p>Overview panel</p>
	</Tabs.Content>
</Tabs>
