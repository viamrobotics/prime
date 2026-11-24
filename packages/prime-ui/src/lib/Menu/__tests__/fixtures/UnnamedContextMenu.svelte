<script lang="ts">
	import { ContextMenu } from '../../context-menu.ts';
</script>

<ContextMenu>
	<ContextMenu.Trigger>
		<div data-testid="area" style="width: 200px; height: 200px; margin: 100px">Area</div>
	</ContextMenu.Trigger>
	<ContextMenu.Content>
		<ContextMenu.Item>Copy</ContextMenu.Item>
	</ContextMenu.Content>
</ContextMenu>
