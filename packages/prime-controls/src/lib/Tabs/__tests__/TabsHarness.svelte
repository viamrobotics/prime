<script lang="ts">
	import { Tabs } from '../tabs.ts';

	let { value = $bindable() }: { value?: string } = $props();
</script>

<Tabs bind:value>
	<Tabs.List aria-label="Mode">
		<Tabs.Trigger value="move">Move</Tabs.Trigger>
		<Tabs.Trigger value="rotate">Rotate</Tabs.Trigger>
		<Tabs.Trigger value="scale">Scale</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="move">Move controls</Tabs.Content>
	<Tabs.Content value="rotate">Rotate controls</Tabs.Content>
	<Tabs.Content value="scale">Scale controls</Tabs.Content>
</Tabs>
