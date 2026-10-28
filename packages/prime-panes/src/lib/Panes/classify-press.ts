import type { Attachment } from 'svelte/attachments';

import { startsInsideDragIgnore } from './drag-ignore.ts';

export const HOLD_TO_DRAG_MS = 250;

const TEXT_FIELDS = 'input, textarea, [contenteditable]';
const CONTROLS = 'button, a, select, [role="button"]';
const TABS = '[data-tab-pane-id]';

const claimingElements = new WeakSet<Element>();
const gripElements = new WeakSet<Element>();

export const claimPresses: Attachment<Element> = (element) => {
	claimingElements.add(element);
	return () => claimingElements.delete(element);
};

export function markAsGrip(element: Element): () => void {
	gripElements.add(element);
	return () => gripElements.delete(element);
}

// `grip` drags like `immediate` and, like `held`, swallows the click after a press lasting `HOLD_TO_DRAG_MS`.
export type PressKind = 'ignored' | 'held' | 'immediate' | 'grip';

export function classifyPress(event: Event, boundary: Element): PressKind {
	if (startsInsideDragIgnore(event)) return 'ignored';

	const path = event.composedPath();
	const insideBoundary = path
		.slice(0, path.indexOf(boundary))
		.filter((target) => target instanceof Element);

	if (insideBoundary.some((element) => claimingElements.has(element))) return 'ignored';
	if (insideBoundary.some((element) => element.matches(TEXT_FIELDS))) return 'ignored';
	if (insideBoundary.some((element) => gripElements.has(element))) return 'grip';

	const control = insideBoundary.find((element) => element.matches(CONTROLS));
	if (control === undefined || control.matches(TABS)) return 'immediate';
	return 'held';
}
