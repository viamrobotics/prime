<script lang="ts" generics="TData">
	import type { FloatNode } from '../layout.ts';

	import PanesNode from '../Panes/PanesNode.svelte';
	import { usePanes } from '../Panes/usePanes.svelte.ts';

	import FloatWindow from './FloatWindow.svelte';

	interface Props {
		node: FloatNode<TData>;
	}

	const { node }: Props = $props();

	const context = usePanes();

	let boxWidth = $state(0);
	let boxHeight = $state(0);

	const box = $derived({ width: boxWidth, height: boxHeight });

	let seenIds: string[] = [];

	// Windows keep the order they first appeared in, not their stacking order, so raising one never moves its DOM node.
	const windows = $derived.by(() => {
		const present = new Set(node.floats.map((entry) => entry.id));
		seenIds = [
			...seenIds.filter((id) => present.has(id)),
			...node.floats.map((entry) => entry.id).filter((id) => !seenIds.includes(id))
		];
		return seenIds.map((id) => {
			const index = node.floats.findIndex((entry) => entry.id === id);
			return { entry: node.floats[index]!, zIndex: index + 1 };
		});
	});
</script>

<div
	data-float={node.id}
	bind:clientWidth={boxWidth}
	bind:clientHeight={boxHeight}
	class="relative isolate size-full min-h-0 min-w-0"
>
	<div class="isolate size-full min-h-0 min-w-0">
		{#if node.base}
			<PanesNode node={node.base} />
		{:else}
			{@render context.empty?.()}
		{/if}
	</div>
	{#each windows as { entry, zIndex } (entry.id)}
		<FloatWindow {entry} {box} {zIndex} />
	{/each}
</div>
