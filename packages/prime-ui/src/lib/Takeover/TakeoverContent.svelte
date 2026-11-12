<!--
@component
The sheet of a [`Takeover`](./Takeover.svelte), rendered in a portal and filling the viewport on the dialog layer.

It is a white column with no overlay, border radius, or shadow. Put a `Takeover.Header` first, then the body. The body
scrolls when it overflows, so give it `min-h-0 flex-1 overflow-y-auto`. Focus is trapped inside while it is open,
Escape closes it, focus returns to the trigger, and the page behind does not scroll.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Dialog } from 'bits-ui';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

<Dialog.Portal>
	<Dialog.Content
		class={['fixed inset-0 z-dialog flex min-h-0 flex-col overflow-y-auto bg-white', extraClasses]}
		{...restProps}
	>
		{@render children?.()}
	</Dialog.Content>
</Dialog.Portal>
