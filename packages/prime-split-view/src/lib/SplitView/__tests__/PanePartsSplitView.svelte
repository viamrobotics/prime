<script lang="ts">
	import '../../../routes/layout.css';

	import type { Attachment } from 'svelte/attachments';
	import { on } from 'svelte/events';

	import { layoutRoot } from '../../__tests__/layout-fixture.ts';
	import type { PaneData } from '../../__tests__/layout-fixture.ts';
	import type { LayoutNode } from '../../layout.ts';
	import { dragIgnore } from '../drag-ignore.ts';
	import { SplitView } from '../split-view.ts';
	import MenuPane from './MenuPane.svelte';
	import RemovableDragHeader from './RemovableDragHeader.svelte';

	interface Props {
		/**
		 * `header`: a `SplitView.DragTrigger` header holding every control and text field, a `dragIgnore`
		 * canvas, and a separate `SplitView.MoveTrigger` button. `drag-only`: a `SplitView.DragTrigger` header
		 * and no `SplitView.MoveTrigger`. `div-move`: a `SplitView.MoveTrigger` that renders a focusable
		 * `moveTag` through `child`, with an optional `moveRole`. `menu`: a `SplitView.MoveTrigger` that exists
		 * only while a menu is open. `removable`: a `SplitView.DragTrigger` header that a button removes.
		 */
		variant: 'header' | 'drag-only' | 'div-move' | 'menu' | 'removable';
		/** Passed to `SplitView`. */
		reorderable?: boolean;
		/** The element `div-move` renders. */
		moveTag?: 'div' | 'a';
		/** The `role` of the `div-move` element. */
		moveRole?: string;
		/** Called with the control's name when a control or text field inside the header receives a click. */
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
		{#snippet pane(node)}
			{@const label = node.data.label}
			{#if variant === 'header'}
				<SplitView.DragTrigger>
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
						<SplitView.MoveTrigger aria-label="Move {label}">Move</SplitView.MoveTrigger>
					</header>
				</SplitView.DragTrigger>
			{:else if variant === 'drag-only'}
				<SplitView.DragTrigger>
					<header data-header={label} class="absolute top-0 left-0 z-10 bg-light p-1">
						<span data-header-text={label}>{label}</span>
					</header>
				</SplitView.DragTrigger>
			{:else if variant === 'div-move'}
				<SplitView.MoveTrigger>
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
				</SplitView.MoveTrigger>
			{:else if variant === 'removable'}
				<RemovableDragHeader {label} />
			{:else}
				<MenuPane {label} />
			{/if}
			<div data-testid="pane" data-pane-id={node.id} class="size-full">{label}</div>
		{/snippet}
	</SplitView>
</div>
