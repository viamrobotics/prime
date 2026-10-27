import { DEV } from 'esm-env';
import { getContext, setContext, tick } from 'svelte';

import type { Snippet } from 'svelte';
import { SvelteSet } from 'svelte/reactivity';
import type { Slot } from '../node-kind.ts';
import { placementFor } from '../drop-region.ts';
import type { DropRegion, EdgeRegion } from '../drop-region.ts';
import type { LayoutNode, PaneNode, StackNode } from '../layout.ts';
import { movePane, moveStack, reorderPane, selectPane, stackPanes, swapSlots } from '../tree.ts';

import { ALL_REGIONS, EDGE_REGIONS, OPPOSITE_EDGE, OWN_SLOT_REGIONS } from './arrow-regions.ts';
import { hasDestination, paneIdToSkip, resolveDropTarget } from './drop-target.ts';
import { findPane, listSlots, listStacks } from './list-panes.ts';
import {
	CANCELED_MESSAGE,
	joinLabels,
	MISSING_MOVE_TRIGGER_WARNING,
	placedMessage,
	rejectedMessage,
	reorderedMessage,
	startedMessage
} from './move-wording.ts';
import type { DragPreview } from './drag-preview.ts';
import { createNodeId } from './node-id.ts';
import type { PaneState } from './pane-state.ts';
import { shownPaneId } from './shown-pane.ts';
import { findNeighbor } from './spatial-neighbor.ts';
import type { PaneBounds } from './spatial-neighbor.ts';

export interface RegisteredPane {
	focus: () => void;
	focusWrapper: () => void;
	bounds: () => PaneBounds | undefined;
}

export interface DragSource {
	type: 'pane' | 'stack';
	id: string;
}

export interface DropTarget {
	// For a reorder within a stack, the moving pane itself.
	targetId: string;
	region: DropRegion;
	// For `stack`, omitted means the end of the target's tab order.
	index?: number;
}

// Indices count from zero.
export interface MoveInsertion {
	lastIndex: number;
	total: number;
	defaultIndex: number;
	isReorder: boolean;
}

export interface MoveDestination {
	// On the moving pane's own slot it is a stack-mate.
	targetId: string;
	label: string;
	regions: readonly DropRegion[];
	insertion?: MoveInsertion;
}

export interface TabInsertion {
	index: number;
	panes: readonly PaneNode<unknown>[];
	// The pane whose own tab leaves the strip while its preview shows.
	liftedId?: string;
}

export interface DragPress {
	paneId: string;
	source: DragSource;
	// `held` waits out the hold. `armed` starts a drag once the pointer moves far enough.
	phase: 'held' | 'armed';
}

export interface DragPoint {
	clientX: number;
	clientY: number;
}

export interface DragOver {
	paneId: string;
	target: DropTarget;
}

