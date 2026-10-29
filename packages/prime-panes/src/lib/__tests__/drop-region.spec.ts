import { describe, expect, it } from 'vitest';

import {
	getDragRegion,
	getDropRegion,
	getPaneDropRegion,
	insertionIndexAt,
	nearestEdge,
	placementFor,
	stackSideOf
} from '../drop-region.ts';

describe('getDropRegion', () => {
	const left = 50;
	const top = 75;
	const width = 100;
	const height = 40;
	const rect = { left, top, width, height };
	const centerX = left + width / 2;
	const centerY = top + height / 2;

	it('returns center at the middle of the rect', () => {
		expect(getDropRegion(centerX, centerY, rect)).toBe('center');
	});

	it.each([
		{ place: 'left', clientX: left + 5, clientY: top + 15, expected: 'left' },
		{ place: 'top', clientX: left + 45, clientY: top + 1, expected: 'top' },
		{
			place: 'top by normalized offset, left by pixel offset',
			clientX: 70,
			clientY: 80,
			expected: 'top'
		}
	])('picks the $place axis in a corner', ({ clientX, clientY, expected }) => {
		expect(getDropRegion(clientX, clientY, rect)).toBe(expected);
	});

	it.each([
		{ axis: 'x', clientX: centerX + 0.39 * (width / 2), clientY: centerY },
		{ axis: 'y', clientX: centerX, clientY: centerY - 0.39 * (height / 2) }
	])('treats just inside the center threshold on $axis as center', ({ clientX, clientY }) => {
		expect(getDropRegion(clientX, clientY, rect)).toBe('center');
	});

	it.each([
		{ edge: 'right', clientX: centerX + 0.41 * (width / 2), clientY: centerY },
		{ edge: 'left', clientX: centerX - 0.41 * (width / 2), clientY: centerY },
		{ edge: 'top', clientX: centerX, clientY: centerY - 0.41 * (height / 2) },
		{ edge: 'bottom', clientX: centerX, clientY: centerY + 0.41 * (height / 2) }
	])('treats just outside the center threshold as $edge', ({ clientX, clientY, edge }) => {
		expect(getDropRegion(clientX, clientY, rect)).toBe(edge);
	});
});

describe('placementFor', () => {
	it.each([
		['left', 'row', 'first'],
		['right', 'row', 'second'],
		['top', 'column', 'first'],
		['bottom', 'column', 'second']
	] as const)('maps %s to a %s split with the pane in %s', (region, direction, key) => {
		expect(placementFor(region)).toEqual({ direction, key });
	});
});

describe('getPaneDropRegion', () => {
	const body = { left: 50, top: 100, width: 200, height: 300 };
	const stackRect = { left: 50, top: 50, width: 200, height: 50 };
	const centerX = 150;

	it.each([
		{ place: 'inside', clientX: centerX, clientY: 75 },
		{ place: 'on the inclusive top-left corner of', clientX: 50, clientY: 50 }
	])('is stack $place the stack rect', ({ clientX, clientY }) => {
		expect(getPaneDropRegion(clientX, clientY, body, stackRect)).toBe('stack');
	});

	it.each([
		{ place: 'the exclusive bottom', clientX: centerX, clientY: 100 },
		{ place: 'above', clientX: centerX, clientY: 49 },
		{ place: 'the exclusive right', clientX: 250, clientY: 75 }
	])('is not stack at $place of the stack rect', ({ clientX, clientY }) => {
		expect(getPaneDropRegion(clientX, clientY, body, stackRect)).toBe('top');
	});

	it('is never stack when there is no stack rect', () => {
		expect(getPaneDropRegion(centerX, 60, body, undefined)).toBe('top');
	});

	it.each([
		{ place: 'above', clientX: centerX, clientY: 10, expected: 'top' },
		{ place: 'below', clientX: centerX, clientY: 900, expected: 'bottom' },
		{ place: 'left of', clientX: -40, clientY: 250, expected: 'left' },
		{ place: 'right of', clientX: 700, clientY: 250, expected: 'right' }
	])('reads $expected for a point $place the body', ({ clientX, clientY, expected }) => {
		expect(getPaneDropRegion(clientX, clientY, body, undefined)).toBe(expected);
	});

	it.each([
		{ expected: 'left', clientX: 55, clientY: 250 },
		{ expected: 'right', clientX: 245, clientY: 250 },
		{ expected: 'bottom', clientX: centerX, clientY: 395 },
		{ expected: 'center', clientX: centerX, clientY: 250 }
	])('keeps $expected for a point inside the body', ({ clientX, clientY, expected }) => {
		expect(getPaneDropRegion(clientX, clientY, body, stackRect)).toBe(expected);
	});
});

