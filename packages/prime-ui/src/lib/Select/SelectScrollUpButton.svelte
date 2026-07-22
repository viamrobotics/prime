<!--
@component
Scrolls a long [`Select.Content`](./SelectContent.svelte) upward.

Shown only when there's content above the viewport.
-->
<script lang="ts">
	import { Select } from 'bits-ui';

	import Icon from '../Icon/Icon.svelte';

	const { class: extraClasses, children, ...restProps }: Select.ScrollUpButtonProps = $props();
</script>

<Select.ScrollUpButton
	{...restProps}
	class={['flex w-full items-center justify-center py-1 text-subtle-2', extraClasses]}
>
	{#if children}
		{@render children()}
	{:else}
		<Icon icon="chevron-up" size="sm" />
	{/if}
</Select.ScrollUpButton>
