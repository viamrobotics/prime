<!--
@component
The button that toggles a [`Menu`](./Menu.svelte). It renders a real `<button>`, so `button` or `button-ghost` styles it.
Arrow Down on the focused trigger opens the menu and focuses the first item.
-->
<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { DropdownMenu } from 'bits-ui';

	interface Props extends HTMLButtonAttributes {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

<DropdownMenu.Trigger class={['focus-ring', extraClasses]} {...restProps}>
	{@render children?.()}
</DropdownMenu.Trigger>
