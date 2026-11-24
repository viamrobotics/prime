import './tailwind.css';

type ColorProperty = 'backgroundColor' | 'borderTopColor' | 'color';

type ShapeProperty = 'borderTopLeftRadius' | 'boxShadow';

/**
 * Resolves what a Tailwind utility paints, so a spec can compare an element's computed style
 * against the token instead of against a class name. Needs the test stylesheet, imported above.
 */
export const colorOf = (utility: string, property: ColorProperty): string =>
	probeStyle(`border ${utility}`, property);

/** Resolves the shadow or corner radius a Tailwind utility draws, the way `colorOf` resolves a color. */
export const shapeOf = (utility: string, property: ShapeProperty): string =>
	probeStyle(utility, property);

const probeStyle = (className: string, property: ColorProperty | ShapeProperty): string => {
	const probe = document.createElement('div');
	probe.className = className;
	document.body.append(probe);
	const value = getComputedStyle(probe)[property];
	probe.remove();
	return value;
};

export const borderColor = (element: Element): string => getComputedStyle(element).borderTopColor;

export const backgroundColor = (element: Element): string =>
	getComputedStyle(element).backgroundColor;

export const textColor = (element: Element): string => getComputedStyle(element).color;

export const boxShadow = (element: Element): string => getComputedStyle(element).boxShadow;
