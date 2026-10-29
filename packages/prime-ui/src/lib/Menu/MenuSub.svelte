<!--
@component
A nested menu inside a [`Menu.Content`](./MenuContent.svelte). It holds one [`Menu.SubTrigger`](./MenuSubTrigger.svelte) and one [`Menu.SubContent`](./MenuSubContent.svelte).

```svelte
<Menu.Sub bind:open>
	<Menu.SubTrigger>Export</Menu.SubTrigger>
	<Menu.SubContent>
		<Menu.Item onclick={exportPdf}>PDF</Menu.Item>
	</Menu.SubContent>
</Menu.Sub>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	import { DropdownMenu } from 'bits-ui';

	interface Props {
		/** Whether the submenu is open. Two-way bindable. */
		open?: boolean;

		/** A `Menu.SubTrigger` and a `Menu.SubContent`. */
		children?: Snippet;
	}

	let { open = $bindable(), children }: Props = $props();
</script>

<DropdownMenu.Sub bind:open={() => open ?? false, (next) => (open = next)}>
	{@render children?.()}
</DropdownMenu.Sub>
