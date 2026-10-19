<!--
@component
A button that scrolls a long [`Select.Content`](./SelectContent.svelte) down.

Appears only when items are hidden below the visible list. Children replace the default chevron.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { mdiChevronDown } from '@mdi/js';
	import { Select } from 'bits-ui';

	import Icon from '../Icon/Icon.svelte';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Element id. `null` is not accepted. */
		id?: string;
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

{#snippet chevron()}
	<Icon icon={mdiChevronDown} size="sm" />
{/snippet}

<Select.ScrollDownButton
	class={['flex items-center justify-center py-1 text-subtle-2', extraClasses]}
	{...restProps}
>
	{@const content = children ?? chevron}
	{@render content()}
</Select.ScrollDownButton>
