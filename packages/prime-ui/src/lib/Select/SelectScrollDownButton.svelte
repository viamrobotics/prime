<!--
@component
Scrolls a long [`Select.Content`](./SelectContent.svelte) downward.

Shown only when there's content below the viewport. Children replace the default chevron.
-->
<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	import { Select } from 'bits-ui';

	import Icon from '../Icon/Icon.svelte';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Id of the element. bits-ui requires a string, so `null` is not accepted. */
		id?: string;
	}

	const { class: extraClasses, children, ...restProps }: Props = $props();
</script>

{#snippet chevron()}
	<Icon icon="chevron-down" size="sm" />
{/snippet}

<Select.ScrollDownButton
	class={['flex w-full items-center justify-center py-1 text-subtle-2', extraClasses]}
	{...restProps}
>
	{@const content = children ?? chevron}
	{@render content()}
</Select.ScrollDownButton>
