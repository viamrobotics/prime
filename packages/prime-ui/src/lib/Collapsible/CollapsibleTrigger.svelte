<!--
@component
The button that opens and closes a [`Collapsible`](./Collapsible.svelte). Its children are the
title, and an optional subtitle, as the consumer lays them out. The `indicator` snippet replaces
the default chevron, which turns when the content is open.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { mdiChevronDown } from '@mdi/js';
	import { Collapsible } from 'bits-ui';

	import Icon from '../Icon/Icon.svelte';
	import { useCollapsible } from './useCollapsible.svelte.ts';

	interface Props extends HTMLButtonAttributes {
		/** Element id. `null` is not accepted. */
		id?: string;
		/** Custom indicator instead of the default chevron. Receives `{ open }`. */
		indicator?: Snippet<[{ open: boolean }]>;
	}

	const { class: extraClasses, indicator, children, ...restProps }: Props = $props();

	const state = useCollapsible();
</script>

{#snippet chevron()}
	<Icon
		icon={mdiChevronDown}
		size="sm"
		class="shrink-0 text-subtle-2 transition-transform group-data-[state=open]:rotate-180"
	/>
{/snippet}

<Collapsible.Trigger
	class={['group block w-full text-left focus-ring', extraClasses]}
	{...restProps}
>
	<span class="flex items-center justify-between gap-2">
		<span class="min-w-0">{@render children?.()}</span>
		{#if indicator}
			{@render indicator({ open: state?.open ?? false })}
		{:else}
			{@render chevron()}
		{/if}
	</span>
</Collapsible.Trigger>
