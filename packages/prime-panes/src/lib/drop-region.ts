import type { SplitDirection, SplitKey } from './layout.ts';

export type DropRegion = 'left' | 'right' | 'top' | 'bottom' | 'center' | 'stack';
export type DropRect = Pick<DOMRectReadOnly, 'left' | 'top' | 'width' | 'height'>;
export type EdgeRegion = Exclude<DropRegion, 'center' | 'stack'>;

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
const PANE_CENTER_FRACTION = 0.5;

export function placementFor(region: EdgeRegion): Placement {
	return PLACEMENTS[region];
}

function containsPoint(rect: DropRect, clientX: number, clientY: number) {
	return (
		clientX >= rect.left &&
		clientX < rect.left + rect.width &&
		clientY >= rect.top &&
		clientY < rect.top + rect.height
	);
}

function clampInto(rect: DropRect, clientX: number, clientY: number): [number, number] {
	return [
		Math.min(Math.max(clientX, rect.left), rect.left + rect.width),
		Math.min(Math.max(clientY, rect.top), rect.top + rect.height)
	];
}

export function getDropRegion(
	clientX: number,
	clientY: number,
	rect: DropRect
): EdgeRegion | 'center' {
	const x = ((clientX - rect.left) / rect.width - 0.5) * 2;
	const y = -((clientY - rect.top) / rect.height - 0.5) * 2;
	const absX = Math.abs(x);
	const absY = Math.abs(y);

	if (absX < CENTER_HALF_EXTENT && absY < CENTER_HALF_EXTENT) return 'center';
	if (absX > absY) return x < 0 ? 'left' : 'right';
	return y < 0 ? 'bottom' : 'top';
}

// A point outside `bodyRect` reads as the nearest point on its border.
export function getPaneDropRegion(
	clientX: number,
	clientY: number,
	bodyRect: DropRect,
	stackRect: DropRect | undefined
): DropRegion {
	if (stackRect && containsPoint(stackRect, clientX, clientY)) return 'stack';

	return getDropRegion(...clampInto(bodyRect, clientX, clientY), bodyRect);
}

interface DragRegionZones {
	bodyRect: DropRect;
	regionRect: DropRect | undefined;
	tabListRect: DropRect | undefined;
	isOwnStack: boolean;
}

export function getDragRegion(
	clientX: number,
	clientY: number,
	{ bodyRect, regionRect, tabListRect, isOwnStack }: DragRegionZones
): DropRegion {
	const isOverRegion = regionRect !== undefined && containsPoint(regionRect, clientX, clientY);
	const isOverTabList = tabListRect !== undefined && containsPoint(tabListRect, clientX, clientY);
	if (isOverRegion || (isOwnStack && isOverTabList)) return 'stack';

	return getPaneDropRegion(clientX, clientY, bodyRect, undefined);
}

export function nearestEdge(clientX: number, clientY: number, paneRect: DropRect): EdgeRegion {
	const offsetX = (clientX - paneRect.left) / paneRect.width - PANE_CENTER_FRACTION;
	const offsetY = (clientY - paneRect.top) / paneRect.height - PANE_CENTER_FRACTION;
	if (Math.abs(offsetX) > Math.abs(offsetY)) return offsetX < 0 ? 'left' : 'right';
	return offsetY < 0 ? 'top' : 'bottom';
}

export function stackSideOf(stackRect: DropRect, bodyRect: DropRect): EdgeRegion {
	const centerX = stackRect.left + stackRect.width / 2;
	const centerY = stackRect.top + stackRect.height / 2;
	const region = getDropRegion(...clampInto(bodyRect, centerX, centerY), bodyRect);
	return region === 'center' ? 'top' : region;
}

// Pass the tabs' layout rects, without the transforms of a running animation.
export function insertionIndexAt(clientX: number, tabRects: readonly DropRect[]): number {
	return tabRects.filter((rect) => rect.left + rect.width / 2 < clientX).length;
}
