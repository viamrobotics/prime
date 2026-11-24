import type { Extension } from '@codemirror/state';

import { EditorView } from '@codemirror/view';

type Attributes = Record<string, unknown>;

const ARIA_PREFIX = 'aria-';
const NAME_ATTRIBUTES = ['aria-label', 'aria-labelledby'];

export const ORIGINAL_SIDE_SUFFIX = 'original';

export function isAriaAttribute(name: string): boolean {
	return name.startsWith(ARIA_PREFIX);
}

function isNameAttribute(name: string): boolean {
	return NAME_ATTRIBUTES.includes(name);
}

function ariaContentAttributes(
	attributes: Attributes,
	isIncluded: (name: string) => boolean
): Extension {
	const included = Object.entries(attributes)
		.filter(([name, value]) => isAriaAttribute(name) && isIncluded(name) && value != null)
		.map(([name, value]) => [name, String(value)]);
	return EditorView.contentAttributes.of(Object.fromEntries(included));
}

export function nameContentAttributes(attributes: Attributes): Extension {
	return ariaContentAttributes(attributes, isNameAttribute);
}

export function otherAriaContentAttributes(attributes: Attributes): Extension {
	return ariaContentAttributes(attributes, (name) => !isNameAttribute(name));
}

function originalNameAttributes(attributes: Attributes, labelId: string): Record<string, string> {
	const label = attributes['aria-label'];
	const labelledby = attributes['aria-labelledby'];
	if (labelledby != null) return { 'aria-labelledby': `${labelledby} ${labelId}` };
	if (label != null) return { 'aria-label': `${label}, ${ORIGINAL_SIDE_SUFFIX}` };
	return {};
}

export function originalNameContentAttributes(attributes: Attributes, labelId: string): Extension {
	return EditorView.contentAttributes.of(originalNameAttributes(attributes, labelId));
}
