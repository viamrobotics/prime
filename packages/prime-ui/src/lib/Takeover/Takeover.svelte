<!--
@component
A full-viewport modal sheet. Render `Takeover.Trigger` and `Takeover.Content` inside it. The root renders no element.

Built on [bits-ui `Dialog`](https://bits-ui.com/docs/components/dialog).

```svelte
<Takeover bind:open>
	<Takeover.Trigger class="button">Open</Takeover.Trigger>
	<Takeover.Content>
		<Takeover.Header>
			<Takeover.Title>Settings</Takeover.Title>
			<Takeover.Close aria-label="Close" />
		</Takeover.Header>
		<p>Body</p>
	</Takeover.Content>
</Takeover>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	import DialogRoot from '../Dialog/Dialog.svelte';

	interface Props {
		/** Whether the sheet is open. Two-way bindable. */
		open?: boolean;

		/** The `Takeover.*` parts. */
		children?: Snippet;
	}

	let { open = $bindable(), children }: Props = $props();
</script>

<DialogRoot bind:open>
	{@render children?.()}
</DialogRoot>
