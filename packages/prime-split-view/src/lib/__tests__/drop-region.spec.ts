import { describe, expect, it } from 'vitest';

import { getDropRegion, placementFor } from '../drop-region.ts';

describe('getDropRegion', () => {
	const left = 50;
	const top = 75;
	const width = 100;
	const height = 40;
	const rect = { left, top, width, height };
	const centerX = left + width / 2;
	const centerY = top + height / 2;

	it('returns the edge nearest the point', () => {
		expect(getDropRegion(left + 2, centerY, rect)).toBe('left');
		expect(getDropRegion(left + width - 2, centerY, rect)).toBe('right');
		expect(getDropRegion(centerX, top + 2, rect)).toBe('top');
		expect(getDropRegion(centerX, top + height - 2, rect)).toBe('bottom');
	});

	it('returns center at the middle of the rect', () => {
		expect(getDropRegion(centerX, centerY, rect)).toBe('center');
	});

	it('picks the axis the point is farther along in a corner', () => {
		expect(getDropRegion(left + 5, top + 15, rect)).toBe('left');
		expect(getDropRegion(left + 45, top + 1, rect)).toBe('top');
	});

	it('treats just inside the center threshold as center', () => {
		expect(getDropRegion(centerX + 0.39 * (width / 2), centerY, rect)).toBe('center');
		expect(getDropRegion(centerX, centerY - 0.39 * (height / 2), rect)).toBe('center');
	});

	it('treats just outside the center threshold as an edge', () => {
		expect(getDropRegion(centerX + 0.41 * (width / 2), centerY, rect)).toBe('right');
		expect(getDropRegion(centerX - 0.41 * (width / 2), centerY, rect)).toBe('left');
		expect(getDropRegion(centerX, centerY - 0.41 * (height / 2), rect)).toBe('top');
		expect(getDropRegion(centerX, centerY + 0.41 * (height / 2), rect)).toBe('bottom');
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
