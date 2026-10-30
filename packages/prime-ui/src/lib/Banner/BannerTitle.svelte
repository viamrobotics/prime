<!--
@component
The heading line of a [`Banner`](./Banner.svelte). Its presence switches the banner from the compact
one-liner to the stacked layout.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLParagraphElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

<p {...restProps} class={['banner-title', extraClasses]}>
	{@render children?.()}
</p>
