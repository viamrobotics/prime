<!--
@component
Renders the `items` of the enclosing [`Select`](./Select.svelte) as
[`Select.Item`](./SelectItem.svelte)s. Composing `Select.Item` by hand still works.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	import type { SelectOption } from './option.ts';

	import ListboxItems from './ListboxItems.svelte';
	import SelectItem from './SelectItem.svelte';
	import { useSelect } from './useSelect.svelte.ts';

	interface Props {
		/** Replaces each item's label and check. Receives `{ item, selected, highlighted }`. */
		children?: Snippet<[{ item: SelectOption; selected: boolean; highlighted: boolean }]>;
	}

	const { children }: Props = $props();

	const select = useSelect();
	if (!select) {
		throw new Error('Select.Items must be rendered inside a Select.');
	}
</script>

<ListboxItems options={select.items} Item={SelectItem} {children} />
