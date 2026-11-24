<script lang="ts">
	import { Tabs } from '../../Tabs/tabs.ts';
</script>

<Tabs value="move">
	<Tabs.List aria-label="Mode">
		<Tabs.Trigger value="move">Move</Tabs.Trigger>
		<Tabs.Trigger value="rotate">Rotate</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="move">Move controls</Tabs.Content>
	<Tabs.Content value="rotate">Rotate controls</Tabs.Content>
</Tabs>
