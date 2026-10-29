<!--
@component
A dropdown menu: a list of actions in a panel anchored to a trigger. Render `Menu.Trigger` and `Menu.Content` inside it.
Arrow keys, Home, End, and typing move through the items, and Escape closes it.

Built on [bits-ui `DropdownMenu`](https://bits-ui.com/docs/components/dropdown-menu).

```svelte
<Menu bind:open>
	<Menu.Trigger class="button">Actions</Menu.Trigger>
	<Menu.Content>
		<Menu.Item onclick={rename}>
			<Icon icon={mdiPencil} size="sm" />
			Rename
		</Menu.Item>
		<Menu.Item variant="danger" onclick={remove}>Delete</Menu.Item>
	</Menu.Content>
</Menu>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	import { DropdownMenu } from 'bits-ui';

	interface Props {
		/** Whether the menu is open. Two-way bindable. */
		open?: boolean;

		/** The `Menu.*` parts. */
		children?: Snippet;
	}

	let { open = $bindable(), children }: Props = $props();
</script>

<DropdownMenu.Root bind:open={() => open ?? false, (next) => (open = next)}>
	{@render children?.()}
</DropdownMenu.Root>
