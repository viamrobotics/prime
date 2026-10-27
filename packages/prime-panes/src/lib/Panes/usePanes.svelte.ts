import { DEV } from 'esm-env';
import { getContext, setContext, tick } from 'svelte';

import type { Snippet } from 'svelte';
import { SvelteSet } from 'svelte/reactivity';
import type { Slot } from '../node-kind.ts';
import { placementFor } from '../drop-region.ts';
import type { DropRegion, EdgeRegion } from '../drop-region.ts';
import { DEFAULT_FLOAT_MIN_SIZE } from '../FloatPanes/float-geometry.ts';
import type { FloatSize } from '../FloatPanes/float-geometry.ts';
import type { FloatEntry, FloatRect, LayoutNode, PaneNode, StackNode } from '../layout.ts';
import {
	floatPane,
	floatStack,
	movePane,
	moveStack,
	reorderPane,
	selectPane,
	setFloatRect,
	stackPanes,
	swapSlots
} from '../tree.ts';

import { ALL_REGIONS, EDGE_REGIONS, OPPOSITE_EDGE, OWN_SLOT_REGIONS } from './arrow-regions.ts';
import { hasDestination, isInWindow, paneIdToSkip, resolveDropTarget } from './drop-target.ts';
import { findPane, listSlots, listStacks } from './list-panes.ts';
import {
	CANCELED_MESSAGE,
	dockedMessage,
	floatedMessage,
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
	rootBounds: () => PaneBounds | undefined;
	// The innermost float entry holding the pane, or `undefined` in the base.
	layer: string | undefined;
	element: () => HTMLElement | undefined;
	// The region a move-mode visit to the pane selects first, or `undefined` when it is no destination.
	firstMoveRegion: () => DropRegion | undefined;
}

export interface RegisteredFloatWindow {
	// `drawnRect` reads the rect the window is drawn at.
	drawnRect: () => FloatRect;
	content: () => LayoutNode<unknown>;
}

// A `float` source names a float entry, and the others name a pane or a stack.
export type DragSource =
	| { type: 'pane'; id: string }
	| { type: 'stack'; id: string }
	| { type: 'float'; id: string };

type FloatSource = Extract<DragSource, { type: 'float' }>;

export type DockSource = Exclude<DragSource, FloatSource>;

// `reposition` moves a window, `dock` drops a pane or stack onto a drop target, and `float` makes a window of a pane or stack.
type DragMode = 'reposition' | 'dock' | 'float';

export interface FloatDragPreview {
	entryId: string;
	rect: FloatRect;
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
	readonly empty: Snippet | undefined;
	readonly floatMinSize: (entry: FloatEntry<TData>) => FloatSize;
	readonly reorderable: boolean;
	readonly keepInactiveMounted: boolean;
	// What the drag acts on now. Docking and floating act on a pane or a stack, even when the press named a window.
	readonly dragSource: DragSource | undefined;
	readonly dragPress: DragPress | undefined;
	readonly dragPoint: DragPoint | undefined;
	readonly dragOver: DragOver | undefined;
	readonly dragPreview: DragPreview<TData> | undefined;
	// The window of `entryId` is drawn at `rect`, before clamping, while a float drag runs.
	readonly floatDragPreview: FloatDragPreview | undefined;
	readonly movingId: string | undefined;
	readonly movingSource: DockSource | undefined;
	readonly movingLabel: string | undefined;
	// A stacked moving pane stands for its whole stack.
	readonly movingSlotLabel: string | undefined;
	readonly movingPanes: readonly PaneNode<TData>[];
	readonly announcement: string;
	update: (transform: (root: LayoutNode<TData>) => LayoutNode<TData> | undefined) => boolean;
	holdDrag: (paneId: string, source: DragSource) => void;
	armDrag: (paneId: string, source: DragSource) => void;
	disarmDrag: () => void;
	// `origin` is where the press began.
	startDrag: (point: DragPoint, origin: DragPoint) => boolean;
	moveDrag: (point: DragPoint) => void;
	// A dock drag cancels when the pointer is over no drop target. A reposition writes the window's rect, and a float drag adds a window.
	finishDrag: () => void;
	// Leaves `layout` untouched.
	cancelDrag: () => void;
	// Shift inverts a drag between moving a window and docking, and between docking and floating. It takes effect live.
	setDragShift: (isHeld: boolean) => void;
	registerFloat: (entryId: string, floatWindow: RegisteredFloatWindow) => () => void;
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
	// A `float` source moves the window's content, or the pane holding the trigger when the window holds a split.
	startMove: (paneId: string, source: DragSource) => void;
	// `triggerPaneId` is the pane holding the trigger, which stands for a `float` source's window.
	isMoving: (source: DragSource, triggerPaneId?: string) => boolean;
	// Whether the moving pane or stack can float, which it cannot once it is in a window.
	readonly isFloatOffered: boolean;
	// Floats the moving pane or stack where it is drawn, offset by one step.
	floatMoving: () => void;
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
	// Moves to the first destination of the next layer, the base and then each window in DOM order, wrapping. `step` -1 goes back.
	crossToLayer: (paneId: string, step: LayerStep) => boolean;
	focusMovingPane: () => Promise<void>;
	recordMoveTrigger: (paneId: string, target: DragSource['type']) => void;
}

