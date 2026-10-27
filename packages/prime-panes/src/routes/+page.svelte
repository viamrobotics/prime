<script lang="ts">
	import {
		addPaneToUpperRight,
		floatPane,
		removeFloat,
		removePane,
		setFloatRect,
		Panes
	} from '../lib/index.ts';
	import type { FloatRect, LayoutNode, PaneNode, PaneState } from '../lib/index.ts';

	type PaneData = { label: string; camera?: true };
	type Variant = 'grip' | 'header';

	const VARIANTS = [
		{ value: 'grip', label: 'Grip button' },
		{ value: 'header', label: 'Draggable header' }
	] as const satisfies readonly { value: Variant; label: string }[];

	const WORKSPACE_ID = 'workspace';
	const NEW_WINDOW_RECT: FloatRect = { x: 48, y: 48, width: 280, height: 200 };
	const LARGE_MINIMUM = { width: 280, height: 200 };
	const WINDOW_STEP = 40;

	const paneNode = (id: string, label: string, camera?: true): PaneNode<PaneData> => ({
		type: 'pane',
		id,
		data: camera ? { label, camera } : { label }
	});

	// A split area beside a float area. The split area nests a float node, and the float area's
	// windows hold a split, a stack, and a single pane.
	const INITIAL_LAYOUT: LayoutNode<PaneData> = {
		type: 'split',
		id: 'root',
		direction: 'row',
		ratio: 0.45,
		first: {
			type: 'split',
			id: 'dashboard',
			direction: 'column',
			ratio: 0.35,
			first: {
				type: 'stack',
				id: 'cameras',
				activeId: 'camera-1',
				panes: [
					paneNode('camera-1', 'Camera 1', true),
					paneNode('camera-2', 'Camera 2', true),
					paneNode('camera-3', 'Camera 3', true)
				]
			},
			second: {
				type: 'split',
				id: 'readouts',
				direction: 'row',
				ratio: 0.5,
				first: paneNode('time-series', 'Time series'),
				second: {
					type: 'float',
					id: 'inset',
					base: paneNode('stat', 'Sensor stat'),
					floats: [
						{
							id: 'log-window',
							rect: { x: 16, y: 56, width: 200, height: 150 },
							content: paneNode('log', 'Event log')
						}
					]
				}
			}
		},
		second: {
			type: 'float',
			id: WORKSPACE_ID,
			base: {
				type: 'split',
				id: 'workspace-base',
				direction: 'column',
				ratio: 0.6,
				first: paneNode('map', 'Map'),
				second: paneNode('telemetry', 'Telemetry')
			},
			floats: [
				{
					id: 'joints-window',
					rect: { x: 24, y: 24, width: 360, height: 200 },
					content: {
						type: 'split',
						id: 'joints',
						direction: 'row',
						ratio: 0.5,
						first: paneNode('joint-a', 'Joint A'),
						second: paneNode('joint-b', 'Joint B')
					}
				},
				{
					id: 'arm-cameras-window',
					rect: { x: 220, y: 260, width: 300, height: 200 },
					content: {
						type: 'stack',
						id: 'arm-cameras',
						activeId: 'camera-4',
						panes: [paneNode('camera-4', 'Camera 4', true), paneNode('camera-5', 'Camera 5', true)]
					}
				},
				{
					id: 'notes-window',
					rect: { x: 40, y: 300, width: 220, height: 160 },
					content: paneNode('notes', 'Notes')
				}
			]
		}
	};

	let reorderable = $state(true);
	let keepInactiveMounted = $state(false);
	let largeMinimum = $state(false);
	let variant = $state<Variant>('grip');

	let layout = $state<LayoutNode<PaneData> | undefined>(structuredClone(INITIAL_LAYOUT));

	let counter = 6;

	const nextId = (prefix: string) => {
		counter += 1;
		return `${prefix}-${counter}`;
	};

	const addPane = () => {
		const id = nextId('pane');
		layout = addPaneToUpperRight(layout, paneNode(id, `Pane ${counter}`), nextId('split'));
	};

	// Floats over the workspace while it exists, and over the root once it has collapsed.
	const addWindow = () => {
		const id = nextId('pane');
		const added = addPaneToUpperRight(layout, paneNode(id, `Window ${counter}`), nextId('split'));
		const entryId = nextId('window');
		const floatId = nextId('float');
		const overWorkspace = floatPane(added, id, NEW_WINDOW_RECT, entryId, floatId, WORKSPACE_ID);
		layout =
			overWorkspace === added
				? floatPane(added, id, NEW_WINDOW_RECT, entryId, floatId)
				: overWorkspace;
	};

	const popOut = (node: PaneNode<PaneData>) => {
		layout = floatPane(layout, node.id, NEW_WINDOW_RECT, nextId('window'), nextId('float'));
	};

	const adjustWindow = (entryId: string, change: (rect: FloatRect) => FloatRect) => {
		layout = setFloatRect(layout, entryId, change);
	};

	const WINDOW_CONTROLS = [
		{
			label: 'Move window left',
			glyph: '←',
			change: (rect: FloatRect) => ({ ...rect, x: rect.x - WINDOW_STEP })
		},
		{
			label: 'Move window right',
			glyph: '→',
			change: (rect: FloatRect) => ({ ...rect, x: rect.x + WINDOW_STEP })
		},
		{
			label: 'Move window up',
			glyph: '↑',
			change: (rect: FloatRect) => ({ ...rect, y: rect.y - WINDOW_STEP })
		},
		{
			label: 'Move window down',
			glyph: '↓',
			change: (rect: FloatRect) => ({ ...rect, y: rect.y + WINDOW_STEP })
		},
		{
			label: 'Shrink window',
			glyph: '−',
			change: (rect: FloatRect) => ({
				...rect,
				width: rect.width - WINDOW_STEP,
				height: rect.height - WINDOW_STEP
			})
		},
		{
			label: 'Grow window',
			glyph: '+',
			change: (rect: FloatRect) => ({
				...rect,
				width: rect.width + WINDOW_STEP,
				height: rect.height + WINDOW_STEP
			})
		}
	] as const;
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

