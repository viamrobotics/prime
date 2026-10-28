<script lang="ts">
	import '../../src/routes/layout.css';

	import { createFloatLayout } from '../layouts.ts';
	import type { PaneData } from '../layouts.ts';
	import type { FloatEntry, LayoutNode } from '../../src/lib/layout.ts';
	import { Panes } from '../../src/lib/Panes/panes.ts';
	import { removeFloat } from '../../src/lib/tree.ts';

	interface Props {
		initial?: LayoutNode<PaneData> | undefined;
		withEmpty?: boolean;
		handles?: boolean;
		floatMinSize?: (entry: FloatEntry<PaneData>) => { width: number; height: number };
		usesPackageMinSize?: boolean;
		vetoesWrites?: boolean;
		withFields?: boolean;
	}

	const SMALL_MIN_SIZE = { width: 40, height: 30 };

	const {
		initial = createFloatLayout(),
		withEmpty = false,
		handles = false,
		floatMinSize = () => SMALL_MIN_SIZE,
		usesPackageMinSize = false,
		vetoesWrites = false,
		withFields = false
	}: Props = $props();

	// svelte-ignore state_referenced_locally
	let layout = $state.raw<LayoutNode<PaneData> | undefined>(initial);
	let writes = $state(0);

	export function getLayout() {
		return layout;
	}

	export function addWindow() {
		const float = layout;
		if (float?.type !== 'float') return;
		layout = {
			...float,
			floats: [
				...float.floats,
				{
					id: 'entry-c',
					rect: { x: 300, y: 300, width: 100, height: 80 },
					content: { type: 'pane', id: 'float-pane-c', data: { label: 'float-pane-c' } }
				}
			]
		};
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
		floatMinSize={usesPackageMinSize ? undefined : floatMinSize}
		class="size-full"
	>
		{#snippet pane(node, state)}
			{#if handles}
				<Panes.DragTrigger>
					<Panes.MoveTrigger
						aria-label="Move {node.data.label}"
						class="absolute top-2 left-2 size-6 border border-medium"
					>
						::
					</Panes.MoveTrigger>
				</Panes.DragTrigger>
			{/if}
			<section
				aria-label={node.data.label}
				data-testid="pane"
				data-pane-id={node.id}
				data-is-floating={state.isFloating}
				class="size-full"
			>
				{node.data.label}
				{#if withFields}
					<input
						type="text"
						aria-label="Notes for {node.data.label}"
						class="border border-medium"
					/>
				{/if}
				{#if state.floatEntryId !== undefined}
					{@const entryId = state.floatEntryId}
					<button
						type="button"
						class="absolute right-4 bottom-4 size-4 overflow-hidden"
						aria-label="Close {node.data.label}"
						onclick={() => (layout = removeFloat(layout, entryId))}
					>
						x
					</button>
				{/if}
			</section>
		{/snippet}
		{#snippet empty()}
			{#if withEmpty}<p data-testid="empty">Nothing here</p>{/if}
		{/snippet}
	</Panes>
</div>
