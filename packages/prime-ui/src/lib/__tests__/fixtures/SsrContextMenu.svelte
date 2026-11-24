<script lang="ts">
	import { ContextMenu } from '../../Menu/context-menu.ts';
</script>

<ContextMenu>
	<ContextMenu.Trigger>Right click here</ContextMenu.Trigger>
	<ContextMenu.Content>
		<ContextMenu.Group>
			<ContextMenu.GroupHeading>Actions</ContextMenu.GroupHeading>
			<ContextMenu.Item>Copy <ContextMenu.Shortcut>Ctrl+C</ContextMenu.Shortcut></ContextMenu.Item>
			<ContextMenu.CheckboxItem checked>Pinned</ContextMenu.CheckboxItem>
		</ContextMenu.Group>
		<ContextMenu.Separator />
		<ContextMenu.RadioGroup value="a">
			<ContextMenu.RadioItem value="a">A</ContextMenu.RadioItem>
		</ContextMenu.RadioGroup>
		<ContextMenu.Sub>
			<ContextMenu.SubTrigger>More</ContextMenu.SubTrigger>
			<ContextMenu.SubContent><ContextMenu.Item>Nested</ContextMenu.Item></ContextMenu.SubContent>
		</ContextMenu.Sub>
	</ContextMenu.Content>
</ContextMenu>
