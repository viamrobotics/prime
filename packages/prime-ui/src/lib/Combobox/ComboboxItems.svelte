<!--
@component
Renders the `items` of the enclosing [`Combobox`](./Combobox.svelte) that match the typed text,
as [`Combobox.Item`](./ComboboxItem.svelte)s. Pair it with a
[`Combobox.Empty`](./ComboboxEmpty.svelte) for the message when nothing matches.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	import type { SelectOption } from '../Select/option.ts';

	import ComboboxItem from './ComboboxItem.svelte';
	import { useCombobox } from './useCombobox.svelte.ts';

	interface Props {
		/** Replaces each item's label and check. Receives `{ item, selected, highlighted }`. */
		children?: Snippet<[{ item: SelectOption; selected: boolean; highlighted: boolean }]>;
	}

	const { children: content }: Props = $props();

	const combobox = useCombobox();
	if (!combobox) {
		throw new Error('Combobox.Items must be rendered inside a Combobox.');
	}
</script>

{#each combobox.matches as item (item.value)}
	{#if content}
		<ComboboxItem value={item.value} label={item.label} disabled={item.disabled}>
			{#snippet children({ selected, highlighted })}
				{@render content({ item, selected, highlighted })}
			{/snippet}
		</ComboboxItem>
	{:else}
		<ComboboxItem value={item.value} label={item.label} disabled={item.disabled} />
	{/if}
{/each}
