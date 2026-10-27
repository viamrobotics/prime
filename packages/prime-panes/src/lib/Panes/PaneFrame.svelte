<script lang="ts" generics="TData">
	import { onMount, tick } from 'svelte';

	import { getDragRegion, insertionIndexAt, stackSideOf } from '../drop-region.ts';
	import type { DropRect } from '../drop-region.ts';
	import type { PaneNode, StackNode } from '../layout.ts';

	import { edgeOfArrow } from './arrow-regions.ts';
	import { createAttachedElements } from './attached-elements.ts';
	import { INDICATOR_CLASSES_BY_REGION } from './indicator-geometry.ts';
	import { movingNotice, reorderedMessage } from './move-wording.ts';
	import type { PaneState } from './pane-state.ts';
	import MoveTarget from './MoveTarget.svelte';
	import { isInSameRoot } from './root-scope.ts';
	import { reorderPane, selectPane } from '../tree.ts';
	import { providePane, usePanes } from './usePanes.svelte.ts';
	import type { DragPoint, DragSource, TabInsertion } from './usePanes.svelte.ts';

	interface Props {
		node: PaneNode<TData>;
		stack?: StackNode<TData>;
	}

	const ARROW_KEY_CONTROLS = 'input, select, textarea, [contenteditable]';

	const { node, stack }: Props = $props();

	const context = usePanes();

	let dropRegionCount = $state(0);
	let tabListCount = $state(0);
	let moveInsertion = $state.raw<TabInsertion>();

	const isShown = $derived(stack === undefined || stack.activeId === node.id);
	const isMoving = $derived.by(() => {
		const source = context.movingSource;
		if (source === undefined || !isShown) return false;
		switch (source.type) {
			case 'stack':
				return source.id === stack?.id;
			case 'pane':
				return source.id === node.id;
			default:
				return source.type satisfies never;
		}
	});
	const movingNoticeText = $derived(
		isMoving && context.movingLabel !== undefined ? movingNotice(context.movingLabel) : undefined
	);
	const destination = $derived(
		context.destinationFor(node, stack, {
			hasStackRegion: dropRegionCount > 0,
			hasTabList: tabListCount > 0
		})
	);
	const dragPress = $derived(context.dragPress?.paneId === node.id ? context.dragPress : undefined);
	const isDragArmed = $derived(dragPress?.phase === 'armed');
	const dragOver = $derived(context.dragOver?.paneId === node.id ? context.dragOver : undefined);
	// A stacked pane previews the drop as a tab in its strip, and a tint over the region would only hide the tab labels.
	const showsPreviewTab = $derived(dragOver?.target.region === 'stack' && stack !== undefined);

	const paneState: PaneState = {
		get isStacked() {
			return stack !== undefined;
		},
		get isMoving() {
			return isMoving;
		},
		get isDragArmed() {
			return isDragArmed;
		}
	};

	let wrapper = $state<HTMLElement>();

	const tabIdIn = (ownerId: string, paneId: string) =>
		`${context.idPrefix}-tab-${ownerId}-${paneId}`;
	const tabId = (paneId: string) => tabIdIn(node.id, paneId);
	const panelIdOf = (paneId: string) => `${context.idPrefix}-panel-${paneId}`;

	const moveTriggers = createAttachedElements();
	const tabLists = createAttachedElements();
	const dropRegions = createAttachedElements();
	const bodies = createAttachedElements();
	let moveTriggerElements: HTMLElement[] = [];

	function toggleMove(source: DragSource) {
		if (context.isMoving(source)) {
			context.cancelMove();
		} else {
			context.startMove(node.id, source);
		}
	}

	function select(paneId: string) {
		context.abandonMove();
		const isAccepted = context.update((root) => selectPane(root, paneId));
		if (!isAccepted) return;
		// Selecting swaps which pane renders, so the tab that held focus may be gone.
		void tick().then(() => document.getElementById(tabIdIn(paneId, paneId))?.focus());
	}

	function reorder(paneId: string, index: number) {
		if (stack === undefined) return;

		context.abandonMove();
		const isAccepted = context.update((root) =>
			selectPane(reorderPane(root, paneId, index), paneId)
		);
		if (!isAccepted) return;

		const position = { position: index + 1, total: stack.panes.length };
		context.notify(reorderedMessage(context.labelFor(paneId), position));
		// Showing the moved pane can remount the pane that held focus.
		void tick().then(() => document.getElementById(tabIdIn(paneId, paneId))?.focus());
	}

	providePane({
		get stack() {
			return stack;
		},
		get moveInsertion() {
			return moveInsertion;
		},
		get paneId() {
			return node.id;
		},
		get hasTabList() {
			return tabListCount > 0;
		},
		tabId,
		reorder,
		panelId: panelIdOf,
		registerPanel: () => context.registerPanel(node.id),
		select,
		registerTabList(tabList) {
			const detach = tabLists.attach(tabList);
			tabListCount += 1;
			return () => {
				detach();
				tabListCount -= 1;
			};
		},
		registerDropRegion(region) {
			const detach = dropRegions.attach(region);
			dropRegionCount += 1;
			return () => {
				detach();
				dropRegionCount -= 1;
			};
		},
		registerBody: bodies.attach,
		isMoving: context.isMoving,
		get isDragArmed() {
			return isDragArmed;
		},
		sourceFor(type) {
			switch (type) {
				case 'stack':
					return stack ? { type, id: stack.id } : { type: 'pane', id: node.id };
				case 'pane':
					return { type, id: node.id };
				default:
					return type satisfies never;
			}
		},
		holdDrag: (source) => context.holdDrag(node.id, source),
		armDrag: (source) => context.armDrag(node.id, source),
		disarmDrag: context.disarmDrag,
		startDrag: context.startDrag,
		moveDrag: context.moveDrag,
		finishDrag: context.finishDrag,
		cancelDrag: context.cancelDrag,
		toggleMove,
		registerMoveTrigger(trigger, target) {
			const detach = moveTriggers.attach(trigger);
			moveTriggerElements = [...moveTriggerElements, trigger];
			context.recordMoveTrigger(node.id, target);
			return () => {
				detach();
				moveTriggerElements = moveTriggerElements.filter((element) => element !== trigger);
			};
		}
	});

	onMount(() =>
		context.registerPane(node.id, {
			focus: () => (moveTriggers.latest ?? wrapper)?.focus(),
			focusWrapper: () => wrapper?.focus(),
			bounds: () => wrapper?.getBoundingClientRect()
		})
	);

	// The client x that `offsetLeft` counts from for the children of `tabList`.
	function offsetOriginOf(tabList: HTMLElement, child: HTMLElement) {
		const { left } = tabList.getBoundingClientRect();
		if (child.offsetParent === tabList) return left + tabList.clientLeft - tabList.scrollLeft;
		return left - tabList.offsetLeft;
	}

	function tabRectsIn(tabList: HTMLElement, liftedId: string | undefined): DropRect[] {
		const elements = [
			...tabList.querySelectorAll<HTMLElement>('[data-tab-pane-id], [data-tab-preview]')
		];
		const rects: DropRect[] = [];
		let vacatedWidth = 0;

		elements.forEach((element, position) => {
			const paneId = element.dataset.tabPaneId;
			if (paneId === undefined || paneId === liftedId) {
				const next = elements[position + 1];
				// The preview and the lifted tab leave no room, so the tabs after them count from where they would sit without them.
				if (next) vacatedWidth += next.offsetLeft - element.offsetLeft;
				return;
			}
			// Offsets, not bounding rects, which include the transform of a running shift animation.
			rects.push({
				left: offsetOriginOf(tabList, element) + element.offsetLeft - vacatedWidth,
				top: element.offsetTop,
				width: element.offsetWidth,
				height: element.offsetHeight
			});
		});
		return rects;
	}

	function isPointIn(rect: DOMRect | undefined, { clientX, clientY }: DragPoint) {
		return (
			rect !== undefined &&
			clientX >= rect.left &&
			clientX < rect.right &&
			clientY >= rect.top &&
			clientY < rect.bottom
		);
	}

	function bodyRectOf() {
		return (bodies.latest ?? wrapper)!.getBoundingClientRect();
	}

	// The x of the pointer maps onto the tabs over them, and over a region along the top or bottom of the pane. A region down a side has no such mapping, so a drop there appends.
	function tabIndexAt(point: DragPoint, liftedId: string | undefined) {
		const tabList = tabLists.latest;
		if (!stack || !tabList) return undefined;

		const regionRect = dropRegions.latest?.getBoundingClientRect();
		const regionSide = regionRect && stackSideOf(regionRect, bodyRectOf());
		const isAlongRegion =
			isPointIn(regionRect, point) && (regionSide === 'top' || regionSide === 'bottom');
		if (!isPointIn(tabList.getBoundingClientRect(), point) && !isAlongRegion) return undefined;

		return insertionIndexAt(point.clientX, tabRectsIn(tabList, liftedId));
	}

	function dropTargetAt(point: DragPoint) {
		if (wrapper === undefined) return undefined;

		const { dragSource } = context;
		const liftedId = dragSource?.type === 'pane' ? dragSource.id : undefined;
		const isOwnStack = stack?.panes.some((stacked) => stacked.id === liftedId) ?? false;
		const region = getDragRegion(point.clientX, point.clientY, {
			bodyRect: bodyRectOf(),
			regionRect: dropRegions.latest?.getBoundingClientRect(),
			tabListRect: tabLists.latest?.getBoundingClientRect(),
			isOwnStack
		});
		const index = region === 'stack' ? tabIndexAt(point, liftedId) : undefined;
		return context.dropTargetFor(node, stack, region, index);
	}

	function moveTabIndexAt(clientX: number, clientY: number) {
		const { movingSource } = context;
		const liftedId = movingSource?.type === 'pane' ? movingSource.id : undefined;
		return tabIndexAt({ clientX, clientY }, liftedId);
	}

	// A reorder moves along the pane's own tabs, so its zone is the tab list and not the drop region.
	function stackRect() {
		const zone = destination?.insertion?.isReorder ? tabLists.latest : dropRegions.latest;
		return zone?.getBoundingClientRect();
	}

	onMount(() => wrapper && context.registerDropSurface(node.id, wrapper, dropTargetAt));

	function handleKeydown(event: KeyboardEvent) {
		const edge = edgeOfArrow(event);
		if (!isMoving || edge === undefined || event.defaultPrevented) return;
		if (!isInSameRoot(event.target, event.currentTarget)) return;
		// An arrow inside a control that reads it, such as a text field, is the control's.
		if (event.target instanceof Element && event.target.closest(ARROW_KEY_CONTROLS)) return;

		if (context.crossToNeighbor(node.id, edge)) event.preventDefault();
	}

	function stackZoneStyleOf(dropRegion: HTMLElement, overlay: HTMLElement) {
		const zone = dropRegion.getBoundingClientRect();
		const overlayRect = overlay.getBoundingClientRect();
		return `top: ${zone.top - overlayRect.top}px; left: ${zone.left - overlayRect.left}px; width: ${zone.width}px; height: ${zone.height}px`;
	}

	function moveTriggerAt(clientX: number, clientY: number) {
		return document
			.elementsFromPoint(clientX, clientY)
			.find((element) => moveTriggerElements.some((trigger) => trigger === element));
	}

	function currentStackZoneStyle() {
		const dropRegion = dropRegions.latest;
		return dropRegion && wrapper ? stackZoneStyleOf(dropRegion, wrapper) : undefined;
	}

	const dropIndicatorStyle = $derived(
		dragOver?.target.region === 'stack' ? currentStackZoneStyle() : undefined
	);
