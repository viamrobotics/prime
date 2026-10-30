<!--
@component
The panel of a [`ContextMenu`](./ContextMenu.svelte), portaled to the body and opened at the pointer. It closes on Escape, on a press outside, and when an item is activated.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { ContextMenu } from 'bits-ui';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/** Text direction of the panel. `auto` is not accepted, because positioning needs a concrete direction. */
		dir?: 'ltr' | 'rtl';
	}

	const uid = $props.id();

	const { id, class: extraClasses, children, ...restProps }: Props = $props();

	const contentId = $derived(id ?? `context-menu-${uid}`);
</script>

<ContextMenu.Portal>
	<ContextMenu.Content
		id={contentId}
		class={['z-menu min-w-40 rounded-sm border border-light bg-white p-1 shadow-sm', extraClasses]}
		{...restProps}
	>
		{@render children?.()}
	</ContextMenu.Content>
</ContextMenu.Portal>