export type LayerStep = 1 | -1;

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
	startDrag: (point: DragPoint, origin: DragPoint) => boolean;
	moveDrag: (point: DragPoint) => void;
	finishDrag: () => void;
	cancelDrag: () => void;
	setDragShift: (isHeld: boolean) => void;
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
	source: DockSource;
}

interface FloatDragStart {
	entryId: string;
	rect: FloatRect;
}

interface RegisteredFloat extends RegisteredFloatWindow {
	id: string;
}

type Release =
	| { mode: 'reposition'; entryId: string; rect: FloatRect }
	| { mode: 'dock'; source: DockSource; target: DropTarget }
	| { mode: 'float'; source: DockSource; rect: FloatRect };

interface DropSurface {
	paneId: string;
	element: HTMLElement;
	dropTargetAt: (point: DragPoint) => DropTarget | undefined;
}

const MOVE_TRIGGER_SERVES: Record<DragSource['type'], (target: DragSource['type']) => boolean> = {
	pane: () => true,
	stack: (target) => target === 'stack',
	float: (target) => target === 'float'
};

const FLOAT_OFFSET_PX = 10;

/** Shift inverts a press's default. A float source moves its window and docks with Shift. A pane or stack docks and floats with Shift. */
function dragModeOf(source: DragSource, isShiftHeld: boolean): DragMode {
	if (source.type === 'float') return isShiftHeld ? 'dock' : 'reposition';
	return isShiftHeld ? 'float' : 'dock';
}