describe('getDragRegion', () => {
	const bodyRect = { left: 50, top: 100, width: 200, height: 300 };
	const strip = { left: 50, top: 50, width: 200, height: 50 };

	it('is stack over the drop region', () => {
		const zones = { bodyRect, regionRect: strip, tabListRect: undefined, isOwnStack: false };

		expect(getDragRegion(150, 75, zones)).toBe('stack');
	});

	it('is stack for a dragged tab over its own tab list with no drop region', () => {
		const zones = { bodyRect, regionRect: undefined, tabListRect: strip, isOwnStack: true };

		expect(getDragRegion(150, 75, zones)).toBe('stack');
	});

	it('reads an edge, not stack, over a foreign tab list with no drop region', () => {
		const zones = { bodyRect, regionRect: undefined, tabListRect: strip, isOwnStack: false };

		expect(getDragRegion(150, 75, zones)).toBe('top');
	});

	it.each([
		{ place: 'the center of the body', clientX: 150, clientY: 250, expected: 'center' },
		{ place: 'the left of the body', clientX: 55, clientY: 250, expected: 'left' }
	])('is $expected outside both, over $place', ({ clientX, clientY, expected }) => {
		const zones = { bodyRect, regionRect: strip, tabListRect: strip, isOwnStack: true };

		expect(getDragRegion(clientX, clientY, zones)).toBe(expected);
	});
});

describe('nearestEdge', () => {
	const paneRect = { left: 50, top: 100, width: 200, height: 300 };

	it.each([
		{ expected: 'left', clientX: 60, clientY: 250 },
		{ expected: 'right', clientX: 240, clientY: 250 },
		{ expected: 'top', clientX: 150, clientY: 110 },
		{ expected: 'bottom', clientX: 150, clientY: 390 },
		{ expected: 'left', clientX: 60, clientY: 200 },
		{ expected: 'top', clientX: 90, clientY: 105 }
	])('is $expected for ($clientX, $clientY)', ({ clientX, clientY, expected }) => {
		expect(nearestEdge(clientX, clientY, paneRect)).toBe(expected);
	});

	it('reads a point outside the pane by its dominant axis', () => {
		expect(nearestEdge(700, 250, paneRect)).toBe('right');
	});
});

describe('stackSideOf', () => {
	const body = { left: 50, top: 100, width: 200, height: 300 };

	it.each([
		{ place: 'above', rect: { left: 50, top: 50, width: 200, height: 50 }, side: 'top' },
		{ place: 'below', rect: { left: 50, top: 400, width: 200, height: 50 }, side: 'bottom' },
		{ place: 'left of', rect: { left: 0, top: 100, width: 50, height: 300 }, side: 'left' },
		{ place: 'right of', rect: { left: 250, top: 100, width: 50, height: 300 }, side: 'right' },
		{
			place: 'over the middle of',
			rect: { left: 100, top: 200, width: 100, height: 100 },
			side: 'top'
		}
	] as const)('is $side for a region $place the body', ({ rect, side }) => {
		expect(stackSideOf(rect, body)).toBe(side);
	});
});

describe('insertionIndexAt', () => {
	const tabRects = [
		{ left: 0, top: 0, width: 100, height: 30 },
		{ left: 100, top: 0, width: 100, height: 30 },
		{ left: 200, top: 0, width: 100, height: 30 }
	];

	it.each([
		{ place: 'before every tab', clientX: -20, tabs: tabRects, expected: 0 },
		{ place: 'inside the first half of the first tab', clientX: 49, tabs: tabRects, expected: 0 },
		{ place: 'exactly at the first center', clientX: 50, tabs: tabRects, expected: 0 },
		{ place: 'just past the first center', clientX: 51, tabs: tabRects, expected: 1 },
		{ place: 'between the first two tabs', clientX: 100, tabs: tabRects, expected: 1 },
		{ place: 'exactly at the second center', clientX: 150, tabs: tabRects, expected: 1 },
		{ place: 'between the last two tabs', clientX: 200, tabs: tabRects, expected: 2 },
		{ place: 'exactly at the last center', clientX: 250, tabs: tabRects, expected: 2 },
		{ place: 'after every tab', clientX: 400, tabs: tabRects, expected: 3 },
		{ place: 'over an empty strip', clientX: 100, tabs: [], expected: 0 }
	])('is $expected for a point $place', ({ clientX, tabs, expected }) => {
		expect(insertionIndexAt(clientX, tabs)).toBe(expected);
	});
});
