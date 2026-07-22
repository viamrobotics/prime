<!--
@component
A selectable option within a [`Select.Content`](./SelectContent.svelte). 

By default it renders its `label` (or `value`) plus a check when selected. 

Pass a children snippet to render custom content
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	import { Select } from 'bits-ui';

	import Icon from '../Icon/Icon.svelte';

	interface Props extends Omit<Select.ItemProps, 'children'> {
		children?: Snippet<[{ selected: boolean; highlighted: boolean }]>;
	}

	// Aliased so it doesn't collide with the bits-ui `children` snippet below.
	const { class: extraClasses, value, label, children: content, ...restProps }: Props = $props();
</script>

<Select.Item
	{value}
	{label}
	{...restProps}
	class={[
		'flex cursor-pointer items-center justify-between gap-2 rounded px-2 py-1.5 text-sm text-default outline-none select-none data-disabled:cursor-not-allowed data-disabled:text-disabled-dark data-highlighted:bg-light',
		extraClasses
	]}
>
	{#snippet children({ selected, highlighted })}
		{#if content}
			{@render content({ selected, highlighted })}
		{:else}
			<span class="truncate">{label ?? value}</span>
			{#if selected}
				<Icon icon="check" size="sm" class="shrink-0 text-default" />
			{/if}
		{/if}
	{/snippet}
</Select.Item>
