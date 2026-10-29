<script lang="ts">
	import { Menu } from '../menu.ts';

	let hidden = $state(false);
	let locked = $state(true);
	let size = $state('Small');
</script>

<Menu>
	<Menu.Trigger class="button">Open</Menu.Trigger>
	<Menu.Content aria-label="Actions">
		<Menu.CheckboxItem bind:checked={hidden}>Show hidden</Menu.CheckboxItem>
		<Menu.CheckboxItem disabled bind:checked={locked}>Locked</Menu.CheckboxItem>
		<Menu.RadioGroup bind:value={size}>
			<Menu.GroupHeading>Size</Menu.GroupHeading>
			<Menu.RadioItem value="Small">Small</Menu.RadioItem>
			<Menu.RadioItem value="Medium">Medium</Menu.RadioItem>
			<Menu.RadioItem value="Large">Large</Menu.RadioItem>
		</Menu.RadioGroup>
		<Menu.Item>
			Save
			<Menu.Shortcut>⌘S</Menu.Shortcut>
		</Menu.Item>
	</Menu.Content>
</Menu>
<span data-testid="hidden">{hidden}</span>
<span data-testid="size">{size}</span>
