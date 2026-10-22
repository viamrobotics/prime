<script lang="ts">
	import '../../../routes/layout.css';

	import type { Attachment } from 'svelte/attachments';
	import { on } from 'svelte/events';

	import { layoutRoot } from '../../__tests__/layout-fixture.ts';
	import type { PaneData } from '../../__tests__/layout-fixture.ts';
	import type { LayoutNode } from '../../layout.ts';
	import SplitView from '../SplitView.svelte';
	import MenuPane from './MenuPane.svelte';

	interface Props {
		/**
		 * `header`: a `dragTrigger` header holding every native control, a `dragIgnore` canvas, and a
		 * separate move button. `drag-only`: a `dragTrigger` header and no `moveTrigger`. `div-move`: a
		 * `moveTrigger` on a focusable `moveTag` with an optional `moveRole`. `menu`: a `moveTrigger` that exists only while a menu is open.
		 */
		variant: 'header' | 'drag-only' | 'div-move' | 'menu';
		/** Passed to `SplitView`. */
		reorderable?: boolean;
		/** The element `div-move` renders. */
		moveTag?: 'div' | 'a';
		/** The `role` of the `div-move` element. */
		moveRole?: string;
		/** Called with the control's name when a native control inside the header receives a click. */
		onControlClick?: (name: string) => void;
	}

	const { variant, reorderable, moveTag = 'div', moveRole, onControlClick }: Props = $props();

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
	<SplitView bind:layout {reorderable} paneLabel={(node) => node.data.label} class="size-full">
		{#snippet pane(node, controls)}
			{@const label = node.data.label}
			{#if variant === 'header'}
				<header
					data-header={label}
					class="absolute top-0 left-0 z-10 flex flex-wrap items-center gap-1 bg-light p-1"
					{@attach controls.dragTrigger}
				>
					<span data-header-text={label}>{label}</span>
					<button type="button" data-control="button" {@attach reportClicks('button')}>
						Remove
					</button>
					<a href="#unused" data-control="a" {@attach reportClicks('a')}>Docs</a>
					<input
						aria-label="Note for {label}"
						data-control="input"
						{@attach reportClicks('input')}
					/>
					<select
						aria-label="Size for {label}"
						data-control="select"
						{@attach reportClicks('select')}
					>
						<option>Small</option>
						<option>Large</option>
					</select>
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
						{@attach controls.dragIgnore}
					></canvas>
					<button type="button" aria-label="Move {label}" {@attach controls.moveTrigger}>
						Move
					</button>
				</header>
			{:else if variant === 'drag-only'}
				<header
					data-header={label}
					class="absolute top-0 left-0 z-10 bg-light p-1"
					{@attach controls.dragTrigger}
				>
					<span data-header-text={label}>{label}</span>
				</header>
			{:else if variant === 'div-move'}
				<svelte:element
					this={moveTag}
					role={moveRole}
					tabindex="0"
					href={moveTag === 'a' ? '#unused' : undefined}
					data-move-div={label}
					class="absolute top-2 left-2 z-10"
					{@attach controls.moveTrigger}
				>
					Move {label}
				</svelte:element>
			{:else}
				<MenuPane {label} {controls} />
			{/if}
			<div data-testid="pane" data-pane-id={node.id} class="size-full">{label}</div>
		{/snippet}
	</SplitView>
</div>
