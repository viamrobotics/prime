import { on } from 'svelte/events';
import { userEvent } from 'vitest/browser';

const HOLD_SETTLE_MS = 300;

type DragArguments = Parameters<typeof userEvent.dragAndDrop>;

export async function holdPress(element: Element) {
	element.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0 }));
	await new Promise((resolve) => setTimeout(resolve, HOLD_SETTLE_MS));
}

/**
 * Holds `source` with a synthetic press, then drags it with Playwright. The real press that starts
 * the drag would restart the hold, so `SplitView.DragTrigger` never sees it.
 */
export async function dragAfterHold(
	source: Element,
	target: DragArguments[1],
	options?: DragArguments[2]
) {
	await holdPress(source);
	const stopHidingRealPress = on(
		window,
		'pointerdown',
		(event) => event.stopImmediatePropagation(),
		{ capture: true, once: true }
	);
	try {
		return await userEvent.dragAndDrop(source, target, options);
	} finally {
		stopHidingRealPress();
	}
}
