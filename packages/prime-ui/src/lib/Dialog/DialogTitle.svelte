<!--
@component
The heading of a [`Dialog`](./Dialog.svelte), rendered as an `h2`. The dialog is labelled by it.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Dialog } from 'bits-ui';

	interface Props extends HTMLAttributes<HTMLHeadingElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

<Dialog.Title {...restProps}>
	{#snippet child({ props })}
		<h2 {...props} class={['text-lg font-semibold text-default', extraClasses]}>
			{@render children?.()}
		</h2>
	{/snippet}
</Dialog.Title>
