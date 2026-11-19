<!--
@component
The panel of a [`ContextMenu`](./ContextMenu.svelte), portaled to the body and opened at the pointer. It closes on Escape, on a press outside, and when an item is activated.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { ContextMenu } from 'bits-ui';

	import { portalProps, type PortalTarget } from '../portal.ts';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/** Text direction of the panel. `auto` is not accepted, because positioning needs a concrete direction. */
		dir?: 'ltr' | 'rtl';

		/** Where the panel renders: `true` at the end of `<body>`, `false` in place, or inside an element or the first match of a CSS selector. @default true */
		portal?: PortalTarget;
	}

	const uid = $props.id();

	const { id, class: extraClasses, children, portal, ...restProps }: Props = $props();

	const contentId = $derived(id ?? `context-menu-${uid}`);
</script>

<ContextMenu.Portal {...portalProps(portal)}>
	<ContextMenu.Content
		id={contentId}
		class={[
			'z-menu min-w-40 rounded-sm border border-light bg-white p-1 shadow-popover',
			extraClasses
		]}
		{...restProps}
	>
		{@render children?.()}
	</ContextMenu.Content>
</ContextMenu.Portal>
