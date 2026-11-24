// Exactly one source: `aria-labelledby` overrides `aria-label`, so passing both leaves one unused.
export type AccessibleName =
	| { 'aria-label': string; 'aria-labelledby'?: undefined }
	| { 'aria-label'?: undefined; 'aria-labelledby': string };
