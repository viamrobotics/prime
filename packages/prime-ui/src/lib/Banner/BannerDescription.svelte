<!--
@component
The body copy of a [`Banner`](./Banner.svelte).
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLParagraphElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

<p {...restProps} class={['banner-description', extraClasses]}>
	{@render children?.()}
</p>