</script>

<div class="relative size-full min-h-0 min-w-0">
	<!-- The consumer's Panes.DragTrigger is the control. This element is the pane's drop surface and receives the arrow keys that leave the moving pane. -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		bind:this={wrapper}
		tabindex="-1"
		data-stacked={stack ? '' : undefined}
		data-moving={isMoving ? '' : undefined}
		data-drag-armed={isDragArmed ? '' : undefined}
		inert={destination !== undefined && !isMoving}
		class="peer relative size-full min-h-0 min-w-0 outline-info-dark focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-solid data-drag-armed:outline-2 data-drag-armed:-outline-offset-2 data-drag-armed:outline-solid data-moving:focus:outline-2 data-moving:focus:-outline-offset-2 data-moving:focus:outline-solid"
		onkeydown={handleKeydown}
	>
		{@render context.pane(node, paneState)}
		<div
			data-drop-overlay
			class={[
				'absolute inset-0 z-20',
				context.dragSource === undefined ? 'pointer-events-none' : 'cursor-grabbing'
			]}
		></div>
		{#if dragOver && !showsPreviewTab}
			<div
				data-drop-indicator={dragOver.target.region}
				style={dropIndicatorStyle}
				class={[
					'pointer-events-none absolute z-20 bg-info-medium/50 motion-safe:transition-all',
					INDICATOR_CLASSES_BY_REGION[dragOver.target.region]
				]}
			></div>
		{/if}
	</div>
	{#if movingNoticeText !== undefined}
		<!-- The wash gives way by the outline's width while the wrapper is focused, so it does not tint the outline. -->
		<div
			data-moving-wash
			class="pointer-events-none absolute inset-0 z-30 bg-gray-2/80 peer-focus:inset-0.5"
		></div>
		<div
			data-moving-notice
			class="pointer-events-none absolute inset-0 z-30 flex items-center justify-center p-2"
		>
			<p class="max-w-full bg-info-light px-2 py-1 text-center text-xs text-info-dark">
				{movingNoticeText}
			</p>
		</div>
	{/if}
	{#if destination !== undefined && context.movingLabel !== undefined}
		<MoveTarget
			paneId={node.id}
			{destination}
			movingLabel={context.movingLabel}
			{stackRect}
			bodyRect={() => bodies.latest?.getBoundingClientRect()}
			insertionIndexAt={moveTabIndexAt}
			onpreview={(insertion) => (moveInsertion = insertion)}
			{moveTriggerAt}
		/>
	{/if}
</div>
