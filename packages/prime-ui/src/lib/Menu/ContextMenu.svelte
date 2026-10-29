<!--
@component
A context menu: a panel opened by right-click or long-press on its trigger area. Render `ContextMenu.Trigger` and `ContextMenu.Content` inside it.

Built on [bits-ui `ContextMenu`](https://bits-ui.com/docs/components/context-menu).

The item parts are the same components as `Menu`'s, so `ContextMenu.Item`, `ContextMenu.CheckboxItem`, and the rest are documented on the `Menu` page.

```svelte
<ContextMenu bind:open>
	<ContextMenu.Trigger>Right-click here</ContextMenu.Trigger>
	<ContextMenu.Content>
		<ContextMenu.Item onclick={copy}>Copy</ContextMenu.Item>
		<ContextMenu.Item onclick={paste}>Paste</ContextMenu.Item>
	</ContextMenu.Content>
</ContextMenu>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	import { ContextMenu } from 'bits-ui';

	interface Props {
		/** Whether the menu is open. Two-way bindable. */
		open?: boolean;

		/** The `ContextMenu.*` parts. */
		children?: Snippet;
	}

	let { open = $bindable(), children }: Props = $props();
</script>

<ContextMenu.Root bind:open={() => open ?? false, (next) => (open = next)}>
	{@render children?.()}
</ContextMenu.Root>
