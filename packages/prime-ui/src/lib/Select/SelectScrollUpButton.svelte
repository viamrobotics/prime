<!--
@component
A button that scrolls a long [`Select.Content`](./SelectContent.svelte) up.

Appears only when items are hidden above the visible list. Children replace the default chevron.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { mdiChevronUp } from '@mdi/js';
	import { Select } from 'bits-ui';

	import Icon from '../Icon/Icon.svelte';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

<Select.ScrollUpButton
	class={['flex items-center justify-center py-1 text-subtle-2', extraClasses]}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<Icon icon={mdiChevronUp} size="sm" />
	{/if}
</Select.ScrollUpButton>
