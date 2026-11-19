<!--
@component
A selectable option within a [`Combobox.Content`](./ComboboxContent.svelte).

By default it renders its `label` (or `value`) plus a check when selected.

Pass a children snippet to render custom content:

```svelte
<Combobox.Item value="us-east" label="US East">
	{#snippet children({ selected })}
		<span class:font-medium={selected}>US East</span>
	{/snippet}
</Combobox.Item>
```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	import { mdiCheck } from '@mdi/js';
	import { Combobox } from 'bits-ui';

	import Icon from '../Icon/Icon.svelte';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/** The value this item selects when chosen. */
		value: string;

		/** Text shown for the item and in the input once it is selected. Falls back to `value`. */
		label?: string;

		/** Prevent the item from being selected. @default false */
		disabled?: boolean;

		/** Replaces the label and check. Receives `{ selected, highlighted }`. */
		children?: Snippet<[{ selected: boolean; highlighted: boolean }]>;
	}

	const {
		class: extraClasses,
		value,
		label,
		disabled,
		children: content,
		...restProps
	}: Props = $props();
</script>

{#snippet entry({ selected }: { selected: boolean })}
	<span class="truncate">{label ?? value}</span>
	{#if selected}
		<Icon icon={mdiCheck} size="sm" class="shrink-0 text-default" />
	{/if}
{/snippet}

<Combobox.Item
	{value}
	{label}
	{disabled}
	aria-disabled={disabled || undefined}
	class={['listbox-option', extraClasses]}
	{...restProps}
>
	{#snippet children({ selected, highlighted })}
		{@const item = content ?? entry}
		{@render item({ selected, highlighted })}
	{/snippet}
</Combobox.Item>
