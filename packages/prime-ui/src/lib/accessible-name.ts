/**
 * The name a component requires, given exactly one way: a `label` the component renders or
 * applies, an `aria-label`, or `aria-labelledby` naming the id of a visible element.
 */
export type AccessibleName =
	| { label: string; 'aria-label'?: undefined; 'aria-labelledby'?: undefined }
	| { label?: undefined; 'aria-label': string; 'aria-labelledby'?: undefined }
	| { label?: undefined; 'aria-label'?: undefined; 'aria-labelledby': string };
