import { tick } from 'svelte';

import type { DragPoint, TabsDragContext } from './useTabsDrag.svelte.ts';

import { labelOf } from './useTabsReorder.svelte.ts';

const DRAG_START_THRESHOLD_PX = 4;
const HOLD_TO_DRAG_MS = 250;
const EDGE_SCROLL_ZONE_PX = 24;
const EDGE_SCROLL_STEP_PX = 6;

const NESTED_CONTROLS = 'button, a, input, select, textarea, [contenteditable], [role="button"]';

// `canceled` is an Escape that ended the drag while the pointer is still down.
type Stage = 'held' | 'armed' | 'dragging' | 'canceled';

const pointOf = ({ clientX, clientY }: PointerEvent): DragPoint => ({ x: clientX, y: clientY });

const veto = (event: Event) => event.preventDefault();

const startsOnNestedControl = (event: PointerEvent, trigger: HTMLElement) => {
	const control = event.target instanceof Element ? event.target.closest(NESTED_CONTROLS) : null;
	return control !== null && control !== trigger && trigger.contains(control);
};

const visibleLabelOf = (trigger: HTMLElement) =>
	trigger.querySelector('[data-tab-label]')?.textContent?.trim() || labelOf(trigger);

const edgeScrollStep = (list: HTMLElement, x: number) => {
	if (list.scrollWidth <= list.clientWidth) return 0;
	const { left, right } = list.getBoundingClientRect();
	if (x < left + EDGE_SCROLL_ZONE_PX) return -EDGE_SCROLL_STEP_PX;
	if (x > right - EDGE_SCROLL_ZONE_PX) return EDGE_SCROLL_STEP_PX;
	return 0;
};

// The click lands on whatever sits under the release, since the lifted tab is hidden, so it is caught on the window.
const createClickSwallower = () => {
	let stopSwallowing: (() => void) | undefined;
	const stop = () => {
		stopSwallowing?.();
		stopSwallowing = undefined;
	};
	const swallowNext = () => {
		stop();
		const controller = new AbortController();
		window.addEventListener(
			'click',
			(event) => {
				event.preventDefault();
				event.stopPropagation();
			},
			{ capture: true, once: true, signal: controller.signal }
		);
		// The click follows the release in the same task, so a release with no click must not swallow a later one.
		const expiry = setTimeout(() => controller.abort());
		stopSwallowing = () => {
			clearTimeout(expiry);
			controller.abort();
		};
	};
	return { swallowNext, stop };
};

const createEdgeScroller = (
	trigger: HTMLElement,
	drag: TabsDragContext,
	pointer: () => DragPoint
) => {
	let frame: number | undefined;
	const stop = () => {
		if (frame !== undefined) cancelAnimationFrame(frame);
		frame = undefined;
	};
	const scrollFrame = () => {
		frame = requestAnimationFrame(scrollFrame);
		const list = trigger.parentElement;
		if (!list) return;
		const step = edgeScrollStep(list, pointer().x);
		if (step === 0) return;
		list.scrollLeft += step;
		drag.follow(pointer());
	};
	const start = () => {
		stop();
		scrollFrame();
	};
	return { start, stop };
};

// Hiding the lifted tab drops its focus, so the tab takes it back once the strip settles.
const createFocusRestorer = (element: HTMLElement) => {
	let hadFocus = false;
	const remember = () => {
		hadFocus = document.activeElement === element;
	};
	const restore = () => {
		if (!hadFocus) return;
		hadFocus = false;
		void tick().then(() => {
			const active = document.activeElement;
			if (element.isConnected && (active === null || active === document.body)) element.focus();
		});
	};
	return { remember, restore };
};

