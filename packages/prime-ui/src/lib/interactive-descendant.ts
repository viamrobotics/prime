/**
 * Matches an element that handles a press or takes focus on its own: a button, a link, a form
 * control, a `<summary>`, an element with a `tabindex`, editable content, or an
 * element with `role="button"`. A part that forwards a press or focus to one of its own elements
 * leaves an element matching this alone.
 */
export const INTERACTIVE_DESCENDANT_SELECTOR = [
	'button',
	'a',
	'input',
	'select',
	'textarea',
	'summary',
	'[tabindex]',
	'[contenteditable]:not([contenteditable="false"])',
	'[role="button"]'
].join(', ');

/**
 * The interactive element an event started on, when it sits strictly inside `container`. Returns
 * `null` when the event started on `container` itself or on content that is not interactive.
 *
 * @param target The event's `target`.
 * @param container The element whose own handling the interactive descendant opts out of.
 */
export const interactiveDescendantAt = (
	target: EventTarget | null,
	container: Element
): Element | null => {
	const element =
		target instanceof Element ? target.closest(INTERACTIVE_DESCENDANT_SELECTOR) : null;
	if (element === null || element === container || !container.contains(element)) return null;
	return element;
};
