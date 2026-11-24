<script lang="ts">
	import { Tabs } from '../../Tabs/tabs.ts';
</script>

<Tabs value="move">
	<Tabs.List aria-label="Mode">
		<Tabs.Trigger value="move">Move</Tabs.Trigger>
		<Tabs.Trigger value="rotate">Rotate</Tabs.Trigger>
	</Tabs.List>
	<Tabs.Content value="move">Move content</Tabs.Content>
	<Tabs.Content value="rotate">Rotate content</Tabs.Content>
</Tabs>
