import type { DropRegion } from '../drop-region.ts';

export const INDICATOR_CLASSES_BY_REGION = {
	center: 'top-0 left-0 h-full w-full',
	left: 'top-0 left-0 h-full w-1/2',
	right: 'top-0 left-1/2 h-full w-1/2',
	top: 'top-0 left-0 h-1/2 w-full',
	bottom: 'top-1/2 left-0 h-1/2 w-full'
} as const satisfies Record<DropRegion, string>;