// A window of a split or a float has no single pane to dock, so the pane holding the trigger stands for it.
function dockSourceOf(
	content: LayoutNode<unknown>,
	triggerPaneId: string | undefined
): DockSource | undefined {
	switch (content.type) {
		case 'pane':
		case 'stack':
			return { type: content.type, id: content.id };
		case 'split':
		case 'float':
			return triggerPaneId === undefined ? undefined : { type: 'pane', id: triggerPaneId };
		default:
			return content satisfies never;
	}
}

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
	keepInactiveMounted: () => boolean,
	empty: () => Snippet | undefined,
	floatMinSize: () => (entry: FloatEntry<TData>) => FloatSize
): PanesContext<TData> {
	let grabbedSource = $state<DragSource>();
	let isShiftHeld = $state(false);
	let dragPress = $state<DragPress>();
	let dragPoint = $state.raw<DragPoint>();
	let dragOver = $state.raw<DragOver>();
	let floatDragPreview = $state.raw<FloatDragPreview>();
	let floatDragStart: FloatDragStart | undefined;
	let dragOrigin: DragPoint | undefined;
	let pointerAt: DragPoint | undefined;
	let registeredFloats: RegisteredFloat[] = [];
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
	const dragMode = $derived(grabbedSource && dragModeOf(grabbedSource, isShiftHeld));
	const carriedSource = $derived(grabbedSource && dockSourceFor(grabbedSource, dragPress?.paneId));
	const isFloatOffered = $derived(
		movingSource !== undefined && !isInWindow(layout.get(), movingSource.id)
	);
	const dragSource = $derived(dragMode === 'reposition' ? grabbedSource : carriedSource);
	const dragPreview = $derived.by<DragPreview<TData> | undefined>(() => {
		const source = dragMode === 'reposition' ? undefined : carriedSource;
		if (source === undefined) return undefined;

		return {
			type: source.type,
			form: dragOver?.target.region === 'stack' ? 'tab' : 'pane',
			panes: panesOf(source),
			label: sourceLabel(source)
		};
	});

	function dockSourceFor(source: DragSource, triggerPaneId: string | undefined) {
		if (source.type !== 'float') return source;

		const content = registeredFloats.findLast((float) => float.id === source.id)?.content();
		return content && dockSourceOf(content, triggerPaneId);
	}

	function isSourcePresent(root: LayoutNode<TData> | undefined, source: DockSource) {
		switch (source.type) {
			case 'stack':
				return listStacks(root).some((stack) => stack.id === source.id);
			case 'pane':
				return findPane(root, source.id) !== undefined;
			default:
				return source satisfies never;
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
			case 'float':
				return root;
			default:
				return source satisfies never;
		}
	}

	function cancelDrag() {
		grabbedSource = undefined;
		isShiftHeld = false;
		dragPress = undefined;
		dragPoint = undefined;
		dragOver = undefined;
		floatDragPreview = undefined;
		floatDragStart = undefined;
		dragOrigin = undefined;
		pointerAt = undefined;
	}

	function drawnRectOf(entryId: string) {
		return registeredFloats.findLast((float) => float.id === entryId)?.drawnRect();
	}

	function startRepositioning({ id }: FloatSource) {
		const rect = drawnRectOf(id);
		if (rect === undefined) return false;

		floatDragStart = { entryId: id, rect };
		return true;
	}

	function repositionTo({ clientX, clientY }: DragPoint) {
		if (floatDragStart === undefined || dragOrigin === undefined) return;

		const { entryId, rect } = floatDragStart;
		// A rect is whole pixels, as a resize makes it, and pointer coordinates carry sub-pixel noise.
		floatDragPreview = {
			entryId,
			rect: {
				...rect,
				x: Math.round(rect.x + clientX - dragOrigin.clientX),
				y: Math.round(rect.y + clientY - dragOrigin.clientY)
			}
		};
	}

	function surfaceAt({ clientX, clientY }: DragPoint) {
		const isSurface = (element: Element) =>
			dropSurfaces.some((surface) => surface.element === element);
		const hit = document.elementsFromPoint(clientX, clientY).find(isSurface);
		return dropSurfaces.find((surface) => surface.element === hit);
	}

	function dockOver(point: DragPoint) {
		const surface = surfaceAt(point);
		const target = surface?.dropTargetAt(point);
		return surface && target ? { paneId: surface.paneId, target } : undefined;
	}

	// Each mode clears what the others leave behind, so a live switch starts from a clean state.
	function followPointer(point: DragPoint) {
		pointerAt = point;
		switch (dragMode) {
			case 'reposition':
				dragPoint = undefined;
				dragOver = undefined;
				repositionTo(point);
				return;
			case 'dock':
				floatDragPreview = undefined;
				dragPoint = point;
				dragOver = dockOver(point);
				return;
			case 'float':
				floatDragPreview = undefined;
				dragPoint = point;
				dragOver = undefined;
				return;
			case undefined:
				return;
			default:
				return dragMode satisfies never;
		}
	}

	function moveDrag(point: DragPoint) {
		if (grabbedSource !== undefined) followPointer(point);
	}

	function setDragShift(isHeld: boolean) {
		if (isShiftHeld === isHeld) return;

		isShiftHeld = isHeld;
		if (pointerAt !== undefined) followPointer(pointerAt);
	}

	function shownPaneIdOfSlot(source: DockSource) {
		const stack = listStacks(layout.get()).find((candidate) =>
			source.type === 'stack'
				? candidate.id === source.id
				: candidate.panes.some((pane) => pane.id === source.id)
		);
		return stack ? shownPaneId(stack) : source.id;
	}

	// The slot's rendered rect in the root's box.
	function slotBoxOf(source: DockSource): FloatRect | undefined {
		const shownId = shownPaneIdOfSlot(source);
		const registered = registeredPanes.findLast((other) => other.id === shownId);
		const slot = registered?.bounds();
		const root = registered?.rootBounds();
		if (!slot || !root) return undefined;

		return {
			x: slot.left - root.left,
			y: slot.top - root.top,
			width: slot.right - slot.left,
			height: slot.bottom - slot.top
		};
	}

	// The slot's rendered rect, moved by how far the pointer travelled since the press.
	function floatRectOf(source: DockSource): FloatRect | undefined {
		const box = slotBoxOf(source);
		if (!box || !dragOrigin || !pointerAt) return undefined;

		return {
			x: Math.round(box.x + pointerAt.clientX - dragOrigin.clientX),
			y: Math.round(box.y + pointerAt.clientY - dragOrigin.clientY),
			width: Math.round(box.width),
			height: Math.round(box.height)
		};
	}

	// The window has no entry to ask for a minimum yet, so the package default applies.
	function floatInPlaceRectOf(source: DockSource): FloatRect | undefined {
		const box = slotBoxOf(source);
		if (!box) return undefined;

		return {
			x: Math.round(box.x) + FLOAT_OFFSET_PX,
			y: Math.round(box.y) + FLOAT_OFFSET_PX,
			width: Math.max(Math.round(box.width), DEFAULT_FLOAT_MIN_SIZE.width),
			height: Math.max(Math.round(box.height), DEFAULT_FLOAT_MIN_SIZE.height)
		};
	}

	function readRelease(): Release | undefined {
		const source = grabbedSource;
		if (source === undefined) return undefined;

		switch (dragMode) {
			case 'reposition': {
				const rect = drawnRectOf(source.id);
				return rect && { mode: 'reposition', entryId: source.id, rect };
			}
			case 'dock': {
				const target = dragOver?.target;
				return carriedSource && target && { mode: 'dock', source: carriedSource, target };
			}
			case 'float': {
				const rect = carriedSource && floatRectOf(carriedSource);
				return carriedSource && rect && { mode: 'float', source: carriedSource, rect };
			}
			case undefined:
				return undefined;
			default:
				return dragMode satisfies never;
		}
	}

	function floatCarried(root: LayoutNode<TData>, source: DockSource, rect: FloatRect) {
		switch (source.type) {
			case 'pane':
				return floatPane(root, source.id, rect, createNodeId(), createNodeId());
			case 'stack':
				return floatStack(root, source.id, rect, createNodeId(), createNodeId());
			default:
				return source satisfies never;
		}
	}

	function applyRelease(release: Release) {
		switch (release.mode) {
			case 'reposition':
				update((root) => setFloatRect(root, release.entryId, release.rect));
				return;
			case 'dock':
				update((root) => rearrange(root, release.source, release.target));
				return;
			case 'float':
				update((root) => floatCarried(root, release.source, release.rect));
				return;
			default:
				return release satisfies never;
		}
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
			case 'float':
				return [];
			default:
				return source satisfies never;
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
			case 'float':
				return source.id;
			default:
				return source satisfies never;
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
			case 'float':
				return sourceLabel(source);
			default:
				return source satisfies never;
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

	function shownPanes() {
		return listSlots(layout.get()).flatMap((slot) => {
			const shownId = shownIdOf(slot);
			const registered = registeredPanes.findLast((other) => other.id === shownId);
			return registered ? [registered] : [];
		});
	}

	function paneBounds() {
		return shownPanes().flatMap((registered) => {
			const paneRect = registered.bounds();
			if (!paneRect) return [];
			const { left, right, top, bottom } = paneRect;
			return [[registered.id, { left, right, top, bottom, layer: registered.layer }] as const];
		});
	}

	function precedesInDocument(first: HTMLElement | undefined, second: HTMLElement | undefined) {
		if (!first || !second) return false;
		return (first.compareDocumentPosition(second) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
	}

	function layersInOrder(panes: RegisteredPane[]) {
		const windowPanes = panes
			.filter((registered) => registered.layer !== undefined)
			.sort((first, second) => (precedesInDocument(first.element(), second.element()) ? -1 : 1));
		const layers = windowPanes.map((registered) => registered.layer);
		return [undefined, ...layers.filter((layer, index) => layers.indexOf(layer) === index)];
	}

	function firstDestinationIn(
		panes: ({ id: string } & RegisteredPane)[],
		layer: string | undefined
	) {
		for (const registered of panes) {
			if (registered.layer !== layer) continue;
			const region = registered.firstMoveRegion();
			const destination = registeredDestinations.findLast((other) => other.id === registered.id);
			if (region !== undefined && destination !== undefined) return { destination, region };
		}
		return undefined;
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
		get empty() {
			return empty();
		},
		get floatMinSize() {
			return floatMinSize();
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
		get floatDragPreview() {
			return floatDragPreview;
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
		startDrag(point, origin) {
			if (!reorderable() || dragPress?.phase !== 'armed') return false;

			const { paneId, source } = dragPress;
			if (source.type === 'float' && !startRepositioning(source)) return false;

			if (movingSource !== undefined) {
				moving = undefined;
				announcement = CANCELED_MESSAGE;
			}
			grabbedSource = source;
			dragOrigin = origin;
			warnWithoutMoveTrigger(paneId, source.type);
			moveDrag(point);
			return true;
		},
		finishDrag() {
			const release = readRelease();
			cancelDrag();
			if (reorderable() && release) applyRelease(release);
		},
		setDragShift,
		registerFloat(entryId, floatWindow) {
			const registered = { id: entryId, ...floatWindow };
			registeredFloats = [...registeredFloats, registered];
			return () => {
				registeredFloats = registeredFloats.filter((other) => other !== registered);
			};
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
			const moveSource = dockSourceFor(source, paneId);
			if (!reorderable() || !moveSource || !hasDestination(layout.get(), moveSource)) return;

			moving = { triggerPaneId: paneId, source: moveSource };
			selectedRegions = {};
			selectedIndices = {};
			announcement = startedMessage(sourceLabel(moveSource));
			registeredPanes.findLast((registered) => registered.id === paneId)?.focusWrapper();
		},
		isMoving(source, triggerPaneId) {
			const moveSource = dockSourceFor(source, triggerPaneId);
			return (
				movingSource !== undefined &&
				moveSource !== undefined &&
				movingSource.type === moveSource.type &&
				movingSource.id === moveSource.id
			);
		},
		get isFloatOffered() {
			return isFloatOffered;
		},
		floatMoving() {
			if (moving === undefined || movingSource === undefined) return;

			const { triggerPaneId, source } = moving;
			const label = sourceLabel(source);
			const rect = floatInPlaceRectOf(source);
			const accepted = rect !== undefined && update((root) => floatCarried(root, source, rect));
			endMove(triggerPaneId, accepted ? floatedMessage(label) : rejectedMessage(label));
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
					return source satisfies never;
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
			const wasInWindow = isInWindow(layout.get(), source.id);
			const accepted = update((root) => rearrange(root, source, target));
			const isDocked = accepted && wasInWindow && !isInWindow(layout.get(), source.id);
			const landedMessage = isDocked ? dockedMessage : placedMessage;
			const placed = isReorder
				? reorderedMessage(movingName, { position: insertAt + 1, total: insertion.total })
				: landedMessage(region, movingName, label);
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
		crossToLayer(paneId, step) {
			const panes = shownPanes();
			const current = panes.find((registered) => registered.id === paneId);
			if (movingSource === undefined || current === undefined) return false;

			const layers = layersInOrder(panes);
			const currentIndex = layers.indexOf(current.layer);
			for (let offset = 1; offset < layers.length; offset++) {
				const index = (currentIndex + step * offset + layers.length) % layers.length;
				const found = firstDestinationIn(panes, layers[index]);
				if (found === undefined) continue;
				found.destination.select(found.region);
				return true;
			}
			return false;
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
