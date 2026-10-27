<script lang="ts">
	import { addPaneToUpperRight, removePane, Panes } from '../lib/index.ts';
	import type { LayoutNode, PaneNode } from '../lib/index.ts';

	type PaneData = { label: string; camera?: true };
	type Variant = 'grip' | 'header';

	const VARIANTS = [
		{ value: 'grip', label: 'Grip button' },
		{ value: 'header', label: 'Draggable header' }
	] as const satisfies readonly { value: Variant; label: string }[];

	let reorderable = $state(true);
	let keepInactiveMounted = $state(false);
	let variant = $state<Variant>('grip');

	let layout = $state<LayoutNode<PaneData> | undefined>({
		type: 'split',
		id: 'root',
		direction: 'column',
		ratio: 0.3,
		first: {
			type: 'stack',
			id: 'cameras',
			activeId: 'camera-1',
			panes: [
				{ type: 'pane', id: 'camera-1', data: { label: 'Camera 1', camera: true } },
				{ type: 'pane', id: 'camera-2', data: { label: 'Camera 2', camera: true } },
				{ type: 'pane', id: 'camera-3', data: { label: 'Camera 3', camera: true } }
			]
		},
		second: {
			type: 'split',
			id: 'middle',
			direction: 'row',
			ratio: 0.6,
			first: { type: 'pane', id: 'time-series', data: { label: 'Time series' } },
			second: {
				type: 'split',
				id: 'lower',
				direction: 'column',
				ratio: 0.5,
				first: { type: 'pane', id: 'stat', data: { label: 'Sensor stat' } },
				second: { type: 'pane', id: 'log', data: { label: 'Event log' } }
			}
		}
	});

	let counter = 6;

	const addPane = () => {
		counter += 1;
		layout = addPaneToUpperRight(
			layout,
			{ type: 'pane', id: `pane-${counter}`, data: { label: `Pane ${counter}` } },
			`split-${counter}`
		);
	};
</script>

{#snippet removeButton(node: PaneNode<PaneData>)}
	<button
		type="button"
		aria-label="Remove {node.data.label}"
		class={[
			'inline-flex size-6 items-center justify-center text-subtle-1',
			{ 'ml-auto': variant === 'grip' }
		]}
		onclick={() => (layout = removePane(layout, node.id))}
	>
		<svg viewBox="0 0 16 16" class="size-4" fill="none" stroke="currentColor" aria-hidden="true">
			<path d="M4 4l8 8M12 4l-8 8" />
		</svg>
	</button>
{/snippet}

{#snippet tab(item: PaneNode<PaneData>)}
	{item.data.label}
{/snippet}

{#snippet stackMoveTrigger(node: PaneNode<PaneData>)}
	{#if node.data.camera}
		<Panes.MoveTrigger
			target="stack"
			class={[
				'border border-medium bg-white px-2 py-0.5 text-xs',
				{ 'ml-auto': variant === 'grip' }
			]}
		>
			Move stack
		</Panes.MoveTrigger>
	{/if}
{/snippet}

<div class="flex h-screen">
	<div class="flex min-w-0 flex-1 flex-col">
		<div
			class="flex items-center gap-4 border-b border-light bg-light px-3 py-2 text-xs text-default"
		>
			<label class="flex items-center gap-2">
				<input type="checkbox" bind:checked={reorderable} />
				Reorderable
			</label>
			<label class="flex items-center gap-2">
				<input type="checkbox" bind:checked={keepInactiveMounted} />
				Keep inactive mounted
			</label>
			<fieldset class="flex items-center gap-2">
				<legend class="sr-only">Pane controls</legend>
				{#each VARIANTS as option (option.value)}
					<label class="flex items-center gap-1">
						<input type="radio" name="variant" value={option.value} bind:group={variant} />
						{option.label}
					</label>
				{/each}
			</fieldset>
			<button type="button" class="border border-medium bg-white px-2 py-1" onclick={addPane}>
				Add pane
			</button>
		</div>
		<Panes
			bind:layout
			{reorderable}
			{keepInactiveMounted}
			paneLabel={(pane) => pane.data.label}
			class="min-h-0 flex-1"
		>
			{#snippet empty()}
				<div class="flex size-full items-center justify-center text-sm text-subtle-2">
					No panes. Add one to start.
				</div>
			{/snippet}
			{#snippet pane(node)}
				<div class="flex size-full flex-col border border-light bg-white text-sm text-default">
					{#if variant === 'grip'}
						<header class="flex items-center gap-1 border-b border-light px-1 py-1">
							<Panes.DragTrigger>
								<Panes.MoveTrigger
									aria-label="Move {node.data.label}"
									class="inline-flex size-6 cursor-grab items-center justify-center text-subtle-1 active:cursor-grabbing"
								>
									<svg viewBox="0 0 16 16" class="size-4" fill="currentColor" aria-hidden="true">
										<circle cx="5.5" cy="3.5" r="1.25" />
										<circle cx="10.5" cy="3.5" r="1.25" />
										<circle cx="5.5" cy="8" r="1.25" />
										<circle cx="10.5" cy="8" r="1.25" />
										<circle cx="5.5" cy="12.5" r="1.25" />
										<circle cx="10.5" cy="12.5" r="1.25" />
									</svg>
								</Panes.MoveTrigger>
							</Panes.DragTrigger>
							<h2 class="text-xs font-semibold in-data-stacked:hidden">{node.data.label}</h2>
							<Panes.TabList {tab} aria-label="Stacked panes" class="flex min-w-0 gap-1 text-xs">
								<Panes.TabListDropRegion
									class="absolute inset-x-0 top-0 hidden h-4 border-t-2 border-dashed border-info-medium in-data-dragging:block in-data-move-mode:block"
								/>
							</Panes.TabList>
							{@render stackMoveTrigger(node)}
							{@render removeButton(node)}
						</header>
					{:else}
						<Panes.DragTrigger>
							<header
								class="flex cursor-grab items-center gap-1 border-b border-light px-1 py-1 active:cursor-grabbing"
							>
								<h2 class="px-1 text-xs font-semibold in-data-stacked:hidden">{node.data.label}</h2>
								<Panes.TabList {tab} aria-label="Stacked panes" class="flex min-w-0 gap-1 text-xs">
									<Panes.TabListDropRegion
										class="absolute inset-x-0 top-0 hidden h-4 border-t-2 border-dashed border-info-medium in-data-dragging:block in-data-move-mode:block"
									/>
								</Panes.TabList>
								<Panes.MoveTrigger
									aria-label="Move {node.data.label}"
									class="ml-auto border border-medium bg-white px-2 py-0.5 text-xs"
								>
									Move
								</Panes.MoveTrigger>
								{@render removeButton(node)}
							</header>
						</Panes.DragTrigger>
					{/if}
					<Panes.PaneBody class="flex min-h-0 flex-1 items-center justify-center text-subtle-2">
						{node.id}
					</Panes.PaneBody>
				</div>
			{/snippet}
		</Panes>
	</div>
	<pre
		class="w-96 shrink-0 overflow-auto border-l border-light bg-light p-3 text-xs text-default">{JSON.stringify(
			layout,
			null,
			2
		)}</pre>
</div>
