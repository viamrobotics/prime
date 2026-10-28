import { on } from 'svelte/events';

import { classifyPress, HOLD_TO_DRAG_MS } from './classify-press.ts';
import { isInSameRoot } from './root-scope.ts';
import type { DragPoint, DragSource, PaneContext } from './usePanes.svelte.ts';

export const DRAG_START_THRESHOLD_PX = 4;

// `canceled` is an Escape that ended the drag while the pointer is still down.
type Stage = 'held' | 'armed' | 'dragging' | 'canceled';

const pointOf = ({ clientX, clientY }: PointerEvent): DragPoint => ({ clientX, clientY });

const veto = (event: Event) => event.preventDefault();

export function watchDragPress(
	trigger: HTMLElement,
	pane: PaneContext,
	sourceAt: (event: PointerEvent) => DragSource
): () => void {
	let holdTimer: ReturnType<typeof setTimeout> | undefined;
	let stopFollowing: (() => void) | undefined;
	let stopSwallowingClick: (() => void) | undefined;
	let stage: Stage | undefined;
	let pointerId = 0;
	let pressTarget: EventTarget | null = null;
	let origin: DragPoint = { clientX: 0, clientY: 0 };
	let shouldSwallowClick = false;

	function swallowNextClick() {
		stopSwallowingClick?.();
		const stopClick = on(
			trigger,
			'click',
			(event) => {
				event.preventDefault();
				event.stopPropagation();
			},
			{ capture: true, once: true }
		);
		// The click follows the release in the same task, so a release with no click must not swallow a later keyboard click.
		const expiry = setTimeout(stopClick);
		stopSwallowingClick = () => {
			clearTimeout(expiry);
			stopClick();
		};
	}

	function endPress() {
		clearTimeout(holdTimer);
		stopFollowing?.();
		stopFollowing = undefined;
		stage = undefined;
		pressTarget = null;
		if (shouldSwallowClick) swallowNextClick();
		shouldSwallowClick = false;
	}

	function abandonPress() {
		shouldSwallowClick = false;
		pane.cancelDrag();
		endPress();
	}

	function armAfterHold(source: DragSource) {
		pane.armDrag(source);
		shouldSwallowClick = pane.isDragArmed;
		stage = 'armed';
	}

	// A touch press captures its target, so a drag that removes it, as a lifted tab does, would lose the rest of the touch.
	function releasePressCapture() {
		if (pressTarget instanceof Element && pressTarget.hasPointerCapture(pointerId)) {
			pressTarget.releasePointerCapture(pointerId);
		}
	}

	function handlePointermove(event: PointerEvent) {
		if (event.pointerId !== pointerId) return;

		const point = pointOf(event);
		if (stage === 'dragging') {
			pane.setDragShift(event.shiftKey);
			pane.moveDrag(point);
			return;
		}
		if (stage !== 'held' && stage !== 'armed') return;

		const distance = Math.hypot(point.clientX - origin.clientX, point.clientY - origin.clientY);
		if (distance < DRAG_START_THRESHOLD_PX) return;

		pane.setDragShift(event.shiftKey);
		// Moving during the hold is a gesture meant for something else, so the press never becomes a drag.
		if (stage === 'held' || !pane.startDrag(point, origin)) {
			abandonPress();
			return;
		}

		stage = 'dragging';
		shouldSwallowClick = true;
		releasePressCapture();
	}

	function handlePointerup(event: PointerEvent) {
		if (event.pointerId !== pointerId) return;

		if (stage === 'dragging') {
			pane.setDragShift(event.shiftKey);
			pane.moveDrag(pointOf(event));
			pane.finishDrag();
		} else {
			pane.disarmDrag();
		}
		endPress();
	}

	function handlePointercancel(event: PointerEvent) {
		if (event.pointerId === pointerId) abandonPress();
	}

	function handleBlur(event: FocusEvent) {
		// Capture on the window also sees the blur of every element inside it.
		if (event.target === window) abandonPress();
	}

	function followShift({ key, shiftKey }: KeyboardEvent) {
		if (key === 'Shift' && stage === 'dragging') pane.setDragShift(shiftKey);
	}

	function handleKeydown(event: KeyboardEvent) {
		followShift(event);
		if (event.key !== 'Escape') return;

		// Consumed here so an enclosing dialog does not close along with the drag.
		event.preventDefault();
		event.stopPropagation();
		clearTimeout(holdTimer);
		pane.cancelDrag();
		stage = 'canceled';
	}

	// Window listeners see the pointer wherever it goes, since the browser delivers a pressed pointer's events to the document.
	// `on` from svelte/events attaches in a microtask, which would miss a move dispatched in the same task.
	function followPress() {
		const controller = new AbortController();
		const options = { capture: true, signal: controller.signal };
		window.addEventListener('pointermove', handlePointermove, options);
		window.addEventListener('pointerup', handlePointerup, options);
		window.addEventListener('pointercancel', handlePointercancel, options);
		window.addEventListener('keydown', handleKeydown, options);
		window.addEventListener('keyup', followShift, options);
		window.addEventListener('blur', handleBlur, options);
		window.addEventListener('selectstart', veto, options);
		trigger.addEventListener('dragstart', veto, options);
		return () => controller.abort();
	}

	const stopListening = on(trigger, 'pointerdown', (event) => {
		if (event.button !== 0 || stage === 'dragging') return;
		if (!isInSameRoot(event.target, trigger)) return;

		const press = classifyPress(event, trigger);
		if (press === 'ignored') return;

		clearTimeout(holdTimer);
		stopFollowing?.();
		stopFollowing = followPress();
		pointerId = event.pointerId;
		pressTarget = event.target;
		origin = pointOf(event);
		shouldSwallowClick = false;
		const source = sourceAt(event);

		if (press === 'held') {
			stage = 'held';
			pane.holdDrag(source);
			holdTimer = setTimeout(() => armAfterHold(source), HOLD_TO_DRAG_MS);
			return;
		}

		stage = 'armed';
		pane.armDrag(source);
		if (press === 'grip') {
			holdTimer = setTimeout(() => (shouldSwallowClick ||= pane.isDragArmed), HOLD_TO_DRAG_MS);
		}
	});

	return () => {
		stopListening();
		stopSwallowingClick?.();
		clearTimeout(holdTimer);
		stopFollowing?.();
		if (stage !== undefined && stage !== 'canceled') pane.cancelDrag();
	};
}
