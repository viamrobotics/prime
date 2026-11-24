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

	import { Combobox } from 'bits-ui';

	import ListboxItemBody from '../Select/ListboxItemBody.svelte';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/** The value this item selects when chosen. */
		value: string;

		/**
		 * Text shown for the item. Falls back to `value`. Once the item is selected, the input shows
		 * the label of the matching entry in the root's `items`, not this one.
		 */
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

<Combobox.Item
	{value}
	{label}
	{disabled}
	aria-disabled={disabled || undefined}
	class={['listbox-option justify-between', extraClasses]}
	{...restProps}
>
	{#snippet children({ selected, highlighted })}
		<ListboxItemBody {value} {label} {selected} {highlighted} {content} />
	{/snippet}
</Combobox.Item>