export interface PanesContext<TData> {
	readonly idPrefix: string;
	readonly pane: Snippet<[PaneNode<TData>, PaneState]>;
	readonly reorderable: boolean;
	readonly keepInactiveMounted: boolean;
	readonly dragSource: DragSource | undefined;
	readonly dragPress: DragPress | undefined;
	readonly dragPoint: DragPoint | undefined;
	readonly dragOver: DragOver | undefined;
	readonly dragPreview: DragPreview<TData> | undefined;
	readonly movingId: string | undefined;
	readonly movingSource: DragSource | undefined;
	readonly movingLabel: string | undefined;
	// A stacked moving pane stands for its whole stack.
	readonly movingSlotLabel: string | undefined;
	readonly movingPanes: readonly PaneNode<TData>[];
	readonly announcement: string;
	update: (transform: (root: LayoutNode<TData>) => LayoutNode<TData> | undefined) => boolean;
	holdDrag: (paneId: string, source: DragSource) => void;
	armDrag: (paneId: string, source: DragSource) => void;
	disarmDrag: () => void;
	startDrag: (point: DragPoint) => boolean;
	moveDrag: (point: DragPoint) => void;
	// Cancels when the pointer is over no drop target.
	finishDrag: () => void;
	// Leaves `layout` untouched.
	cancelDrag: () => void;
	registerDropSurface: (
		paneId: string,
		element: HTMLElement,
		dropTargetAt: (point: DragPoint) => DropTarget | undefined
	) => () => void;
	dropTargetFor: (
		node: PaneNode<unknown>,
		stack: StackNode<unknown> | undefined,
		region: DropRegion,
		index?: number
	) => DropTarget | undefined;
	startMove: (paneId: string, source: DragSource) => void;
	isMoving: (source: DragSource) => boolean;
	cancelMove: () => void;
	abandonMove: () => void;
	// A pane stacks only over its `TabListDropRegion`, so `stack` is offered only with `hasStackRegion`.
	// The own slot of a moving pane in a stack offers a reorder when `hasTabList`.
	destinationFor: (
		node: PaneNode<unknown>,
		stack: StackNode<unknown> | undefined,
		zones: { hasStackRegion: boolean; hasTabList: boolean }
	) => MoveDestination | undefined;
	// Omitted `index` means the end.
	place: (
		destination: Pick<MoveDestination, 'targetId' | 'label' | 'insertion'>,
		region: DropRegion,
		index?: number
	) => void;
	selectedRegionFor: (paneId: string) => DropRegion | undefined;
	selectRegion: (paneId: string, region: DropRegion) => void;
	selectedIndexFor: (paneId: string) => number | undefined;
	selectIndex: (paneId: string, index: number) => void;
	// Speaks only during a move.
	announce: (message: string) => void;
	// Speaks whether or not a move is in progress.
	notify: (message: string) => void;
	labelFor: (paneId: string) => string;
	registerPane: (paneId: string, pane: RegisteredPane) => () => void;
	registerPanel: (paneId: string) => () => void;
	hasPanel: (paneId: string) => boolean;
	registerDestination: (paneId: string, select: (region: DropRegion) => void) => () => void;
	crossToNeighbor: (paneId: string, direction: EdgeRegion) => boolean;
	focusMovingPane: () => Promise<void>;
	recordMoveTrigger: (paneId: string, target: DragSource['type']) => void;
}

export interface PaneStack {
	panes: PaneNode<unknown>[];
	activeId: string;
}

export interface PaneContext {
	readonly stack: PaneStack | undefined;
	readonly moveInsertion: TabInsertion | undefined;
	readonly isDragArmed: boolean;
	isMoving: (source: DragSource) => boolean;
	sourceFor: (type: DragSource['type']) => DragSource;
	holdDrag: (source: DragSource) => void;
	armDrag: (source: DragSource) => void;
	disarmDrag: () => void;
	startDrag: (point: DragPoint) => boolean;
	moveDrag: (point: DragPoint) => void;
	finishDrag: () => void;
	cancelDrag: () => void;
	toggleMove: (source: DragSource) => void;
	registerMoveTrigger: (trigger: HTMLElement, target: DragSource['type']) => () => void;
	readonly paneId: string;
	readonly hasTabList: boolean;
	registerTabList: (tabList: HTMLElement) => () => void;
	// Its rect is where a drop stacks onto this pane.
	registerDropRegion: (region: HTMLElement) => () => void;
	// Its rect sets this pane's edge and center regions.
	registerBody: (body: HTMLElement) => () => void;
	registerPanel: () => () => void;
	tabId: (paneId: string) => string;
	panelId: (paneId: string) => string;
	select: (paneId: string) => void;
	reorder: (paneId: string, index: number) => void;
}

interface MoveInProgress {
	triggerPaneId: string;
	source: DragSource;
}

interface DropSurface {
	paneId: string;
	element: HTMLElement;
	dropTargetAt: (point: DragPoint) => DropTarget | undefined;
}

const MOVE_TRIGGER_SERVES: Record<DragSource['type'], (target: DragSource['type']) => boolean> = {
	pane: () => true,
	stack: (target) => target === 'stack'
};

