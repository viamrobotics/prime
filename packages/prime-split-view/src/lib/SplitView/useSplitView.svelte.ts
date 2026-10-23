import { DEV } from 'esm-env';
import { getContext, setContext, tick } from 'svelte';

import type { Snippet } from 'svelte';
import { placementFor } from '../drop-region.ts';
import type { DropRegion, EdgeRegion } from '../drop-region.ts';
import type { LayoutNode, PaneNode } from '../layout.ts';
import { movePane, swapPanes } from '../tree.ts';

import { OPPOSITE_EDGE } from './arrow-regions.ts';
import { findPane, listPanes } from './list-panes.ts';
import {
	CANCELED_MESSAGE,
	placedMessage,
	rejectedMessage,
	startedMessage,
	targetName
} from './move-wording.ts';
import type { PaneControls } from './pane-controls.ts';
import { createSplitId } from './split-id.ts';
import { findNeighbor } from './spatial-neighbor.ts';
import type { PaneBounds } from './spatial-neighbor.ts';

export interface RegisteredPane {
	focus: () => void;
	focusWrapper: () => void;
	bounds: () => PaneBounds | undefined;
}

export interface SplitViewContext<TData> {
	readonly idPrefix: string;
	readonly pane: Snippet<[PaneNode<TData>, PaneControls]>;
	readonly reorderable: boolean;
	readonly draggedId: string | undefined;
	readonly armedId: string | undefined;
	readonly movingId: string | undefined;
	readonly announcement: string;
	update: (transform: (root: LayoutNode<TData>) => LayoutNode<TData> | undefined) => boolean;
	armDrag: (paneId: string) => void;
	disarmDrag: () => void;
	startDrag: (paneId: string) => void;
	drop: (targetId: string, region: DropRegion) => void;
	clearDrag: () => void;
	startMove: (paneId: string) => void;
	cancelMove: () => void;
	abandonMove: () => void;
	place: (targetId: string, region: DropRegion) => void;
	selectedRegionFor: (targetId: string) => DropRegion;
	selectRegion: (targetId: string, region: DropRegion) => void;
	announceSelection: (targetId: string) => void;
	labelFor: (paneId: string) => string;
	registerPane: (paneId: string, pane: RegisteredPane) => () => void;
	registerDestination: (paneId: string, select: (region: DropRegion) => void) => () => void;
	crossToNeighbor: (paneId: string, direction: EdgeRegion) => boolean;
	focusMovingPane: () => Promise<void>;
	recordMoveTrigger: (paneId: string) => void;
}

export interface PaneContext {
	readonly id: string;
}

const CONTEXT_KEY = Symbol('split-view');
const PANE_CONTEXT_KEY = Symbol('split-view-pane');

