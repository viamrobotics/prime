import './tailwind.css';

/**
 * Resolves what a Tailwind utility paints, so a spec can compare an element's computed style
 * against the token instead of against a class name. Needs the test stylesheet, imported above.
 */
export const colorOf = (utility: string, property: 'borderTopColor' | 'color'): string => {
	const probe = document.createElement('div');
	probe.className = `border ${utility}`;
	document.body.append(probe);
	const color = getComputedStyle(probe)[property];
	probe.remove();
	return color;
};

export const borderColor = (element: Element): string => getComputedStyle(element).borderTopColor;

export const textColor = (element: Element): string => getComputedStyle(element).color;
