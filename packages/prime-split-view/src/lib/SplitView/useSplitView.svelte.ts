import { DEV } from 'esm-env';
import { getContext, setContext, tick } from 'svelte';

import type { Snippet } from 'svelte';
import { placementFor } from '../drop-region.ts';
import type { DropRegion } from '../drop-region.ts';
import type { LayoutNode, PaneNode } from '../layout.ts';
import { movePane, swapPanes } from '../tree.ts';

import { findPane, listPanes } from './list-panes.ts';
import {
	CANCELED_MESSAGE,
	placedMessage,
	rejectedMessage,
	startedMessage
} from './move-wording.ts';
import type { PaneControls } from './pane-controls.ts';
import { createSplitId } from './split-id.ts';

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
	place: (targetId: string, region: DropRegion) => void;
	labelFor: (paneId: string) => string;
	registerPane: (paneId: string, focus: () => void) => () => void;
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
	let registeredPanes: { id: string; focus: () => void }[] = [];
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

	function endMove(paneId: string, message: string) {
		movingPaneId = undefined;
		announcement = message;
		// A placement can remount the pane, so focus waits for the new trigger to register.
		void tick().then(() =>
			registeredPanes.findLast((registered) => registered.id === paneId)?.focus()
		);
	}

	function cancelMove() {
		if (movingId !== undefined) endMove(movingId, CANCELED_MESSAGE);
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
		labelFor,
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
			announcement = startedMessage(labelFor(paneId));
		},
		place(targetId, region) {
			const paneId = movingId;
			if (paneId === undefined) return;

			const moving = labelFor(paneId);
			const target = labelFor(targetId);
			const accepted = update((root) => rearrange(root, paneId, targetId, region));
			endMove(paneId, accepted ? placedMessage(region, moving, target) : rejectedMessage(moving));
		},
		registerPane(paneId, focus) {
			const registered = { id: paneId, focus };
			registeredPanes = [...registeredPanes, registered];
			return () => {
				registeredPanes = registeredPanes.filter((other) => other !== registered);
			};
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
