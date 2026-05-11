interface BaseControl {
	/** The prop name on the component. Used as the binding key. */
	name: string;
	/** Optional human-readable label. Defaults to `name`. */
	label?: string;
	/** Optional explanatory text rendered next to the control. */
	description?: string;
}

export interface SelectControl extends BaseControl {
	type: 'select';
	options: readonly string[];
	default: string;
}

export interface BooleanControl extends BaseControl {
	type: 'boolean';
	default: boolean;
}

export interface StringControl extends BaseControl {
	type: 'string';
	default: string;
	placeholder?: string;
}

export interface NumberControl extends BaseControl {
	type: 'number';
	default: number;
	min?: number;
	max?: number;
	step?: number;
}

export type Control = SelectControl | BooleanControl | StringControl | NumberControl;

export type ControlValues = Record<string, string | boolean | number>;

export const initialValues = (controls: readonly Control[]): ControlValues => {
	const values: ControlValues = {};
	for (const control of controls) {
		values[control.name] = control.default;
	}
	return values;
};

/**
 * Render the current values as a Svelte component tag. Skips values equal to
 * the control default so the generated code stays copy-paste minimal.
 */
export const renderSnippet = (
	componentName: string,
	controls: readonly Control[],
	values: ControlValues
): string => {
	const attrs: string[] = [];
	for (const control of controls) {
		const value = values[control.name];
		if (value === control.default) continue;

		if (control.type === 'boolean') {
			if (value) attrs.push(control.name);
		} else if (control.type === 'string') {
			if (value === '') continue;
			attrs.push(`${control.name}="${String(value).replace(/"/g, '&quot;')}"`);
		} else if (control.type === 'number') {
			attrs.push(`${control.name}={${value}}`);
		} else {
			attrs.push(`${control.name}="${String(value)}"`);
		}
	}

	if (attrs.length === 0) return `<${componentName} />`;
	if (attrs.length <= 2) return `<${componentName} ${attrs.join(' ')} />`;
	return `<${componentName}\n  ${attrs.join('\n  ')}\n/>`;
};
