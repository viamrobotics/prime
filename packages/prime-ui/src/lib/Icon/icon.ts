import type { Component } from 'svelte';

/**
 * What `Icon`'s `icon` prop accepts: an SVG path (`d` attribute on a 24×24 viewBox) such as an
 * `@mdi/js` export, or a Svelte icon component. Both tree-shake to only what the consumer imports.
 */
export type IconType = Component | string;

export type IconSize = keyof typeof iconSizes;

/** Maps each size token to the Tailwind `size-*` class `Icon` applies. */
export const iconSizes = {
	xs: 'size-3',
	sm: 'size-3.5',
	base: 'size-4',
	lg: 'size-5',
	xl: 'size-6',
	'2xl': 'size-7',
	'3xl': 'size-8',
	'4xl': 'size-9'
} as const;
