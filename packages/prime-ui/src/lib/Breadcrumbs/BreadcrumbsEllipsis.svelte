<!--
@component
Stands in for the crumbs a [`Breadcrumbs`](./Breadcrumbs.svelte) trail leaves out. Place it in a
[`Breadcrumbs.Item`](./BreadcrumbsItem.svelte), alone or inside a menu trigger. It draws a horizontal
dots icon labeled `More`. Pass children to replace the icon, and `aria-label` to replace the label.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { mdiDotsHorizontal } from '@mdi/js';

	import Icon from '../Icon/Icon.svelte';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
		/** What a screen reader announces for the icon. @default 'More' */
		'aria-label'?: string;
	}

	const {
		class: extraClasses,
		'aria-label': ariaLabel = 'More',
		children,
		...restProps
	}: Props = $props();
</script>

<span {...restProps} class={['inline-flex items-center', extraClasses]}>
	{#if children}
		{@render children()}
	{:else}
		<Icon icon={mdiDotsHorizontal} aria-label={ariaLabel} />
	{/if}
</span>
