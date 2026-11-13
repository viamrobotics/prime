<!--
@component
Stands in for the crumbs a [`Breadcrumbs`](./Breadcrumbs.svelte) trail leaves out. Place it in a
[`Breadcrumbs.Item`](./BreadcrumbsItem.svelte), alone or inside a menu trigger. It draws an ellipsis
glyph that sits on the text baseline, labeled `More`. Pass children to replace the glyph, and `aria-label` to replace the label.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
		/** What a screen reader announces for the glyph. @default 'More' */
		'aria-label'?: string;
	}

	const {
		class: extraClasses,
		'aria-label': ariaLabel = 'More',
		children,
		...restProps
	}: Props = $props();
</script>

<span {...restProps} class={['inline-block', extraClasses]}>
	{#if children}
		{@render children()}
	{:else}
		<span role="img" aria-label={ariaLabel}>…</span>
	{/if}
</span>
