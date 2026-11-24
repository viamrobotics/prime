import { INTERACTIVE_DESCENDANT_SELECTOR } from '../interactive-descendant.ts';

type Focusable = HTMLElement | SVGElement;

const isTabbable = (element: Element): element is Focusable =>
	(element instanceof HTMLElement || element instanceof SVGElement) &&
	element.tabIndex >= 0 &&
	!element.matches(':disabled') &&
	element.closest('[inert]') === null &&
	element.checkVisibility({ visibilityProperty: true });

/** The elements inside `container` that Tab stops on, in document order. */
export const tabbablesIn = (container: Element): Focusable[] =>
	[...container.querySelectorAll(INTERACTIVE_DESCENDANT_SELECTOR)].filter(isTabbable);

/**
 * The first Tab stop after `anchor` in document order, outside both `anchor` and `skipped`.
 *
 * @param skipped A subtree to pass over, such as a portaled panel that sits later in the document.
 */
export const nextTabbableAfter = (anchor: Element, skipped: Element): Focusable | undefined =>
	tabbablesIn(anchor.ownerDocument.body).find(
		(element) =>
			Boolean(anchor.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_FOLLOWING) &&
			!anchor.contains(element) &&
			!skipped.contains(element)
	);
