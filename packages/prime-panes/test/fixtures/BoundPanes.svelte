<script lang="ts">
	import '../tailwind.css';

	import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';

	import { ids, layoutRoot } from '../layouts.ts';
	import type { PaneData } from '../layouts.ts';
	import type { LayoutNode } from '../../src/lib/layout.ts';
	import { setSplitRatio } from '../../src/lib/SplitPanes/set-split-ratio.ts';
	import { Panes } from '../../src/lib/Panes/panes.ts';

	interface Props {
		reorderable?: boolean;
		handles?: boolean;
		labelPanes?: boolean;
		handleProps?: HTMLButtonAttributes;
		rootProps?: HTMLAttributes<HTMLDivElement>;
	}

	const {
		reorderable,
		handles = false,
		labelPanes = true,
		handleProps,
		rootProps
	}: Props = $props();

	let layout = $state<LayoutNode<PaneData> | undefined>(structuredClone(layoutRoot));

	export function getLayout() {
		return $state.snapshot(layout);
	}

	const rootRatio = $derived(layout?.type === 'split' ? layout.ratio : undefined);
</script>

<button type="button" onclick={() => (layout = setSplitRatio(layout, ids.rootSplit, 0.7))}>
	Set root to 70%
</button>
<span data-testid="owner">{rootRatio}</span>
<div style="width: 800px; height: 600px">
	<Panes
		{...rootProps}
		bind:layout
		{reorderable}
		paneLabel={labelPanes ? (node) => node.data.label : undefined}
		class="size-full"
	>
		{#snippet pane(node)}
			{#if handles}
				<Panes.DragTrigger>
					<Panes.MoveTrigger
						aria-label="Move {node.data.label}"
						class="absolute top-2 left-2 size-6 border border-medium"
						{...handleProps}
					>
						::
					</Panes.MoveTrigger>
				</Panes.DragTrigger>
			{/if}
			<section aria-label={node.data.label} data-pane-id={node.id} class="size-full">
				{node.data.label}
			</section>
		{/snippet}
	</Panes>
</div>
