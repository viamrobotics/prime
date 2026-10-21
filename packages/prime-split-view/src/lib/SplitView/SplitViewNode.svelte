<script lang="ts" generics="TData">
	import type { LayoutNode } from '../layout.ts';

	import SplitViewPane from './SplitViewPane.svelte';
	import SplitViewSplit from './SplitViewSplit.svelte';

	interface Props {
		node: LayoutNode<TData>;
	}

	const { node }: Props = $props();
</script>

{#if node.type === 'split'}
	{#key node.id}
		<SplitViewSplit {node} />
	{/key}
{:else}
	{#key node.id}
		<SplitViewPane {node} />
	{/key}
{/if}