export function provideSplitView<TData>(
	idPrefix: Readonly<string>,
	layout: {
		get: () => LayoutNode<TData> | undefined;
		set: (next: LayoutNode<TData> | undefined) => void;
	},
	pane: () => Snippet<[PaneNode<TData>, PaneControls]>,
	reorderable: () => boolean,
	paneLabel: () => (pane: PaneNode<TData>) => string
): SplitViewContext<TData> {
	let draggedId = $state<string>();
	let armedId = $state<string>();
	let movingPaneId = $state<string>();
	let announcement = $state('');
	let selectedRegions = $state<Record<string, DropRegion>>({});
	let registeredPanes: ({ id: string } & RegisteredPane)[] = [];
	let registeredDestinations: { id: string; select: (region: DropRegion) => void }[] = [];
	let paneIdsWithMoveTrigger: string[] = [];
	let warnedPaneIds: string[] = [];

	const movingId = $derived(
		reorderable() && movingPaneId !== undefined && findPane(layout.get(), movingPaneId)
			? movingPaneId
			: undefined
	);

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
		paneId: string,
		targetId: string,
		region: DropRegion
	) {
		if (region === 'center') return swapPanes(root, paneId, targetId);
		const { direction, key } = placementFor(region);
		return movePane(root, paneId, targetId, direction, key, createSplitId());
	}

	function clearDrag() {
		draggedId = undefined;
		armedId = undefined;
	}

	function labelFor(paneId: string) {
		const pane = findPane(layout.get(), paneId);
		return pane ? paneLabel()(pane) : paneId;
	}

	function selectedRegionFor(targetId: string) {
		return selectedRegions[targetId] ?? 'center';
	}

	function finishMove(message: string) {
		movingPaneId = undefined;
		announcement = message;
	}

	function endMove(paneId: string, message: string) {
		finishMove(message);
		// A placement can remount the pane, so focus waits for the new trigger to register.
		void tick().then(() =>
			registeredPanes.findLast((registered) => registered.id === paneId)?.focus()
		);
	}

	function paneBounds() {
		return listPanes(layout.get()).flatMap(({ id }) => {
			const paneRect = registeredPanes.findLast((registered) => registered.id === id)?.bounds();
			return paneRect ? [[id, paneRect] as const] : [];
		});
	}

	function cancelMove() {
		if (movingId !== undefined) endMove(movingId, CANCELED_MESSAGE);
	}

	function abandonMove() {
		if (movingPaneId !== undefined) finishMove(CANCELED_MESSAGE);
	}

	function warnWithoutMoveTrigger(paneId: string) {
		if (!DEV || paneIdsWithMoveTrigger.includes(paneId) || warnedPaneIds.includes(paneId)) return;

		warnedPaneIds = [...warnedPaneIds, paneId];
		console.warn(
			`SplitView: pane "${labelFor(paneId)}" was dragged but has no moveTrigger. Dragging alone fails WCAG 2.5.7 (Dragging Movements), so attach moveTrigger to an element that moves the pane without dragging. A moveTrigger that mounts only on demand, such as inside a menu, still triggers this warning until it first mounts.`
		);
	}

	return setContext(CONTEXT_KEY, {
		idPrefix,
		get pane() {
			return pane();
		},
		get reorderable() {
			return reorderable();
		},
		get draggedId() {
			return draggedId;
		},
		get armedId() {
			return armedId;
		},
		get movingId() {
			return movingId;
		},
		get announcement() {
			return announcement;
		},
		update,
		clearDrag,
		cancelMove,
		abandonMove,
		labelFor,
		selectedRegionFor,
		armDrag(paneId) {
			if (reorderable()) armedId = paneId;
		},
		disarmDrag() {
			armedId = undefined;
		},
		startDrag(paneId) {
			if (reorderable()) {
				if (movingId !== undefined) {
					movingPaneId = undefined;
					announcement = CANCELED_MESSAGE;
				}
				draggedId = paneId;
				warnWithoutMoveTrigger(paneId);
			}
		},
		drop(targetId, region) {
			const paneId = draggedId;
			clearDrag();
			if (paneId !== undefined && reorderable()) {
				update((root) => rearrange(root, paneId, targetId, region));
			}
		},
		startMove(paneId) {
			if (!reorderable() || listPanes(layout.get()).length < 2) return;

			movingPaneId = paneId;
			selectedRegions = {};
			announcement = startedMessage(labelFor(paneId));
			registeredPanes.findLast((registered) => registered.id === paneId)?.focusWrapper();
		},
		selectRegion(targetId, region) {
			if (movingId !== undefined) selectedRegions[targetId] = region;
		},
		announceSelection(targetId) {
			if (movingId === undefined) return;

			announcement = targetName(
				selectedRegionFor(targetId),
				labelFor(movingId),
				labelFor(targetId)
			);
		},
		place(targetId, region) {
			const paneId = movingId;
			if (paneId === undefined) return;

			const moving = labelFor(paneId);
			const target = labelFor(targetId);
			const accepted = update((root) => rearrange(root, paneId, targetId, region));
			endMove(paneId, accepted ? placedMessage(region, moving, target) : rejectedMessage(moving));
		},
		registerPane(paneId, pane) {
			const registered = { id: paneId, ...pane };
			registeredPanes = [...registeredPanes, registered];
			return () => {
				registeredPanes = registeredPanes.filter((other) => other !== registered);
			};
		},
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
			const registered = registeredPanes.findLast((other) => other.id === movingPaneId);
			if (registered) {
				registered.focus();
			} else {
				abandonMove();
			}
		},
		crossToNeighbor(paneId, direction) {
			const neighborId = findNeighbor(paneBounds(), paneId, direction, movingId);
			const destination = registeredDestinations.findLast((other) => other.id === neighborId);
			destination?.select(OPPOSITE_EDGE[direction]);
			return destination !== undefined;
		},
		recordMoveTrigger(paneId) {
			if (!paneIdsWithMoveTrigger.includes(paneId)) {
				paneIdsWithMoveTrigger = [...paneIdsWithMoveTrigger, paneId];
			}
		}
	});
}

export function useSplitView(): SplitViewContext<unknown> {
	return getContext<SplitViewContext<unknown>>(CONTEXT_KEY);
}

export function providePane(context: PaneContext): PaneContext {
	return setContext(PANE_CONTEXT_KEY, context);
}

export function usePane(): PaneContext {
	return getContext<PaneContext>(PANE_CONTEXT_KEY);
}
