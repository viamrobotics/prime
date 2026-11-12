<!--
@component
The heading of a [`Takeover`](./Takeover.svelte), rendered as an `h2`. The sheet is labeled by it.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import DialogTitle from '../Dialog/DialogTitle.svelte';

	interface Props extends HTMLAttributes<HTMLHeadingElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { children, ...restProps }: Props = $props();
</script>

<DialogTitle {...restProps}>
	{@render children?.()}
</DialogTitle>
