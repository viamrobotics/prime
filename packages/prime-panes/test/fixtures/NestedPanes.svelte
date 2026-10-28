<script lang="ts">
	import '../../src/routes/layout.css';

	import type { PaneData } from '../layouts.ts';
	import type { LayoutNode, PaneNode } from '../../src/lib/layout.ts';
	import type { PaneState } from '../../src/lib/Panes/pane-state.ts';
	import { Panes } from '../../src/lib/Panes/panes.ts';

	const labeledPane = (id: string): PaneNode<PaneData> => ({
		type: 'pane',
		id,
		data: { label: id }
	});

	let outerLayout = $state<LayoutNode<PaneData> | undefined>({
		type: 'split',
		id: 'outer-split',
		direction: 'row',
		ratio: 0.5,
		first: labeledPane('outer-a'),
		second: labeledPane('outer-b')
	});

	let innerLayout = $state<LayoutNode<PaneData> | undefined>({
		type: 'split',
		id: 'inner-split',
		direction: 'row',
		ratio: 0.5,
		first: labeledPane('inner-a'),
		second: {
			type: 'stack',
			id: 'inner-stack',
			panes: [labeledPane('inner-b'), labeledPane('inner-c')],
			activeId: 'inner-b'
		}
	});

	export function getOuterLayout() {
		return $state.snapshot(outerLayout);
	}

	export function getInnerLayout() {
		return $state.snapshot(innerLayout);
	}
</script>

{#snippet paneContent(
	node: PaneNode<PaneData>,
	state: PaneState,
	gripClass: string,
	isOuter: boolean
)}
	<Panes.DragTrigger>
		<Panes.MoveTrigger
			aria-label="Move {node.id}"
			class="absolute z-10 size-6 border border-medium {gripClass}"
		>
			::
		</Panes.MoveTrigger>
		{#if state.isStacked}
			<Panes.TabList aria-label="Tabs of {node.id}" class="relative">
				<Panes.TabListDropRegion class="absolute inset-0" />
			</Panes.TabList>
		{/if}
		<div data-pane-id={node.id} class="size-full">
			{#if isOuter && node.id === 'outer-a'}
				<Panes
					bind:layout={innerLayout}
					paneLabel={(inner) => inner.data.label}
					data-testid="inner-root"
					class="size-full"
				>
					{#snippet pane(inner, innerState)}
						{@render paneContent(inner, innerState, 'right-2 bottom-2', false)}
					{/snippet}
				</Panes>
			{:else}
				{node.data.label}
			{/if}
		</div>
	</Panes.DragTrigger>
{/snippet}

<div data-testid="frame" style="width: 800px; height: 600px">
	<Panes
		bind:layout={outerLayout}
		paneLabel={(outer) => outer.data.label}
		data-testid="outer-root"
		class="size-full"
	>
		{#snippet pane(outer, outerState)}
			{@render paneContent(outer, outerState, 'bottom-2 left-2', true)}
		{/snippet}
	</Panes>
</div>
