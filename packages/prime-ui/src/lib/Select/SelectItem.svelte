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

	import ListboxItemBody from './ListboxItemBody.svelte';

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
		/** Element id. `null` is not accepted. */
		id?: string;

		/** The value this item selects when chosen. */
		value: string;

		/** Text shown for the item and matched by typeahead. Falls back to `value`. */
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

<Select.Item
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
</Select.Item>
