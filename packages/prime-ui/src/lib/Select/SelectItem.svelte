<!--
@component
A selectable option within a [`Select.Content`](./SelectContent.svelte).

By default it renders its `label` (or `value`) plus a check when selected.

Pass a children snippet to render custom content:

```svelte
<Select.Item value="sm" label="Small">
	{#snippet children({ selected })}
		<span class:font-medium={selected}>Small</span>
	{/snippet}
</Select.Item>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { Select } from 'bits-ui';

	import Icon from '../Icon/Icon.svelte';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		/** Id of the element. bits-ui requires a string, so `null` is not accepted. */
		id?: string;

		/** The value this item selects when chosen. */
		value: string;

		/** Text shown for the item and matched by typeahead. Falls back to `value`. */
		label?: string;

		/** Prevent the item from being selected. @default false */
		disabled?: boolean;

		/** Replaces the label and check. Receives the current state. */
		children?: Snippet<[{ selected: boolean; highlighted: boolean }]>;
	}

	const { class: extraClasses, value, label, children: content, ...restProps }: Props = $props();
</script>

{#snippet entry({ selected }: { selected: boolean })}
	<span class="truncate">{label ?? value}</span>
	{#if selected}
		<Icon icon="check" size="sm" class="shrink-0 text-default" />
	{/if}
{/snippet}

<Select.Item
	{value}
	{label}
	class={[
		'flex cursor-pointer items-center justify-between gap-2 rounded px-2 py-1.5 text-sm text-default outline-none select-none data-disabled:cursor-not-allowed data-disabled:text-disabled-dark data-highlighted:bg-light',
		extraClasses
	]}
	{...restProps}
>
	{#snippet children({ selected, highlighted })}
		{@const item = content ?? entry}
		{@render item({ selected, highlighted })}
	{/snippet}
</Select.Item>
