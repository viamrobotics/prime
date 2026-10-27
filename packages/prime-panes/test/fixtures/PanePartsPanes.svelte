<script lang="ts">
	import '../../src/routes/layout.css';

	import type { Snippet } from 'svelte';
	import type { Attachment } from 'svelte/attachments';
	import { on } from 'svelte/events';

	import { layoutRoot } from '../layouts.ts';
	import type { PaneData } from '../layouts.ts';
	import type { LayoutNode } from '../../src/lib/layout.ts';
	import type { DragPreview } from '../../src/lib/Panes/drag-preview.ts';
	import { dragIgnore } from '../../src/lib/Panes/drag-ignore.ts';
	import { Panes } from '../../src/lib/Panes/panes.ts';
	import MenuPane from './MenuPane.svelte';
	import RemovableDragHeader from './RemovableDragHeader.svelte';

	interface Props {
		// header: DragTrigger header with every control and a dragIgnore canvas, plus a MoveTrigger button.
		// div-move: MoveTrigger child as moveTag. menu: MoveTrigger only while a menu is open.
		variant: 'header' | 'drag-only' | 'div-move' | 'menu' | 'removable';
		reorderable?: boolean;
		moveTag?: 'div' | 'a';
		moveRole?: string;
		onControlClick?: (name: string) => void;
		dragPreview?: Snippet<[DragPreview<PaneData>]>;
	}

	const {
		variant,
		reorderable,
		moveTag = 'div',
		moveRole,
		onControlClick,
		dragPreview
	}: Props = $props();

	let layout = $state<LayoutNode<PaneData> | undefined>(structuredClone(layoutRoot));

	export function getLayout() {
		return $state.snapshot(layout);
	}

	const reportClicks =
		(name: string): Attachment<HTMLElement> =>
		(element) =>
			on(element, 'click', (event) => {
				event.preventDefault();
				onControlClick?.(name);
			});
</script>

<div data-testid="frame" style="width: 800px; height: 600px">
	<Panes
		bind:layout
		{reorderable}
		{dragPreview}
		paneLabel={(node) => node.data.label}
		class="size-full"
	>
		{#snippet pane(node)}
			{@const label = node.data.label}
			{#if variant === 'header'}
				<Panes.DragTrigger>
					<header
						data-header={label}
						class="absolute top-0 left-0 z-10 flex flex-wrap items-center gap-1 bg-light p-1"
					>
						<span data-header-text={label}>{label}</span>
						<button type="button" data-control="button" {@attach reportClicks('button')}>
							Remove
						</button>
						<a href="#unused" data-control="a" {@attach reportClicks('a')}>Docs</a>
						<select
							aria-label="Size for {label}"
							data-control="select"
							{@attach reportClicks('select')}
						>
							<option>Small</option>
							<option>Large</option>
						</select>
						<div
							role="button"
							tabindex="0"
							data-control="role-button"
							{@attach reportClicks('role-button')}
						>
							Pin
						</div>
						<input
							aria-label="Note for {label}"
							data-control="input"
							{@attach reportClicks('input')}
						/>
						<textarea
							aria-label="Description of {label}"
							data-control="textarea"
							{@attach reportClicks('textarea')}
						></textarea>
						<div
							role="textbox"
							tabindex="0"
							aria-label="Caption of {label}"
							contenteditable="true"
							data-control="contenteditable"
							{@attach reportClicks('contenteditable')}
						>
							Caption
						</div>
						<canvas
							aria-label="Plot of {label}"
							data-ignored={label}
							width="40"
							height="16"
							{@attach dragIgnore}
						></canvas>
						<Panes.MoveTrigger aria-label="Move {label}">Move</Panes.MoveTrigger>
					</header>
				</Panes.DragTrigger>
			{:else if variant === 'drag-only'}
				<Panes.DragTrigger>
					<header data-header={label} class="absolute top-0 left-0 z-10 bg-light p-1">
						<span data-header-text={label}>{label}</span>
					</header>
				</Panes.DragTrigger>
			{:else if variant === 'div-move'}
				<Panes.MoveTrigger>
					{#snippet child({ props })}
						<svelte:element
							this={moveTag}
							role={moveRole}
							tabindex="0"
							href={moveTag === 'a' ? '#unused' : undefined}
							data-move-div={label}
							class="absolute top-2 left-2 z-10"
							{...props}
						>
							Move {label}
						</svelte:element>
					{/snippet}
				</Panes.MoveTrigger>
			{:else if variant === 'removable'}
				<RemovableDragHeader {label} />
			{:else}
				<MenuPane {label} />
			{/if}
			<section aria-label={label} data-testid="pane" data-pane-id={node.id} class="size-full">
				{label}
			</section>
		{/snippet}
	</Panes>
</div>
