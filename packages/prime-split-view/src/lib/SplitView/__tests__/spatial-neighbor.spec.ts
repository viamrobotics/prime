import { describe, expect, it } from 'vitest';

import { findNeighbor } from '../spatial-neighbor.ts';
import type { PaneBounds } from '../spatial-neighbor.ts';

const bounds = (left: number, top: number, right: number, bottom: number): PaneBounds => ({
	left,
	top,
	right,
	bottom
});

const panesOf = (entries: Record<string, PaneBounds>) => new Map(Object.entries(entries));

describe('findNeighbor', () => {
	it.each([
		{ direction: 'left', expected: 'west' },
		{ direction: 'right', expected: 'east' },
		{ direction: 'top', expected: 'north' },
		{ direction: 'bottom', expected: 'south' }
	] as const)('finds the adjacent pane toward $direction', ({ direction, expected }) => {
		const panes = panesOf({
			center: bounds(100, 100, 200, 200),
			west: bounds(0, 100, 100, 200),
			east: bounds(200, 100, 300, 200),
			north: bounds(100, 0, 200, 100),
			south: bounds(100, 200, 200, 300)
		});

		expect(findNeighbor(panes, 'center', direction)).toBe(expected);
	});

	it('prefers a pane that overlaps on the other axis over a closer one that does not', () => {
		const panes = panesOf({
			current: bounds(0, 0, 100, 100),
			diagonalAndClose: bounds(100, 200, 200, 300),
			alignedAndFar: bounds(400, 0, 500, 100)
		});

		expect(findNeighbor(panes, 'current', 'right')).toBe('alignedAndFar');
	});

	it('takes the closer of two panes that both overlap', () => {
		const panes = panesOf({
			current: bounds(0, 0, 100, 100),
			far: bounds(300, 0, 400, 100),
			near: bounds(150, 0, 250, 100)
		});

		expect(findNeighbor(panes, 'current', 'right')).toBe('near');
	});

	it('takes the pane with the larger overlap when two panes are equally close', () => {
		const panes = panesOf({
			current: bounds(0, 100, 300, 200),
			narrow: bounds(0, 0, 100, 100),
			wide: bounds(100, 0, 300, 100)
		});

		expect(findNeighbor(panes, 'current', 'top')).toBe('wide');
	});

	it('takes the earlier pane when distance and overlap both tie', () => {
		const panes = panesOf({
			current: bounds(0, 0, 100, 200),
			upper: bounds(100, 0, 200, 100),
			lower: bounds(100, 100, 200, 200)
		});

		expect(findNeighbor(panes, 'current', 'right')).toBe('upper');
	});

	it('treats gaps within a pixel as equal, so a rounding difference does not pick the pane', () => {
		const panes = panesOf({
			current: bounds(0, 100, 300, 200),
			narrow: bounds(0, 0, 100, 100),
			wide: bounds(100, 0, 300, 99.5)
		});

		expect(findNeighbor(panes, 'current', 'top')).toBe('wide');
	});

	it('steps over the excluded pane to reach the one beyond it', () => {
		const panes = panesOf({
			current: bounds(0, 0, 100, 100),
			moving: bounds(100, 0, 200, 100),
			beyond: bounds(200, 0, 300, 100)
		});

		expect(findNeighbor(panes, 'current', 'right', 'moving')).toBe('beyond');
		expect(findNeighbor(panes, 'current', 'right')).toBe('moving');
	});

	it('finds nothing at the outer edge', () => {
		const panes = panesOf({
			current: bounds(0, 0, 100, 100),
			east: bounds(100, 0, 200, 100)
		});

		expect(findNeighbor(panes, 'current', 'left')).toBeUndefined();
		expect(findNeighbor(panes, 'current', 'top')).toBeUndefined();
	});

	it('finds nothing when the only pane beyond is excluded', () => {
		const panes = panesOf({
			current: bounds(0, 0, 100, 100),
			moving: bounds(100, 0, 200, 100)
		});

		expect(findNeighbor(panes, 'current', 'right', 'moving')).toBeUndefined();
	});

	it('ignores a pane whose near edge does not face the far edge', () => {
		const panes = panesOf({
			current: bounds(0, 0, 100, 100),
			overlapping: bounds(50, 0, 150, 100)
		});

		expect(findNeighbor(panes, 'current', 'right')).toBeUndefined();
	});

	it('never returns the current pane, even when it has no width', () => {
		const panes = panesOf({ current: bounds(100, 0, 100, 100) });

		expect(findNeighbor(panes, 'current', 'right')).toBeUndefined();
	});

	it('finds nothing for a pane that has no bounds', () => {
		const panes = panesOf({ other: bounds(0, 0, 100, 100) });

		expect(findNeighbor(panes, 'missing', 'right')).toBeUndefined();
	});
});