const CONTEXT_KEY = Symbol('panes');
const PANE_CONTEXT_KEY = Symbol('pane');

export function providePanes<TData>(
	idPrefix: Readonly<string>,
	layout: {
		get: () => LayoutNode<TData> | undefined;
		set: (next: LayoutNode<TData> | undefined) => void;
	},
	pane: () => Snippet<[PaneNode<TData>, PaneState]>,
	reorderable: () => boolean,
	paneLabel: () => (pane: PaneNode<TData>) => string,
	keepInactiveMounted: () => boolean
): PanesContext<TData> {
	let dragSource = $state<DragSource>();
	let dragPress = $state<DragPress>();
	let dragPoint = $state.raw<DragPoint>();
	let dragOver = $state.raw<DragOver>();
	let dropSurfaces: DropSurface[] = [];
	let moving = $state.raw<MoveInProgress>();
	let announcement = $state('');
	let selectedRegions = $state<Record<string, DropRegion>>({});
	let selectedIndices = $state<Record<string, number>>({});
	let registeredPanes: ({ id: string } & RegisteredPane)[] = [];
	const panelPaneIds = new SvelteSet<string>();
	let registeredDestinations: { id: string; select: (region: DropRegion) => void }[] = [];
	let moveTriggers: { paneId: string; target: DragSource['type'] }[] = [];
	let warnedDrags: { paneId: string; type: DragSource['type'] }[] = [];

	const movingSource = $derived.by(() => {
		if (!reorderable() || moving === undefined) return undefined;

		const { source } = moving;
		const root = layout.get();
		const isPresent = isSourcePresent(root, source);
		return isPresent ? source : undefined;
	});
	const movingId = $derived(movingSource?.id);
	const movingLabel = $derived(movingSource && sourceLabel(movingSource));
	const movingSlotLabel = $derived(movingSource && slotLabel(movingSource));
	const movingPanes = $derived(movingSource ? panesOf(movingSource) : []);
	const dragPreview = $derived<DragPreview<TData> | undefined>(
		dragSource && {
			type: dragSource.type,
			form: dragOver?.target.region === 'stack' ? 'tab' : 'pane',
			panes: panesOf(dragSource),
			label: sourceLabel(dragSource)
		}
	);

	function isSourcePresent(root: LayoutNode<TData> | undefined, source: DragSource) {
		switch (source.type) {
			case 'stack':
				return listStacks(root).some((stack) => stack.id === source.id);
			case 'pane':
				return findPane(root, source.id) !== undefined;
			default:
				return source.type satisfies never;
		}
	}

	function update(transform: (root: LayoutNode<TData>) => LayoutNode<TData> | undefined) {
		const before = layout.get();
		if (!before) return false;

		const after = transform(before);
		if (after === before) return true;

		layout.set(after);
		// A deep $state parent stores a proxy of `after`, so only a change from `before` shows acceptance.
		return layout.get() !== before;
	}

	function rearrange(
		root: LayoutNode<TData>,
		source: DragSource,
		{ targetId, region, index }: DropTarget
	) {
		if (region === 'stack' && targetId === source.id) {
			return selectPane(reorderPane(root, source.id, index ?? Infinity), source.id);
		}
		if (region === 'stack') return stackPanes(root, targetId, source.id, createNodeId(), index);
		if (region === 'center') return swapSlots(root, source.id, targetId);

		const { direction, key } = placementFor(region);
		switch (source.type) {
			case 'stack':
				return moveStack(root, source.id, targetId, direction, key, createNodeId());
			case 'pane':
				return movePane(root, source.id, targetId, direction, key, createNodeId());
			default:
				return source.type satisfies never;
		}
	}

	function cancelDrag() {
		dragSource = undefined;
		dragPress = undefined;
		dragPoint = undefined;
		dragOver = undefined;
	}

	function surfaceAt({ clientX, clientY }: DragPoint) {
		const isSurface = (element: Element) =>
			dropSurfaces.some((surface) => surface.element === element);
		const hit = document.elementsFromPoint(clientX, clientY).find(isSurface);
		return dropSurfaces.find((surface) => surface.element === hit);
	}

	function moveDrag(point: DragPoint) {
		if (dragSource === undefined) return;

		dragPoint = point;
		const surface = surfaceAt(point);
		const target = surface?.dropTargetAt(point);
		dragOver = surface && target ? { paneId: surface.paneId, target } : undefined;
	}

	function panesOf(source: DragSource): PaneNode<TData>[] {
		const root = layout.get();
		switch (source.type) {
			case 'pane': {
				const pane = findPane(root, source.id);
				return pane ? [pane] : [];
			}
			case 'stack':
				return listStacks(root).find((stack) => stack.id === source.id)?.panes ?? [];
			default:
				return source.type satisfies never;
		}
	}

	function labelFor(paneId: string) {
		const pane = findPane(layout.get(), paneId);
		return pane ? paneLabel()(pane) : paneId;
	}

	function sourceLabel(source: DragSource) {
		switch (source.type) {
			case 'pane':
				return labelFor(source.id);
			case 'stack': {
				const stack = listStacks(layout.get()).find((candidate) => candidate.id === source.id);
				return stack ? joinLabels(stack.panes.map((pane) => labelFor(pane.id))) : source.id;
			}
			default:
				return source.type satisfies never;
		}
	}

	function slotLabel(source: DragSource) {
		switch (source.type) {
			case 'stack':
				return sourceLabel(source);
			case 'pane': {
				const stack = listStacks(layout.get()).find((candidate) =>
					candidate.panes.some((pane) => pane.id === source.id)
				);
				return sourceLabel(stack ? { type: 'stack', id: stack.id } : source);
			}
			default:
				return source.type satisfies never;
		}
	}

	function destinationOfSlot(
		node: PaneNode<unknown>,
		stack: StackNode<unknown> | undefined,
		hasStackRegion: boolean
	): MoveDestination {
		const label = labelFor(node.id);
		if (!hasStackRegion) {
			const regions = ALL_REGIONS.filter((region) => region !== 'stack');
			return { targetId: node.id, label, regions };
		}
		if (stack === undefined) return { targetId: node.id, label, regions: ALL_REGIONS };

		const insertion = {
			lastIndex: stack.panes.length,
			total: stack.panes.length + movingPanes.length,
			defaultIndex: stack.panes.length,
			isReorder: false
		};
		return { targetId: node.id, label, regions: ALL_REGIONS, insertion };
	}

	function ownSlotOf(
		stack: StackNode<unknown>,
		source: DragSource,
		hasTabList: boolean
	): MoveDestination {
		const stackMates = stack.panes.filter((pane) => pane.id !== source.id);
		const destination = {
			targetId: stackMates[0].id,
			label: joinLabels(stackMates.map((pane) => labelFor(pane.id)))
		};
		if (!hasTabList) return { ...destination, regions: EDGE_REGIONS };

		// The moving pane keeps its place until the user picks another, so the first arrow moves it one step.
		const insertion = {
			lastIndex: stack.panes.length - 1,
			total: stack.panes.length,
			defaultIndex: stack.panes.findIndex((pane) => pane.id === source.id),
			isReorder: true
		};
		return { ...destination, regions: OWN_SLOT_REGIONS, insertion };
	}

	function selectedRegionFor(paneId: string): DropRegion | undefined {
		return selectedRegions[paneId];
	}

	function finishMove(message: string) {
		moving = undefined;
		announcement = message;
	}

	function endMove(paneId: string, message: string) {
		finishMove(message);
		// A placement can remount the pane, so focus waits for the new trigger to register.
		void tick().then(() =>
			registeredPanes.findLast((registered) => registered.id === paneId)?.focus()
		);
	}

	function shownIdOf(slot: Slot<TData>) {
		switch (slot.type) {
			case 'stack':
				return shownPaneId(slot);
			case 'pane':
				return slot.id;
			default:
				return slot satisfies never;
		}
	}

	function paneBounds() {
		const shownIds = listSlots(layout.get()).flatMap((slot) => {
			const shownId = shownIdOf(slot);
			return shownId === undefined ? [] : [shownId];
		});
		return shownIds.flatMap((id) => {
			const paneRect = registeredPanes.findLast((registered) => registered.id === id)?.bounds();
			return paneRect ? [[id, paneRect] as const] : [];
		});
	}

	function cancelMove() {
		if (moving !== undefined && movingSource !== undefined) {
			endMove(moving.triggerPaneId, CANCELED_MESSAGE);
		}
	}

	function abandonMove() {
		if (moving !== undefined) finishMove(CANCELED_MESSAGE);
	}

	function warnWithoutMoveTrigger(paneId: string, type: DragSource['type']) {
		const hasMoveTrigger = moveTriggers.some(
			(trigger) => trigger.paneId === paneId && MOVE_TRIGGER_SERVES[type](trigger.target)
		);
		const hasWarned = warnedDrags.some(
			(warned) => warned.paneId === paneId && warned.type === type
		);
		if (!DEV || hasMoveTrigger || hasWarned) return;

		warnedDrags = [...warnedDrags, { paneId, type }];
		console.warn(MISSING_MOVE_TRIGGER_WARNING[type](labelFor(paneId)));
	}

	return setContext(CONTEXT_KEY, {
		idPrefix,
		get pane() {
			return pane();
		},
		get reorderable() {
			return reorderable();
		},
		get keepInactiveMounted() {
			return keepInactiveMounted();
		},
		get dragSource() {
			return dragSource;
		},
		get dragPress() {
			return dragPress;
		},
		get dragPoint() {
			return dragPoint;
		},
		get dragOver() {
			return dragOver;
		},
		get dragPreview() {
			return dragPreview;
		},
		get movingId() {
			return movingId;
		},
		get movingSource() {
			return movingSource;
		},
		get movingLabel() {
			return movingLabel;
		},
		get movingSlotLabel() {
			return movingSlotLabel;
		},
		get movingPanes() {
			return movingPanes;
		},
		get announcement() {
			return announcement;
		},
		update,
		cancelDrag,
		moveDrag,
		cancelMove,
		abandonMove,
		labelFor,
		selectedRegionFor,
		holdDrag(paneId, source) {
			if (reorderable()) dragPress = { paneId, source, phase: 'held' };
		},
		armDrag(paneId, source) {
			if (reorderable()) dragPress = { paneId, source, phase: 'armed' };
		},
		disarmDrag() {
			dragPress = undefined;
		},
		startDrag(point) {
			if (!reorderable() || dragPress?.phase !== 'armed') return false;

			if (movingSource !== undefined) {
				moving = undefined;
				announcement = CANCELED_MESSAGE;
			}
			dragSource = dragPress.source;
			warnWithoutMoveTrigger(dragPress.paneId, dragSource.type);
			moveDrag(point);
			return true;
		},
		finishDrag() {
			const source = dragSource;
			const target = dragOver?.target;
			cancelDrag();
			if (source !== undefined && target !== undefined && reorderable()) {
				update((root) => rearrange(root, source, target));
			}
		},
		registerDropSurface(paneId, element, dropTargetAt) {
			const surface = { paneId, element, dropTargetAt };
			dropSurfaces = [...dropSurfaces, surface];
			return () => {
				dropSurfaces = dropSurfaces.filter((other) => other !== surface);
			};
		},
		dropTargetFor(node, stack, region, index) {
			return dragSource && resolveDropTarget(dragSource, node, stack, region, index);
		},
		startMove(paneId, source) {
			if (!reorderable() || !hasDestination(layout.get(), source)) return;

			moving = { triggerPaneId: paneId, source };
			selectedRegions = {};
			selectedIndices = {};
			announcement = startedMessage(sourceLabel(source));
			registeredPanes.findLast((registered) => registered.id === paneId)?.focusWrapper();
		},
		isMoving(source) {
			return movingSource?.type === source.type && movingSource.id === source.id;
		},
		destinationFor(node, stack, { hasStackRegion, hasTabList }) {
			const source = movingSource;
			const isShown = stack === undefined || stack.activeId === node.id;
			if (source === undefined || !isShown) return undefined;

			switch (source.type) {
				case 'stack':
					return stack?.id === source.id
						? undefined
						: destinationOfSlot(node, stack, hasStackRegion);
				case 'pane':
					if (stack?.panes.some((pane) => pane.id === source.id)) {
						return ownSlotOf(stack, source, hasTabList);
					}
					return node.id === source.id ? undefined : destinationOfSlot(node, stack, hasStackRegion);
				default:
					return source.type satisfies never;
			}
		},
		selectRegion(paneId, region) {
			if (movingSource !== undefined) selectedRegions[paneId] = region;
		},
		selectedIndexFor: (paneId) => selectedIndices[paneId],
		selectIndex(paneId, index) {
			if (movingSource !== undefined) selectedIndices[paneId] = index;
		},
		announce(message) {
			if (movingSource !== undefined) announcement = message;
		},
		notify(message) {
			announcement = message;
		},
		place({ targetId, label, insertion }, region, index) {
			if (moving === undefined || movingSource === undefined) return;

			const { triggerPaneId, source } = moving;
			const insertAt =
				region === 'stack' && insertion
					? Math.min(index ?? insertion.defaultIndex, insertion.lastIndex)
					: undefined;
			const isReorder = insertAt !== undefined && insertion?.isReorder === true;
			const movingName = region === 'center' ? slotLabel(source) : sourceLabel(source);
			const target = { targetId: isReorder ? source.id : targetId, region, index: insertAt };
			const accepted = update((root) => rearrange(root, source, target));
			const placed = isReorder
				? reorderedMessage(movingName, { position: insertAt + 1, total: insertion.total })
				: placedMessage(region, movingName, label);
			endMove(triggerPaneId, accepted ? placed : rejectedMessage(movingName));
		},
		registerPane(paneId, pane) {
			const registered = { id: paneId, ...pane };
			registeredPanes = [...registeredPanes, registered];
			return () => {
				registeredPanes = registeredPanes.filter((other) => other !== registered);
			};
		},
		registerPanel(paneId) {
			panelPaneIds.add(paneId);
			return () => panelPaneIds.delete(paneId);
		},
		hasPanel: (paneId) => panelPaneIds.has(paneId),
		registerDestination(paneId, select) {
			const registered = { id: paneId, select };
			registeredDestinations = [...registeredDestinations, registered];
			return () => {
				registeredDestinations = registeredDestinations.filter((other) => other !== registered);
			};
		},
		async focusMovingPane() {
			// A pane that remounts registers in onMount, after the flush that removed the focused element.
			await tick();
			const registered = registeredPanes.findLast((other) => other.id === moving?.triggerPaneId);
			if (registered) {
				registered.focus();
			} else {
				abandonMove();
			}
		},
		crossToNeighbor(paneId, direction) {
			const neighborId = findNeighbor(
				paneBounds(),
				paneId,
				direction,
				paneIdToSkip(layout.get(), movingSource)
			);
			const destination = registeredDestinations.findLast((other) => other.id === neighborId);
			destination?.select(OPPOSITE_EDGE[direction]);
			return destination !== undefined;
		},
		recordMoveTrigger(paneId, target) {
			if (!moveTriggers.some((trigger) => trigger.paneId === paneId && trigger.target === target)) {
				moveTriggers = [...moveTriggers, { paneId, target }];
			}
		}
	});
}

export function usePanes(): PanesContext<unknown> {
	return getContext<PanesContext<unknown>>(CONTEXT_KEY);
}

export function providePane(context: PaneContext): PaneContext {
	return setContext(PANE_CONTEXT_KEY, context);
}

export function usePane(): PaneContext {
	return getContext<PaneContext>(PANE_CONTEXT_KEY);
}
