import { startsInsideDragIgnore } from './drag-ignore.ts';

export const HOLD_TO_DRAG_MS = 250;

const TEXT_FIELDS = 'input, textarea, [contenteditable]';
const CONTROLS = 'button, a, select, [role="button"]';

/**
 * What a press means for dragging. `ignored` never drags, `held` drags after `HOLD_TO_DRAG_MS`,
 * and `immediate` drags at once.
 */
export type PressKind = 'ignored' | 'held' | 'immediate';

/** Classifies a press by the elements between its target and `boundary`, the drag trigger. */
export function classifyPress(event: Event, boundary: Element): PressKind {
	if (startsInsideDragIgnore(event)) return 'ignored';

	const path = event.composedPath();
	const insideBoundary = path
		.slice(0, path.indexOf(boundary))
		.filter((target) => target instanceof Element);

	if (insideBoundary.some((element) => element.matches(TEXT_FIELDS))) return 'ignored';
	if (insideBoundary.some((element) => element.matches(CONTROLS))) return 'held';
	return 'immediate';
}
