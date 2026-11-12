<!--
@component
The text button that opens a menu of a [`Menubar`](./Menubar.svelte). It renders a real `<button>` with its own look.
Arrow Down on the focused trigger opens the menu and focuses the first item.
-->
<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { Menubar } from 'bits-ui';

	interface Props extends HTMLButtonAttributes {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

<Menubar.Trigger
	class={[
		'cursor-pointer rounded-sm px-2 py-1 text-sm text-default focus-ring hover:bg-light data-highlighted:bg-light data-[state=open]:bg-light',
		extraClasses
	]}
	{...restProps}
>
	{@render children?.()}
</Menubar.Trigger>
