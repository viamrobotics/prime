<!--
@component
A row of actions in a [`Banner`](./Banner.svelte). It holds whatever the consumer puts in it, such
as a `button` and a `link`. In the compact banner it sits inline on the right.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

<div {...restProps} class={['banner-actions', extraClasses]}>
	{@render children?.()}
</div>
