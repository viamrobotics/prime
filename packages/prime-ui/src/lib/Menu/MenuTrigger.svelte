<!--
@component
The button that toggles a [`Menu`](./Menu.svelte). It renders a real `<button>`, so `button`, or `button button-ghost`, styles it.
Arrow Down on the focused trigger opens the menu and focuses the first item.
-->
<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { DropdownMenu } from 'bits-ui';

	import { useTriggerName } from './useTriggerName.svelte.ts';

	interface Props extends HTMLButtonAttributes {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { id, class: extraClasses, children, ...restProps }: Props = $props();

	const name = useTriggerName();
	const triggerId = $derived(id ?? name?.id);

	$effect.pre(() => {
		if (name && id) name.id = id;
	});
</script>

<DropdownMenu.Trigger id={triggerId} class={['focus-ring', extraClasses]} {...restProps}>
	{@render children?.()}
</DropdownMenu.Trigger>
