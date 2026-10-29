<!--
@component
A popover: a non-modal panel anchored to a trigger. Render `Popover.Trigger` and `Popover.Content` inside it.
The page stays interactive while it is open.

Built on [bits-ui `Popover`](https://bits-ui.com/docs/components/popover).

```svelte
<Popover bind:open>
	<Popover.Trigger class="button">Open</Popover.Trigger>
	<Popover.Content>
		<p>Details</p>
		<Popover.Close />
	</Popover.Content>
</Popover>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Popover } from 'bits-ui';

	interface Props {
		/** Whether the popover is open. Two-way bindable. */
		open?: boolean;

		/** The `Popover.*` parts. */
		children?: Snippet;
	}

	let { open = $bindable(), children }: Props = $props();
</script>

<Popover.Root bind:open={() => open ?? false, (next) => (open = next)}>
	{@render children?.()}
</Popover.Root>
