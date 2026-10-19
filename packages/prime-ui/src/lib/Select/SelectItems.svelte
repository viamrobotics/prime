<!--
@component
Renders the `items` of the enclosing [`Select`](./Select.svelte) as
[`Select.Item`](./SelectItem.svelte)s. Composing `Select.Item` by hand still works.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	import type { SelectOption } from './option.ts';

	import SelectItem from './SelectItem.svelte';
	import { useSelect } from './useSelect.svelte.ts';

	interface Props {
		/** Replaces each item's label and check. Receives `{ item, selected, highlighted }`. */
		children?: Snippet<[{ item: SelectOption; selected: boolean; highlighted: boolean }]>;
	}

	const { children: content }: Props = $props();

	const select = useSelect();
	if (!select) {
		throw new Error('Select.Items must be rendered inside a Select.');
	}
</script>

{#each select.items as item (item.value)}
	{#if content}
		<SelectItem value={item.value} label={item.label} disabled={item.disabled}>
			{#snippet children({ selected, highlighted })}
				{@render content({ item, selected, highlighted })}
			{/snippet}
		</SelectItem>
	{:else}
		<SelectItem value={item.value} label={item.label} disabled={item.disabled} />
	{/if}
{/each}
