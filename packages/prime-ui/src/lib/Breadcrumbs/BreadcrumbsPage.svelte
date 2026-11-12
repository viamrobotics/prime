<!--
@component
The current page at the end of a [`Breadcrumbs`](./Breadcrumbs.svelte) trail. It is text, not a
link, and carries `aria-current="page"`.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

<span {...restProps} aria-current="page" class={['text-default', extraClasses]}>
	{@render children?.()}
</span>
