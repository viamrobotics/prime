import type { SplitDirection, SplitKey } from './layout.ts';

export type DropRegion = 'left' | 'right' | 'top' | 'bottom' | 'center' | 'stack';
export type DropRect = Pick<DOMRectReadOnly, 'left' | 'top' | 'width' | 'height'>;
export type EdgeRegion = Exclude<DropRegion, 'center' | 'stack'>;

interface Placement {
	direction: SplitDirection;
	key: SplitKey;
}

const PLACEMENTS = {
	left: { direction: 'row', key: 'first' },
	right: { direction: 'row', key: 'second' },
	top: { direction: 'column', key: 'first' },
	bottom: { direction: 'column', key: 'second' }
} as const;

const CENTER_FRACTION = 0.5;
// How far from a rect's center, as a fraction of its width or height, a point still reads as center.
const CENTER_ZONE_REACH = 0.2;

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

function centerOf(rect: DropRect): [number, number] {
	return [rect.left + rect.width * CENTER_FRACTION, rect.top + rect.height * CENTER_FRACTION];
}

// Each offset runs from -0.5 at the left or top edge to 0.5 at the right or bottom edge.
function offsetFromCenter(clientX: number, clientY: number, rect: DropRect): [number, number] {
	return [
		(clientX - rect.left) / rect.width - CENTER_FRACTION,
		(clientY - rect.top) / rect.height - CENTER_FRACTION
	];
}

function clampInto(rect: DropRect, clientX: number, clientY: number): [number, number] {
	return [
		Math.min(Math.max(clientX, rect.left), rect.left + rect.width),
		Math.min(Math.max(clientY, rect.top), rect.top + rect.height)
	];
}

// A tie between the axes reads vertical, and a vertical tie reads top.
function dominantEdge(offsetX: number, offsetY: number): EdgeRegion {
	if (Math.abs(offsetX) > Math.abs(offsetY)) return offsetX < 0 ? 'left' : 'right';
	return offsetY > 0 ? 'bottom' : 'top';
}

export function getDropRegion(
	clientX: number,
	clientY: number,
	rect: DropRect
): EdgeRegion | 'center' {
	const [offsetX, offsetY] = offsetFromCenter(clientX, clientY, rect);
	const absX = Math.abs(offsetX);
	const absY = Math.abs(offsetY);

	if (absX < CENTER_ZONE_REACH && absY < CENTER_ZONE_REACH) return 'center';
	return dominantEdge(offsetX, offsetY);
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
	const [offsetX, offsetY] = offsetFromCenter(clientX, clientY, paneRect);
	return dominantEdge(offsetX, offsetY);
}

export function stackSideOf(stackRect: DropRect, bodyRect: DropRect): EdgeRegion {
	const region = getDropRegion(...clampInto(bodyRect, ...centerOf(stackRect)), bodyRect);
	return region === 'center' ? 'top' : region;
}

// Pass the tabs' layout rects, without the transforms of a running animation.
export function insertionIndexAt(clientX: number, tabRects: readonly DropRect[]): number {
	return tabRects.filter((rect) => centerOf(rect)[0] < clientX).length;
}
