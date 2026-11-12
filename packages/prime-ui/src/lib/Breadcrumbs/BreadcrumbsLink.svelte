<!--
@component
A link to an ancestor page in a [`Breadcrumbs`](./Breadcrumbs.svelte) trail. It is muted and
darkens on hover.
-->
<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	interface Props extends HTMLAnchorAttributes {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

<a {...restProps} class={['text-subtle-1 focus-ring hover:text-default', extraClasses]}>
	{@render children?.()}
</a>
