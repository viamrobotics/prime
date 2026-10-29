<!--
@component
The supporting text of a [`Dialog`](./Dialog.svelte), rendered as a `p`. The dialog is described by it.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Dialog } from 'bits-ui';

	interface Props extends HTMLAttributes<HTMLParagraphElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

<Dialog.Description {...restProps}>
	{#snippet child({ props })}
		<p {...props} class={['text-sm text-subtle-1', extraClasses]}>
			{@render children?.()}
		</p>
	{/snippet}
</Dialog.Description>
