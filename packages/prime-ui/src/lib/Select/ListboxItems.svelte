<script lang="ts">
	import type { Component, Snippet } from 'svelte';

	import type { SelectOption } from './option.ts';

	// A type literal, not an interface, so it takes the implicit index signatures an item's HTML attribute Props declare.
	type ItemProps = {
		value: string;
		label?: string;
		disabled?: boolean;
		children?: Snippet<[{ selected: boolean; highlighted: boolean }]>;
	};

	interface Props {
		options: readonly SelectOption[];
		Item: Component<ItemProps>;
		children?: Snippet<[{ item: SelectOption; selected: boolean; highlighted: boolean }]>;
	}

	const { options, Item, children: content }: Props = $props();
</script>

{#each options as item (item.value)}
	{#if content}
		<Item value={item.value} label={item.label} disabled={item.disabled}>
			{#snippet children({ selected, highlighted })}
				{@render content({ item, selected, highlighted })}
			{/snippet}
		</Item>
	{:else}
		<Item value={item.value} label={item.label} disabled={item.disabled} />
	{/if}
{/each}
