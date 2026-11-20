import { describe, expect, it } from 'vitest';
import {
	firstPoint,
	isAvailable,
	isNavigationKey,
	nearestPoint,
	step,
	type NavigationSeries
} from '../navigation.ts';

const MINUTE = 60_000;

const series = (values: (number | null)[], hidden = false, times?: number[]): NavigationSeries => ({
	hidden,
	points: values.map((y, index) => ({ x: (times?.[index] ?? index) * MINUTE, y }))
});

const plot = { x: (time: number) => time / MINUTE, y: (value: number) => value };

describe('nearestPoint', () => {
	it('picks the point nearest the pointer across series', () => {
		const low = series([0, 0, 0]);
		const high = series([10, 10, 10]);
		expect(nearestPoint([low, high], [1.2, 9], plot)).toEqual({ series: high, index: 1 });
		expect(nearestPoint([low, high], [1.8, 1], plot)).toEqual({ series: low, index: 2 });
	});

	it('skips gaps', () => {
		const gapped = series([0, null, null, 3]);
		expect(nearestPoint([gapped], [1.4, 0], plot)).toEqual({ series: gapped, index: 0 });
		expect(nearestPoint([gapped], [1.6, 0], plot)).toEqual({ series: gapped, index: 3 });
	});

	it('skips hidden series', () => {
		const low = series([0, 0, 0]);
		const high = series([10, 10, 10], true);
		expect(nearestPoint([low, high], [1, 10], plot)).toEqual({ series: low, index: 1 });
	});

	it('finds nothing without a visible point or a pointer position', () => {
		expect(nearestPoint([series([null, null])], [0, 0], plot)).toBeUndefined();
		expect(nearestPoint([series([1, 2])], [Number.NaN, Number.NaN], plot)).toBeUndefined();
	});
});

describe('firstPoint', () => {
	it('starts at the first drawable point of the first visible series with one', () => {
		const hidden = series([1, 2], true);
		const empty = series([null, null]);
		const gapped = series([null, 5, 6]);
		expect(firstPoint([hidden, empty, gapped])).toEqual({ series: gapped, index: 1 });
		expect(firstPoint([hidden, empty])).toBeUndefined();
	});
});

describe('isAvailable', () => {
	it('drops a point of a hidden, removed or gapped series', () => {
		const shown = series([1, null]);
		const hidden = series([1], true);
		expect(isAvailable([shown], { series: shown, index: 0 })).toBe(true);
		expect(isAvailable([shown], { series: shown, index: 1 })).toBe(false);
		expect(isAvailable([shown], { series: shown, index: 2 })).toBe(false);
		expect(isAvailable([hidden], { series: hidden, index: 0 })).toBe(false);
		expect(isAvailable([], { series: shown, index: 0 })).toBe(false);
	});
});

describe('step', () => {
	const long = series(Array.from({ length: 25 }, (_, index) => index));

	it.each([
		['ArrowRight', 5, 6],
		['ArrowLeft', 5, 4],
		['ArrowRight', 24, 24],
		['ArrowLeft', 0, 0],
		['Home', 5, 0],
		['End', 5, 24],
		['PageDown', 5, 7],
		['PageUp', 5, 3],
		['PageDown', 23, 24],
		['PageUp', 1, 0]
	] as const)('moves %s from %i to %i', (key, from, to) => {
		expect(step([long], { series: long, index: from }, key)).toEqual({ series: long, index: to });
	});

	it('pages by at least one point', () => {
		const short = series([1, 2, 3]);
		expect(step([short], { series: short, index: 0 }, 'PageDown').index).toBe(1);
	});

	it('steps over gaps', () => {
		const gapped = series([null, 1, null, null, 4, null]);
		expect(step([gapped], { series: gapped, index: 1 }, 'ArrowRight').index).toBe(4);
		expect(step([gapped], { series: gapped, index: 4 }, 'ArrowLeft').index).toBe(1);
		expect(step([gapped], { series: gapped, index: 4 }, 'Home').index).toBe(1);
		expect(step([gapped], { series: gapped, index: 1 }, 'End').index).toBe(4);
	});

	it('moves between series at the point nearest in time', () => {
		const top = series([1, 2, 3, 4, 5]);
		const bottom = series([6, 7, 8], false, [0, 2.9, 4]);
		expect(step([top, bottom], { series: top, index: 3 }, 'ArrowDown')).toEqual({
			series: bottom,
			index: 1
		});
		expect(step([top, bottom], { series: bottom, index: 1 }, 'ArrowUp')).toEqual({
			series: top,
			index: 3
		});
	});

	it('skips hidden series and series without a point', () => {
		const top = series([1, 2]);
		const hidden = series([3, 4], true);
		const empty = series([null, null]);
		const bottom = series([5, 6]);
		const all = [top, hidden, empty, bottom];
		expect(step(all, { series: top, index: 1 }, 'ArrowDown')).toEqual({ series: bottom, index: 1 });
		expect(step(all, { series: bottom, index: 0 }, 'ArrowUp')).toEqual({ series: top, index: 0 });
	});

	it('stays at the first and last series', () => {
		const top = series([1]);
		const bottom = series([2]);
		expect(step([top, bottom], { series: top, index: 0 }, 'ArrowUp').series).toBe(top);
		expect(step([top, bottom], { series: bottom, index: 0 }, 'ArrowDown').series).toBe(bottom);
	});
});

describe('isNavigationKey', () => {
	it('accepts the navigation keys only', () => {
		const keys = ['ArrowUp', 'PageDown', 'Home', 'Escape', 'Enter', 'a', 'toString'];
		expect(keys.filter(isNavigationKey)).toEqual(['ArrowUp', 'PageDown', 'Home']);
	});
});
