import type { Attachment } from 'svelte/attachments';

const ignoredElements = new WeakSet<Element>();

/** Keeps a press inside the element from starting a drag, for a custom control inside a `SplitView.DragTrigger`. */
export const dragIgnore: Attachment<Element> = (element) => {
	ignoredElements.add(element);
	return () => ignoredElements.delete(element);
};

export function startsInsideDragIgnore(event: Event) {
	return event
		.composedPath()
		.some((target) => target instanceof Element && ignoredElements.has(target));
}
