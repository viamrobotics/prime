<script lang="ts">
	import { Menu } from '../../Menu/menu.ts';
</script>

<Menu>
	<Menu.Trigger>Open menu</Menu.Trigger>
	<Menu.Content>
		<Menu.Group>
			<Menu.GroupHeading>Actions</Menu.GroupHeading>
			<Menu.Item>Copy <Menu.Shortcut>Ctrl+C</Menu.Shortcut></Menu.Item>
			<Menu.CheckboxItem checked>Pinned</Menu.CheckboxItem>
		</Menu.Group>
		<Menu.Separator />
		<Menu.RadioGroup value="a">
			<Menu.RadioItem value="a">A</Menu.RadioItem>
		</Menu.RadioGroup>
		<Menu.Sub>
			<Menu.SubTrigger>More</Menu.SubTrigger>
			<Menu.SubContent><Menu.Item>Nested</Menu.Item></Menu.SubContent>
		</Menu.Sub>
	</Menu.Content>
</Menu>
