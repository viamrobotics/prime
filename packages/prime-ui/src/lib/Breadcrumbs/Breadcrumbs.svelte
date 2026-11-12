<!--
@component
A breadcrumb trail: a `nav` landmark wrapping an ordered list of the pages leading to the current
one. Put a [`Breadcrumbs.Link`](./BreadcrumbsLink.svelte) in each ancestor's
[`Breadcrumbs.Item`](./BreadcrumbsItem.svelte), a [`Breadcrumbs.Separator`](./BreadcrumbsSeparator.svelte)
between items, and a [`Breadcrumbs.Page`](./BreadcrumbsPage.svelte) for the current page.

```svelte
<Breadcrumbs>
	<Breadcrumbs.Item><Breadcrumbs.Link href="/">Home</Breadcrumbs.Link></Breadcrumbs.Item>
	<Breadcrumbs.Separator />
	<Breadcrumbs.Item><Breadcrumbs.Ellipsis /></Breadcrumbs.Item>
	<Breadcrumbs.Separator />
	<Breadcrumbs.Item><Breadcrumbs.Link href="/machines">Machines</Breadcrumbs.Link></Breadcrumbs.Item>
	<Breadcrumbs.Separator />
	<Breadcrumbs.Item><Breadcrumbs.Page>my-robot</Breadcrumbs.Page></Breadcrumbs.Item>
</Breadcrumbs>
```
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
		/** The landmark name. @default 'Breadcrumb' */
		'aria-label'?: string;
	}

	const {
		class: extraClasses,
		'aria-label': ariaLabel = 'Breadcrumb',
		children,
		...restProps
	}: Props = $props();
</script>

<nav {...restProps} aria-label={ariaLabel} class={extraClasses}>
	<ol class="flex flex-wrap items-center gap-1 text-sm">
		{@render children?.()}
	</ol>
</nav>
