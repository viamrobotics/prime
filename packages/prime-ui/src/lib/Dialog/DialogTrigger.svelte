<!--
@component
The button that opens a [`Dialog`](./Dialog.svelte). It carries no visual style of its own, so add `button` or another class.
-->
<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { Dialog } from 'bits-ui';

	interface Props extends HTMLButtonAttributes {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

<Dialog.Trigger class={['focus-ring', extraClasses]} {...restProps}>
	{@render children?.()}
</Dialog.Trigger>
