<script lang="ts" generics="TData">
	import type { StackNode } from '../layout.ts';

	import { shownPaneId } from './shown-pane.ts';
	import PaneFrame from './PaneFrame.svelte';
	import { usePanes } from './usePanes.svelte.ts';

	interface Props {
		node: StackNode<TData>;
	}

	const { node }: Props = $props();

	const context = usePanes();

	const shownId = $derived(shownPaneId(node));
	const shownStack = $derived(
		shownId === undefined || shownId === node.activeId ? node : { ...node, activeId: shownId }
	);
	const shownPanes = $derived(
		node.panes.filter((pane) => context.keepInactiveMounted || pane.id === shownId)
	);
</script>

<div class="relative size-full min-h-0 min-w-0">
	{#each shownPanes as pane (pane.id)}
		{@const isActive = pane.id === shownId}
		<div
			data-stack-pane={pane.id}
			hidden={!isActive}
			inert={!isActive}
			class="relative size-full min-h-0 min-w-0"
		>
			<PaneFrame node={pane} stack={shownStack} />
		</div>
	{/each}
</div>
