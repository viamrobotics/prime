<!--
@component
The panel of a [`Dialog`](./Dialog.svelte), rendered in a portal above a dimmed overlay.

It carries the panel styling only. Set the width with `class`, such as `w-full max-w-md`. Focus is trapped inside
while it is open, Escape closes it, focus returns to the trigger, and the page behind does not scroll.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Dialog } from 'bits-ui';

	import { portalProps, type PortalTarget } from '../portal.ts';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/** Where the panel renders: `true` at the end of `<body>`, `false` in place, or inside an element or the first match of a CSS selector. @default true */
		portal?: PortalTarget;
	}

	const { class: extraClasses, children, portal, ...restProps }: Props = $props();
</script>

<Dialog.Portal {...portalProps(portal)}>
	<Dialog.Overlay class="fixed inset-0 z-overlay bg-scrim" />
	<Dialog.Content
		class={[
			'fixed top-1/2 left-1/2 z-dialog flex max-h-[calc(100dvh-var(--spacing)*8)] -translate-x-1/2 -translate-y-1/2 flex-col rounded-sm border border-medium bg-white p-4 shadow-dialog',
			extraClasses
		]}
		{...restProps}
	>
		{@render children?.()}
	</Dialog.Content>
</Dialog.Portal>
