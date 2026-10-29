<!--
@component
The panel of a [`Dialog`](./Dialog.svelte), rendered in a portal above a dimmed overlay.

It carries chrome only. Set the width with `class`, such as `w-full max-w-md`. Focus is trapped inside
while it is open, Escape closes it, focus returns to the trigger, and the page behind does not scroll.
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
	<Dialog.Overlay class="fixed inset-0 z-overlay bg-black/40" />
	<Dialog.Content
		class={[
			'fixed top-1/2 left-1/2 z-dialog flex max-h-[calc(100vh-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col border border-medium bg-white p-4 shadow-sm',
			extraClasses
		]}
		{...restProps}
	>
		{@render children?.()}
	</Dialog.Content>
</Dialog.Portal>
