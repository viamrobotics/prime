<!--
@component
The area of a [`ContextMenu`](./ContextMenu.svelte) that opens it on right-click or long-press. It renders a `<div>` around its children. With `disabled`, right-clicks and long-presses
are ignored and the browser's own menu shows.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { ContextMenu } from 'bits-ui';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/** Ignore right-clicks and long-presses. @default false */
		disabled?: boolean;
	}

	const { children, ...restProps }: Props = $props();
</script>

<ContextMenu.Trigger {...restProps}>
	{@render children?.()}
</ContextMenu.Trigger>
