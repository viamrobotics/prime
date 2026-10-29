<script lang="ts">
	import '../tailwind.css';

	import type { HTMLButtonAttributes } from 'svelte/elements';

	import { ids, layoutRoot } from '../layouts.ts';
	import type { PaneData } from '../layouts.ts';
	import type { LayoutNode } from '../../src/lib/layout.ts';
	import { setSplitRatio } from '../../src/lib/SplitPanes/set-split-ratio.ts';
	import { Panes } from '../../src/lib/Panes/panes.ts';

	interface Props {
		accept?: boolean;
		received?: (LayoutNode<PaneData> | undefined)[];
		initialRatio?: number;
		reorderable?: boolean;
		handles?: boolean;
		labelPanes?: boolean;
		handleProps?: HTMLButtonAttributes;
	}

	const {
		accept = false,
		received = [],
		initialRatio,
		reorderable,
		handles = false,
		labelPanes = true,
		handleProps
	}: Props = $props();

	let layout = $derived<LayoutNode<PaneData> | undefined>(
		initialRatio === undefined ? layoutRoot : setSplitRatio(layoutRoot, ids.rootSplit, initialRatio)
	);

	const rootRatio = $derived(layout?.type === 'split' ? layout.ratio : undefined);

	export function getLayout() {
		return layout;
	}
</script>

<button type="button" onclick={() => (layout = setSplitRatio(layout, ids.rootSplit, 0.7))}>
	Set root to 70%
</button>
<span data-testid="owner">{rootRatio}</span>
<div data-testid="frame" style="width: 800px; height: 600px">
	<Panes
		bind:layout={
			() => layout,
			(next) => {
				received.push(next);
				if (accept) layout = next;
			}
		}
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
			<section
				aria-label={node.data.label}
				data-testid="pane"
				data-pane-id={node.id}
				class="size-full"
			>
				{node.data.label}
			</section>
		{/snippet}
	</Panes>
</div>
