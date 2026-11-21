import type { SVGAttributes } from 'svelte/elements';

export const iconRole = (attributes: SVGAttributes<SVGElement>) =>
	attributes['aria-label'] || attributes['aria-labelledby']
		? { role: 'img' as const, 'aria-hidden': undefined }
		: { role: undefined, 'aria-hidden': true as const };
