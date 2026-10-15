<!--
@component
Scrolls a long [`Select.Content`](./SelectContent.svelte) upward.

Shown only when there's content above the viewport. Children replace the default chevron.
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
	<Icon icon="chevron-up" size="sm" />
{/snippet}

<Select.ScrollUpButton
	class={['flex w-full items-center justify-center py-1 text-subtle-2', extraClasses]}
	{...restProps}
>
	{@const content = children ?? chevron}
	{@render content()}
</Select.ScrollUpButton>
