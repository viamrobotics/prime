<!--
@component
One [`Select.Item`](./SelectItem.svelte) per entry of the root's `items`, at a tool panel's scale.
-->
<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import { Select } from '@viamrobotics/prime-ui';

	import SelectItem from './SelectItem.svelte';
	import { useSelectItems } from './select-items.ts';

	// An interface, not an alias, so the published declaration can name these props.
	interface Props extends ComponentProps<typeof Select.Items> {}

	const { children: content }: Props = $props();

	const items = useSelectItems();
	if (!items) {
		throw new Error('Select.Items must be rendered inside a Select.');
	}
</script>

{#each items() ?? [] as item (item.value)}
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
