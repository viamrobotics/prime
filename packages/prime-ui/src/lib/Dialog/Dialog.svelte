<!--
@component
A modal dialog. Render `Dialog.Trigger` and `Dialog.Content` inside it. The root renders no element.

Built on [bits-ui `Dialog`](https://bits-ui.com/docs/components/dialog).

```svelte
<Dialog bind:open>
	<Dialog.Trigger class="button">Open</Dialog.Trigger>
	<Dialog.Content class="w-full max-w-md">
		<Dialog.Title>Rename</Dialog.Title>
		<Dialog.Description>Pick a new name.</Dialog.Description>
		<Dialog.Close />
	</Dialog.Content>
</Dialog>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Dialog } from 'bits-ui';

	interface Props {
		/** Whether the dialog is open. Two-way bindable. */
		open?: boolean;

		/** The `Dialog.*` parts. */
		children?: Snippet;
	}

	let { open = $bindable(), children }: Props = $props();
</script>

<Dialog.Root bind:open={() => open ?? false, (next) => (open = next)}>
	{@render children?.()}
</Dialog.Root>
