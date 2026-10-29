<script lang="ts">
	import { Menu } from '../menu.ts';

	let lock = $state(false);
	let hidden = $state(false);
	let size = $state('Small');
</script>

<label>
	<input type="checkbox" bind:checked={lock} />
	Lock
</label>
<Menu>
	<Menu.Trigger class="button">Open</Menu.Trigger>
	<Menu.Content aria-label="Actions">
		<Menu.CheckboxItem
			bind:checked={
				() => hidden,
				(next) => {
					if (!lock) hidden = next;
				}
			}
		>
			Show hidden
		</Menu.CheckboxItem>
		<Menu.RadioGroup
			bind:value={
				() => size,
				(next) => {
					if (!lock) size = next;
				}
			}
		>
			<Menu.RadioItem value="Small">Small</Menu.RadioItem>
			<Menu.RadioItem value="Medium">Medium</Menu.RadioItem>
		</Menu.RadioGroup>
	</Menu.Content>
</Menu>
<span data-testid="hidden">{hidden}</span>
<span data-testid="size">{size}</span>
