<script lang="ts">
	import { addPaneToUpperRight, removePane, SplitView } from '../lib/index.ts';
	import type { LayoutNode, PaneNode } from '../lib/index.ts';

	type PaneData = { label: string };
	type Variant = 'grip' | 'header';

	const VARIANTS = [
		{ value: 'grip', label: 'Grip button' },
		{ value: 'header', label: 'Draggable header' }
	] as const satisfies readonly { value: Variant; label: string }[];

	let reorderable = $state(true);
	let variant = $state<Variant>('grip');

	let layout = $state<LayoutNode<PaneData> | undefined>({
		type: 'split',
		id: 'root',
		direction: 'column',
		ratio: 0.3,
		first: { type: 'pane', id: 'camera', data: { label: 'Camera' } },
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
				second: { type: 'pane', id: 'camera-2', data: { label: 'Camera 2' } }
			}
		}
	});

	let counter = 5;

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

<div class="flex h-screen">
	<div class="flex min-w-0 flex-1 flex-col">
		<div
			class="flex items-center gap-4 border-b border-light bg-light px-3 py-2 text-xs text-default"
		>
			<label class="flex items-center gap-2">
				<input type="checkbox" bind:checked={reorderable} />
				Reorderable
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
		<SplitView
			bind:layout
			{reorderable}
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
							<SplitView.DragTrigger>
								<SplitView.MoveTrigger
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
								</SplitView.MoveTrigger>
							</SplitView.DragTrigger>
							<h2 class="text-xs font-semibold">{node.data.label}</h2>
							{@render removeButton(node)}
						</header>
					{:else}
						<SplitView.DragTrigger>
							<header
								class="flex cursor-grab items-center gap-1 border-b border-light px-1 py-1 active:cursor-grabbing"
							>
								<h2 class="px-1 text-xs font-semibold">{node.data.label}</h2>
								<SplitView.MoveTrigger
									aria-label="Move {node.data.label}"
									class="ml-auto border border-medium bg-white px-2 py-0.5 text-xs"
								>
									Move
								</SplitView.MoveTrigger>
								{@render removeButton(node)}
							</header>
						</SplitView.DragTrigger>
					{/if}
					<div class="flex min-h-0 flex-1 items-center justify-center text-subtle-2">
						{node.id}
					</div>
				</div>
			{/snippet}
		</SplitView>
	</div>
	<pre
		class="w-96 shrink-0 overflow-auto border-l border-light bg-light p-3 text-xs text-default">{JSON.stringify(
			layout,
			null,
			2
		)}</pre>
</div>
