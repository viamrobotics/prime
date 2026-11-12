<!--
@component
One entry in a [`Breadcrumbs`](./Breadcrumbs.svelte) trail. Holds a
[`Breadcrumbs.Link`](./BreadcrumbsLink.svelte), a [`Breadcrumbs.Page`](./BreadcrumbsPage.svelte), or a
[`Breadcrumbs.Ellipsis`](./BreadcrumbsEllipsis.svelte).
-->
<script lang="ts">
	import type { HTMLLiAttributes } from 'svelte/elements';

	interface Props extends HTMLLiAttributes {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

<li {...restProps} class={['inline-flex items-center', extraClasses]}>
	{@render children?.()}
</li>
