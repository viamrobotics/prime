import type { AccessibleName as PrimeAccessibleName } from '@viamrobotics/prime-ui';

// prime-ui's union, with `hint` forbidden outside the `label` branch, since a hint sits beside
// the visible label.
export type AccessibleName =
	| Extract<PrimeAccessibleName, { label: string }>
	| (Exclude<PrimeAccessibleName, { label: string }> & { hint?: undefined });