export function watchTabDrag(
	trigger: HTMLElement,
	value: string,
	drag: TabsDragContext
): () => void {
	let stage: Stage | undefined;
	let pointerId = 0;
	let pressTarget: EventTarget | null = null;
	let origin: DragPoint = { x: 0, y: 0 };
	let latest: DragPoint = origin;
	let holdTimer: ReturnType<typeof setTimeout> | undefined;
	let stopFollowing: (() => void) | undefined;
	let shouldSwallowClick = false;

	const clicks = createClickSwallower();
	const edgeScroller = createEdgeScroller(trigger, drag, () => latest);
	const focus = createFocusRestorer(trigger);

	function endPress() {
		clearTimeout(holdTimer);
		edgeScroller.stop();
		stopFollowing?.();
		stopFollowing = undefined;
		stage = undefined;
		pressTarget = null;
		if (shouldSwallowClick) clicks.swallowNext();
		shouldSwallowClick = false;
	}

	function cancelDrag() {
		edgeScroller.stop();
		if (drag.lifted === value) drag.cancel();
		focus.restore();
	}

	function abandonPress() {
		shouldSwallowClick = false;
		cancelDrag();
		endPress();
	}

	// A touch press captures its target, and hiding the lifted tab would lose the rest of the touch.
	function releasePressCapture() {
		if (pressTarget instanceof Element && pressTarget.hasPointerCapture(pointerId)) {
			pressTarget.releasePointerCapture(pointerId);
		}
	}

	function startDrag() {
		if (!drag.lift(value, visibleLabelOf(trigger), latest)) {
			abandonPress();
			return;
		}
		focus.remember();
		stage = 'dragging';
		shouldSwallowClick = true;
		releasePressCapture();
		drag.follow(latest);
		edgeScroller.start();
	}

	function handlePointermove(event: PointerEvent) {
		if (event.pointerId !== pointerId) return;
		latest = pointOf(event);
		if (stage === 'dragging') {
			drag.follow(latest);
			return;
		}
		if (stage !== 'held' && stage !== 'armed') return;
		const distance = Math.hypot(latest.x - origin.x, latest.y - origin.y);
		if (distance < DRAG_START_THRESHOLD_PX) return;
		// A touch that travels before the hold is scrolling the strip.
		if (stage === 'held') {
			abandonPress();
			return;
		}
		startDrag();
	}

	function handlePointerup(event: PointerEvent) {
		if (event.pointerId !== pointerId) return;
		if (stage === 'dragging') {
			edgeScroller.stop();
			drag.follow(pointOf(event));
			drag.drop();
			focus.restore();
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

	function handleKeydown(event: KeyboardEvent) {
		if (event.key !== 'Escape') return;
		// Consumed here so an enclosing dialog does not close along with the drag.
		event.preventDefault();
		event.stopPropagation();
		clearTimeout(holdTimer);
		cancelDrag();
		stage = 'canceled';
	}

	function blockTouchScroll(event: TouchEvent) {
		if (stage === 'armed' || stage === 'dragging' || stage === 'canceled') event.preventDefault();
	}

	// Attached synchronously, since `on` from svelte/events would miss a move dispatched in the same task.
	function followPress() {
		const controller = new AbortController();
		const options = { capture: true, signal: controller.signal };
		window.addEventListener('pointermove', handlePointermove, options);
		window.addEventListener('pointerup', handlePointerup, options);
		window.addEventListener('pointercancel', handlePointercancel, options);
		window.addEventListener('keydown', handleKeydown, options);
		window.addEventListener('blur', handleBlur, options);
		window.addEventListener('selectstart', veto, options);
		trigger.addEventListener('dragstart', veto, options);
		return () => controller.abort();
	}

	function handlePointerdown(event: PointerEvent) {
		if (event.button !== 0 || !event.isPrimary || stage !== undefined) return;
		if (drag.lifted !== undefined || startsOnNestedControl(event, trigger)) return;

		stopFollowing = followPress();
		pointerId = event.pointerId;
		pressTarget = event.target;
		origin = pointOf(event);
		latest = origin;
		shouldSwallowClick = false;

		if (event.pointerType !== 'touch') {
			stage = 'armed';
			return;
		}
		stage = 'held';
		holdTimer = setTimeout(() => (stage = 'armed'), HOLD_TO_DRAG_MS);
	}

	// Registered for the trigger's lifetime rather than at the hold, so the browser treats every touch here as cancelable.
	const listeners = new AbortController();
	trigger.addEventListener('pointerdown', handlePointerdown, { signal: listeners.signal });
	trigger.addEventListener('touchmove', blockTouchScroll, {
		passive: false,
		signal: listeners.signal
	});

	return () => {
		listeners.abort();
		clicks.stop();
		clearTimeout(holdTimer);
		edgeScroller.stop();
		stopFollowing?.();
		stopFollowing = undefined;
		if (drag.lifted === value) drag.cancel();
		focus.restore();
		stage = undefined;
	};
}