{#snippet popOutButton(node: PaneNode<PaneData>)}
	<button
		type="button"
		aria-label="Pop out {node.data.label}"
		class="border border-medium bg-white px-2 py-0.5 text-xs"
		onclick={() => popOut(node)}
	>
		Pop out
	</button>
{/snippet}

{#snippet tab(item: PaneNode<PaneData>)}
	{item.data.label}
{/snippet}

{#snippet tabList()}
	<Panes.TabList {tab} aria-label="Stacked panes" class="flex min-w-0 gap-1 text-xs">
		<Panes.TabListDropRegion
			class="absolute inset-x-0 top-0 hidden h-4 border-t-2 border-dashed border-info-medium in-data-dragging:block in-data-move-mode:block"
		/>
	</Panes.TabList>
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

{#snippet grip(node: PaneNode<PaneData>)}
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
{/snippet}

<!-- The grip drags the pane out to dock or stack it. The title area drags the whole window. -->
{#snippet windowHeader(node: PaneNode<PaneData>, paneState: PaneState)}
	<header class="flex items-center gap-1 border-b border-light bg-light px-1 py-1">
		{@render grip(node)}
		<Panes.DragTrigger target="float">
			<div class="flex min-w-0 flex-1 cursor-move items-center gap-1 self-stretch">
				<h2 class="truncate px-1 text-xs font-semibold in-data-stacked:hidden">
					{node.data.label}
				</h2>
				{@render tabList()}
			</div>
		</Panes.DragTrigger>
		<Panes.MoveTrigger
			target="float"
			aria-label="Move {node.data.label} out of its window"
			class="border border-medium bg-white px-2 py-0.5 text-xs"
		>
			Dock
		</Panes.MoveTrigger>
		<button
			type="button"
			aria-label="Close the window holding {node.data.label}"
			class="inline-flex size-6 items-center justify-center text-subtle-1"
			onclick={() => (layout = removeFloat(layout, paneState.floatEntryId!))}
		>
			<svg viewBox="0 0 16 16" class="size-4" fill="none" stroke="currentColor" aria-hidden="true">
				<path d="M4 4l8 8M12 4l-8 8" />
			</svg>
		</button>
	</header>
{/snippet}

{#snippet windowControls(paneState: PaneState)}
	<div class="flex gap-1">
		{#each WINDOW_CONTROLS as control (control.label)}
			<button
				type="button"
				aria-label={control.label}
				class="inline-flex size-6 items-center justify-center border border-medium bg-white text-xs"
				onclick={() => adjustWindow(paneState.floatEntryId!, control.change)}
			>
				{control.glyph}
			</button>
		{/each}
	</div>
{/snippet}

<div class="flex h-screen">
	<div class="flex min-w-0 flex-1 flex-col">
		<div
			class="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-light bg-light px-3 py-2 text-xs text-default"
		>
			<label class="flex items-center gap-2">
				<input type="checkbox" bind:checked={reorderable} />
				Reorderable
			</label>
			<label class="flex items-center gap-2">
				<input type="checkbox" bind:checked={keepInactiveMounted} />
				Keep inactive mounted
			</label>
			<label class="flex items-center gap-2">
				<input type="checkbox" bind:checked={largeMinimum} />
				Large window minimum
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
			<button type="button" class="border border-medium bg-white px-2 py-1" onclick={addWindow}>
				Add window
			</button>
			<button
				type="button"
				class="border border-medium bg-white px-2 py-1"
				onclick={() => (layout = structuredClone(INITIAL_LAYOUT))}
			>
				Reset layout
			</button>
			<p class="text-subtle-1">
				A window's title moves it, and its grip drags the pane out to dock or stack. Shift+drag
				swaps the two. A focused window moves with the arrows and resizes with Alt+Arrow. In move
				mode, F6 switches between the base and each window.
			</p>
		</div>
		<Panes
			bind:layout
			{reorderable}
			{keepInactiveMounted}
			floatMinSize={largeMinimum ? () => LARGE_MINIMUM : undefined}
			paneLabel={(node) => node.data.label}
			class="min-h-0 flex-1"
		>
			{#snippet empty()}
				<div class="flex size-full items-center justify-center text-sm text-subtle-2">
					No panes. Add one to start.
				</div>
			{/snippet}
			{#snippet pane(node, paneState)}
				<div
					class={[
						'flex size-full flex-col border bg-white text-sm text-default',
						paneState.isFloating ? 'border-medium' : 'border-light'
					]}
				>
					{#if paneState.isFloating}
						{@render windowHeader(node, paneState)}
					{:else if variant === 'grip'}
						<header class="flex items-center gap-1 border-b border-light px-1 py-1">
							{@render grip(node)}
							<h2 class="text-xs font-semibold in-data-stacked:hidden">{node.data.label}</h2>
							{@render tabList()}
							{@render stackMoveTrigger(node)}
							{@render popOutButton(node)}
							{@render removeButton(node)}
						</header>
					{:else}
						<Panes.DragTrigger>
							<header
								class="flex cursor-grab items-center gap-1 border-b border-light px-1 py-1 active:cursor-grabbing"
							>
								<h2 class="px-1 text-xs font-semibold in-data-stacked:hidden">{node.data.label}</h2>
								{@render tabList()}
								<Panes.MoveTrigger
									aria-label="Move {node.data.label}"
									class="ml-auto border border-medium bg-white px-2 py-0.5 text-xs"
								>
									Move
								</Panes.MoveTrigger>
								{@render popOutButton(node)}
								{@render removeButton(node)}
							</header>
						</Panes.DragTrigger>
					{/if}
					<Panes.PaneBody
						class="flex min-h-0 flex-1 flex-col items-center justify-center gap-2 text-subtle-2"
					>
						{node.id}
						{#if paneState.isFloating}
							{@render windowControls(paneState)}
						{/if}
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
