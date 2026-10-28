<script lang="ts">
	import '../../src/routes/layout.css';

	import { createFloatLayout } from '../layouts.ts';
	import type { PaneData } from '../layouts.ts';
	import type { LayoutNode } from '../../src/lib/layout.ts';
	import { Panes } from '../../src/lib/Panes/panes.ts';

	interface Props {
		initial?: LayoutNode<PaneData> | undefined;
		vetoesWrites?: boolean;
		dragTarget?: 'float' | 'stack';
		floatingMoveTarget?: 'pane' | 'stack' | 'float';
	}

	const {
		initial = createFloatLayout(),
		vetoesWrites = false,
		dragTarget = 'float',
		floatingMoveTarget
	}: Props = $props();

	// svelte-ignore state_referenced_locally
	let layout = $state.raw<LayoutNode<PaneData> | undefined>(initial);
	let writes = $state(0);

	export function getLayout() {
		return layout;
	}

	export function getWrites() {
		return writes;
	}
</script>

<div data-testid="frame" style="width: 800px; height: 600px">
	<Panes
		bind:layout={
			() => layout,
			(next) => {
				writes += 1;
				if (vetoesWrites) return;
				layout = next;
			}
		}
		paneLabel={(node) => node.data.label}
		class="size-full"
	>
		{#snippet pane(node, state)}
			<section aria-label={node.data.label} data-pane-id={node.id} class="flex size-full flex-col">
				<Panes.DragTrigger target={dragTarget}>
					<div
						data-header={node.data.label}
						class="flex h-6 shrink-0 items-center gap-2 border-b border-medium bg-light px-4 text-xs"
					>
						<button type="button" aria-label="Menu {node.data.label}" class="size-4 border">
							+
						</button>
						{node.data.label}
						{#if !state.isFloating}
							<Panes.MoveTrigger aria-label="Move {node.data.label}" class="size-4 border">
								::
							</Panes.MoveTrigger>
						{:else if floatingMoveTarget}
							<Panes.MoveTrigger
								target={floatingMoveTarget}
								aria-label="Move {node.data.label}"
								class="size-4 border"
							>
								::
							</Panes.MoveTrigger>
						{/if}
					</div>
				</Panes.DragTrigger>
			</section>
		{/snippet}
	</Panes>
</div>
