import type { SplitDirection, SplitKey } from './layout.ts';

export type DropRegion = 'left' | 'right' | 'top' | 'bottom' | 'center';
export type DropRect = Pick<DOMRectReadOnly, 'left' | 'top' | 'width' | 'height'>;
export type EdgeRegion = Exclude<DropRegion, 'center'>;

export interface Placement {
	direction: SplitDirection;
	key: SplitKey;
}

const PLACEMENTS = {
	left: { direction: 'row', key: 'first' },
	right: { direction: 'row', key: 'second' },
	top: { direction: 'column', key: 'first' },
	bottom: { direction: 'column', key: 'second' }
} as const;

const CENTER_HALF_EXTENT = 0.4;

export function placementFor(region: EdgeRegion): Placement {
	return PLACEMENTS[region];
}

export function getDropRegion(clientX: number, clientY: number, rect: DropRect): DropRegion {
	const x = ((clientX - rect.left) / rect.width - 0.5) * 2;
	const y = -((clientY - rect.top) / rect.height - 0.5) * 2;
	const absX = Math.abs(x);
	const absY = Math.abs(y);

	if (absX < CENTER_HALF_EXTENT && absY < CENTER_HALF_EXTENT) return 'center';
	if (absX > absY) return x < 0 ? 'left' : 'right';
	return y < 0 ? 'bottom' : 'top';
}
