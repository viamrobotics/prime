<script lang="ts">
	import { Menubar } from '../../Menu/menubar.ts';
</script>

<Menubar>
	<Menubar.Menu>
		<Menubar.Trigger>File</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Group>
				<Menubar.GroupHeading>Actions</Menubar.GroupHeading>
				<Menubar.Item>Copy <Menubar.Shortcut>Ctrl+C</Menubar.Shortcut></Menubar.Item>
				<Menubar.CheckboxItem checked>Pinned</Menubar.CheckboxItem>
			</Menubar.Group>
			<Menubar.Separator />
			<Menubar.RadioGroup value="a">
				<Menubar.RadioItem value="a">A</Menubar.RadioItem>
			</Menubar.RadioGroup>
			<Menubar.Sub>
				<Menubar.SubTrigger>More</Menubar.SubTrigger>
				<Menubar.SubContent><Menubar.Item>Nested</Menubar.Item></Menubar.SubContent>
			</Menubar.Sub>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar>
