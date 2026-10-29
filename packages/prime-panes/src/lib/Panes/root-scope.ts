import type { Attachment } from 'svelte/attachments';

const rootElements = new WeakSet<Node>();

// Lets a handler above a nested root tell the two roots' DOM apart.
export const markAsRoot: Attachment<Element> = (element) => {
	rootElements.add(element);
	return () => rootElements.delete(element);
};

function nearestRootOf(target: EventTarget | null) {
	let node = target instanceof Node ? target : null;
	while (node && !rootElements.has(node)) node = node.parentNode;
	return node;
}

// A target inside a root nested in `owner`'s root is foreign to `owner`, even if the nested root does not stop its events.
export function isInSameRoot(target: EventTarget | null, owner: EventTarget | null) {
	return nearestRootOf(target) === nearestRootOf(owner);
}
