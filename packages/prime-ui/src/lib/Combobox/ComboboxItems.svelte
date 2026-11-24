<!--
@component
Renders the `items` of the enclosing [`Combobox`](./Combobox.svelte) that match the typed text,
as [`Combobox.Item`](./ComboboxItem.svelte)s. Pair it with a
[`Combobox.Empty`](./ComboboxEmpty.svelte) for the message when nothing matches.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	import type { SelectOption } from '../Select/option.ts';

	import ListboxItems from '../Select/ListboxItems.svelte';
	import ComboboxItem from './ComboboxItem.svelte';
	import { useCombobox } from './useCombobox.svelte.ts';

	interface Props {
		/** Replaces each item's label and check. Receives `{ item, selected, highlighted }`. */
		children?: Snippet<[{ item: SelectOption; selected: boolean; highlighted: boolean }]>;
	}

	const { children }: Props = $props();

	const combobox = useCombobox();
	if (!combobox) {
		throw new Error('Combobox.Items must be rendered inside a Combobox.');
	}
</script>

<ListboxItems options={combobox.matches} Item={ComboboxItem} {children} />
