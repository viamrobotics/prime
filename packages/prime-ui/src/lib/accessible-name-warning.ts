import type { Attachment } from 'svelte/attachments';

import { DEV } from 'esm-env';
import { tick } from 'svelte';

const labelsOf = (element: Element) =>
	'labels' in element ? (element.labels as NodeListOf<HTMLLabelElement> | null) : null;

const hasOwnName = (element: Element) => {
	// A hidden input is never presented, so it needs no name.
	if (element instanceof HTMLInputElement && element.type === 'hidden') return true;
	if (element.getAttribute('aria-label')?.trim()) return true;
	if (element.getAttribute('aria-labelledby')?.trim()) return true;
	return (labelsOf(element)?.length ?? 0) > 0;
};

/**
 * Warns once in development when `element` has no accessible name of its own: no non-empty
 * `aria-label`, no `aria-labelledby`, and no `<label>` among its `labels`. It reads the element
 * only, so a control named by `<label for>` or an `aria-*` attribute outside any `Field` passes.
 * It checks after pending updates settle, so a `Label` that registers with its `Field` counts.
 *
 * @param component The component name the warning prints, such as `'Input'`.
 */
export const warnIfUnnamed = (element: Element, component: string): void => {
	if (!DEV) return;
	void tick().then(() => {
		if (!element.isConnected || hasOwnName(element)) return;
		console.warn(
			`prime-ui: ${component} has no accessible name. Give its Field a label, aria-label, or aria-labelledby, or give the control one.`
		);
	});
};

/**
 * The attachment form of `warnIfUnnamed`, for the element a form control renders:
 * `{@attach accessibleNameWarning('Input')}`.
 *
 * @param component The component name the warning prints, such as `'Input'`.
 */
export const accessibleNameWarning =
	(component: string): Attachment<Element> =>
	(element) => {
		warnIfUnnamed(element, component);
	};
