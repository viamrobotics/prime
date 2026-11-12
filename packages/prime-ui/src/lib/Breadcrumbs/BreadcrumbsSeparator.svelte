<!--
@component
The divider between two items of a [`Breadcrumbs`](./Breadcrumbs.svelte) trail. It is a direct child
of the list, hidden from assistive technology, and draws a chevron unless given children.
-->
<script lang="ts">
	import type { HTMLLiAttributes } from 'svelte/elements';

	import { mdiChevronRight } from '@mdi/js';

	import Icon from '../Icon/Icon.svelte';

	interface Props extends HTMLLiAttributes {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

<li
	{...restProps}
	role="presentation"
	aria-hidden="true"
	class={['inline-flex items-center text-subtle-2', extraClasses]}
>
	{#if children}
		{@render children()}
	{:else}
		<Icon icon={mdiChevronRight} size="sm" />
	{/if}
</li>
