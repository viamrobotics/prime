<!--
@component
Scrolls a long [`Select.Content`](./SelectContent.svelte) downward.

Shown only when there's content below the viewport.
-->
<script lang="ts">
	import { Select } from 'bits-ui';

	import Icon from '../Icon/Icon.svelte';

	const { class: extraClasses, children, ...restProps }: Select.ScrollDownButtonProps = $props();
</script>

<Select.ScrollDownButton
	{...restProps}
	class={['flex w-full items-center justify-center py-1 text-subtle-2', extraClasses]}
>
	{#if children}
		{@render children()}
	{:else}
		<Icon icon="chevron-down" size="sm" />
	{/if}
</Select.ScrollDownButton>
