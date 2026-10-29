<script lang="ts">
	import { Menu } from '../menu.ts';

	let open = $state(false);
	let lock = $state(false);
</script>

<label>
	<input type="checkbox" bind:checked={lock} />
	Lock
</label>
<Menu
	bind:open={
		() => open,
		(next) => {
			if (next || !lock) open = next;
		}
	}
>
	<Menu.Trigger class="button">Open</Menu.Trigger>
	<Menu.Content aria-label="Actions">
		<Menu.Item>New</Menu.Item>
		<Menu.Item>Rename</Menu.Item>
	</Menu.Content>
</Menu>
<span data-testid="owner">{open}</span>
