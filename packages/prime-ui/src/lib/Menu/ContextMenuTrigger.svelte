<!--
@component
The area of a [`ContextMenu`](./ContextMenu.svelte) that opens it on right-click or long-press. It renders a `<div>` around its children. With `disabled`, right-clicks and long-presses
are ignored and the browser's own menu shows.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { ContextMenu } from 'bits-ui';

	import { useTriggerName } from './useTriggerName.svelte.ts';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/** Ignore right-clicks and long-presses. @default false */
		disabled?: boolean;
	}

	const { id, children, ...restProps }: Props = $props();

	const name = useTriggerName();
	const triggerId = $derived(id ?? name?.id);

	$effect.pre(() => {
		if (name && id) name.id = id;
	});
</script>

<ContextMenu.Trigger id={triggerId} {...restProps}>
	{@render children?.()}
</ContextMenu.Trigger>
