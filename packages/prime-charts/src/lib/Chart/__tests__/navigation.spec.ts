import { describe, expect, it } from 'vitest';
import {
	firstPoint,
	isAvailable,
	isNavigationKey,
	nearestPoint,
	step,
	type NavigationSeries
} from '../navigation.ts';
import { X_SCALES, type XWindow } from '../x-scales.ts';

const MINUTE = 60_000;

const series = (values: (number | null)[], hidden = false, times?: number[]): NavigationSeries => ({
	hidden,
	points: values.map((y, index) => ({ x: (times?.[index] ?? index) * MINUTE, y }))
});

const windowOf = (from: number, to: number): XWindow => ({
	domain: [from * MINUTE, to * MINUTE],
	toNumber: X_SCALES.time.toNumber
});

const STRING_X = '1970-01-01T00:01:00Z';

const withStringX = (): NavigationSeries => ({
	hidden: false,
	points: [
		{ x: 0, y: 1 },
		{ x: STRING_X, y: 2 },
		{ x: 2 * MINUTE, y: 3 }
	]
});

const FIXTURE_REACH = 1000;
const everything = windowOf(-FIXTURE_REACH, FIXTURE_REACH);

const plot = { x: (time: number) => time / MINUTE, y: (value: number) => value };

describe('nearestPoint', () => {
	it('picks the point nearest the pointer in the nearer series by y', () => {
		const low = series([0, 0, 0]);
		const high = series([10, 10, 10]);
		expect(nearestPoint([low, high], [1.2, 9], plot, everything)).toEqual({
			series: high,
			index: 1
		});
	});

	it('picks the point nearest the pointer in the series nearer by x', () => {
		const low = series([0, 0, 0]);
		const high = series([10, 10, 10]);
		expect(nearestPoint([low, high], [1.8, 1], plot, everything)).toEqual({
			series: low,
			index: 2
		});
	});

	it('is not steered by an unplaceable x among placed points', () => {
		const invalid = { x: new Date(Number.NaN), y: 0 };
		const mixed: NavigationSeries = {
			hidden: false,
			points: [
				{ x: 1 * MINUTE, y: 0 },
				{ x: 2 * MINUTE, y: 0 },
				{ x: 3 * MINUTE, y: 0 },
				invalid,
				{ x: 5 * MINUTE, y: 0 },
				{ x: 6 * MINUTE, y: 0 },
				{ x: 7 * MINUTE, y: 0 }
			]
		};
		expect(nearestPoint([mixed], [6.4, 0], plot, everything)).toEqual({ series: mixed, index: 5 });
	});

	it('skips gaps and lands on the point before them when the pointer is nearer it', () => {
		const gapped = series([0, null, null, 3]);
		expect(nearestPoint([gapped], [1.4, 0], plot, everything)).toEqual({
			series: gapped,
			index: 0
		});
	});

	it('skips gaps and lands on the point after them when the pointer is nearer it', () => {
		const gapped = series([0, null, null, 3]);
		expect(nearestPoint([gapped], [1.6, 0], plot, everything)).toEqual({
			series: gapped,
			index: 3
		});
	});

	it('skips a point with a parseable string x like a gap', () => {
		const mixed = withStringX();
		expect(nearestPoint([mixed], [0.9, 2], plot, everything)).toEqual({ series: mixed, index: 0 });
	});

	it('lands on the placed point nearest the pointer past a string x point', () => {
		const mixed = withStringX();
		expect(nearestPoint([mixed], [1.2, 3], plot, everything)).toEqual({ series: mixed, index: 2 });
	});

	it('skips hidden series', () => {
		const low = series([0, 0, 0]);
		const high = series([10, 10, 10], true);
		expect(nearestPoint([low, high], [1, 10], plot, everything)).toEqual({ series: low, index: 1 });
	});

	it('finds nothing without a visible point', () => {
		expect(nearestPoint([series([null, null])], [0, 0], plot, everything)).toBeUndefined();
	});

	it('finds nothing without a pointer position', () => {
		expect(
			nearestPoint([series([1, 2])], [Number.NaN, Number.NaN], plot, everything)
		).toBeUndefined();
	});
});

describe('firstPoint', () => {
	it('starts at the first drawable point of the first visible series with one', () => {
		const hidden = series([1, 2], true);
		const empty = series([null, null]);
		const gapped = series([null, 5, 6]);
		expect(firstPoint([hidden, empty, gapped], plot, everything)).toEqual({
			series: gapped,
			index: 1
		});
	});

	it('finds nothing when every series is hidden or without a point', () => {
		const hidden = series([1, 2], true);
		const empty = series([null, null]);
		expect(firstPoint([hidden, empty], plot, everything)).toBeUndefined();
	});

	it('starts past a leading point with a parseable string x', () => {
		const leading: NavigationSeries = {
			hidden: false,
			points: [
				{ x: STRING_X, y: 1 },
				{ x: 2 * MINUTE, y: 2 }
			]
		};
		expect(firstPoint([leading], plot, everything)).toEqual({ series: leading, index: 1 });
	});
});

describe('isAvailable', () => {
	it('keeps a drawable point of a visible series', () => {
		const shown = series([1, null]);
		expect(isAvailable([shown], { series: shown, index: 0 }, everything), 'a drawn point').toBe(
			true
		);
	});

	it('drops a gapped point', () => {
		const shown = series([1, null]);
		expect(isAvailable([shown], { series: shown, index: 1 }, everything), 'a gap').toBe(false);
	});

	it('drops an index past the end of the points', () => {
		const shown = series([1, null]);
		expect(isAvailable([shown], { series: shown, index: 2 }, everything), 'past the end').toBe(
			false
		);
	});

	it('drops a point of a hidden series', () => {
		const hidden = series([1], true);
		expect(isAvailable([hidden], { series: hidden, index: 0 }, everything), 'hidden').toBe(false);
	});

	it('drops a point of a removed series', () => {
		const shown = series([1, null]);
		expect(isAvailable([], { series: shown, index: 0 }, everything), 'removed').toBe(false);
	});

	it('drops a point with a parseable string x', () => {
		const mixed = withStringX();
		expect(isAvailable([mixed], { series: mixed, index: 1 }, everything), 'string x').toBe(false);
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
		expect(step([long], { series: long, index: from }, key, plot, everything)).toEqual({
			series: long,
			index: to
		});
	});

	it('pages by at least one point', () => {
		const short = series([1, 2, 3]);
		expect(step([short], { series: short, index: 0 }, 'PageDown', plot, everything).index).toBe(1);
	});

	const gapped = series([null, 1, null, null, 4, null]);

	it.each([
		['ArrowRight', 1, 4],
		['ArrowLeft', 4, 1],
		['Home', 4, 1],
		['End', 1, 4]
	] as const)('steps over gaps with %s from %i to %i', (key, from, to) => {
		expect(step([gapped], { series: gapped, index: from }, key, plot, everything).index).toBe(to);
	});

	it('steps over a point with a parseable string x with ArrowRight', () => {
		const mixed = withStringX();
		expect(step([mixed], { series: mixed, index: 0 }, 'ArrowRight', plot, everything).index).toBe(
			2
		);
	});

	it('steps over a point with a parseable string x with ArrowLeft', () => {
		const mixed = withStringX();
		expect(step([mixed], { series: mixed, index: 2 }, 'ArrowLeft', plot, everything).index).toBe(0);
	});

	it('moves down to the next series at the point nearest in time', () => {
		const top = series([1, 2, 3, 4, 5]);
		const bottom = series([6, 7, 8], false, [0, 2.9, 4]);
		expect(step([top, bottom], { series: top, index: 3 }, 'ArrowDown', plot, everything)).toEqual({
			series: bottom,
			index: 1
		});
	});

	it('moves up to the previous series at the point nearest in time', () => {
		const top = series([1, 2, 3, 4, 5]);
		const bottom = series([6, 7, 8], false, [0, 2.9, 4]);
		expect(step([top, bottom], { series: bottom, index: 1 }, 'ArrowUp', plot, everything)).toEqual({
			series: top,
			index: 3
		});
	});

	it('moves vertically past a point with a parseable string x in the target', () => {
		const top = series([1, 2, 3]);
		const mixed = withStringX();
		expect(step([top, mixed], { series: top, index: 1 }, 'ArrowDown', plot, everything)).toEqual({
			series: mixed,
			index: 0
		});
	});

	const hiddenSkipping = () => {
		const top = series([1, 2]);
		const bottom = series([5, 6]);
		return { top, bottom, all: [top, series([3, 4], true), series([null, null]), bottom] };
	};

	it('skips hidden series and series without a point going down', () => {
		const { top, bottom, all } = hiddenSkipping();
		expect(step(all, { series: top, index: 1 }, 'ArrowDown', plot, everything)).toEqual({
			series: bottom,
			index: 1
		});
	});

	it('skips hidden series and series without a point going up', () => {
		const { top, bottom, all } = hiddenSkipping();
		expect(step(all, { series: bottom, index: 0 }, 'ArrowUp', plot, everything)).toEqual({
			series: top,
			index: 0
		});
	});

	it('stays in the first series on ArrowUp', () => {
		const top = series([1]);
		const bottom = series([2]);
		expect(step([top, bottom], { series: top, index: 0 }, 'ArrowUp', plot, everything).series).toBe(
			top
		);
	});

	it('stays in the last series on ArrowDown', () => {
		const top = series([1]);
		const bottom = series([2]);
		expect(
			step([top, bottom], { series: bottom, index: 0 }, 'ArrowDown', plot, everything).series
		).toBe(bottom);
	});
});

describe('inside the x window', () => {
	const long = series(Array.from({ length: 25 }, (_, index) => index));
	const cut = windowOf(5, 15);

	it('starts first focus on the first point inside', () => {
		expect(firstPoint([long], plot, cut)).toEqual({ series: long, index: 5 });
	});

	it('starts first focus on a point exactly on the window start', () => {
		expect(firstPoint([long], plot, windowOf(3, 4))?.index).toBe(3);
	});

	it('skips a series wholly outside on first focus', () => {
		const outside = series([1, 2], false, [30, 31]);
		expect(firstPoint([outside, long], plot, cut)).toEqual({ series: long, index: 5 });
	});

	it('reads a reversed domain as its ordered ends', () => {
		const reversed = { ...cut, domain: [15 * MINUTE, 5 * MINUTE] } as const;
		expect(firstPoint([long], plot, reversed)?.index).toBe(5);
	});

	it.each([
		['Home', 10, 5],
		['End', 10, 15],
		['ArrowLeft', 5, 5],
		['ArrowRight', 15, 15],
		['ArrowLeft', 6, 5],
		['ArrowRight', 14, 15]
	] as const)('moves %s from %i to %i without leaving the window', (key, from, to) => {
		expect(step([long], { series: long, index: from }, key, plot, cut).index).toBe(to);
	});

	it('pages down within the window only', () => {
		expect(step([long], { series: long, index: 18 }, 'PageDown', plot, windowOf(0, 19)).index).toBe(
			19
		);
	});

	it('pages up within the window only', () => {
		expect(step([long], { series: long, index: 6 }, 'PageUp', plot, windowOf(5, 24)).index).toBe(5);
	});

	it('keeps the point when it is itself outside the window', () => {
		expect(step([long], { series: long, index: 20 }, 'ArrowLeft', plot, cut).index).toBe(20);
	});

	it('picks the inside point when the pointer is at the left plot edge', () => {
		const line = series([0, 0, 0, 0, 0]);
		expect(nearestPoint([line], [0.2, 0], plot, windowOf(1, 3))).toEqual({
			series: line,
			index: 1
		});
	});

	it('picks the inside point when the pointer is at the right plot edge', () => {
		const line = series([0, 0, 0, 0, 0]);
		expect(nearestPoint([line], [3.8, 0], plot, windowOf(1, 3))).toEqual({
			series: line,
			index: 3
		});
	});

	it('finds nothing from a series wholly outside the window', () => {
		const outside = series([0, 0], false, [30, 31]);
		expect(nearestPoint([outside], [30, 0], plot, cut)).toBeUndefined();
	});

	it('lets ArrowDown skip a series wholly outside the window', () => {
		const top = series([1, 2, 3]);
		const outside = series([4, 5], false, [30, 31]);
		const bottom = series([6, 7, 8]);
		expect(
			step([top, outside, bottom], { series: top, index: 1 }, 'ArrowDown', plot, windowOf(0, 2))
		).toEqual({
			series: bottom,
			index: 1
		});
	});

	it('lets ArrowUp skip a series wholly outside the window', () => {
		const top = series([1, 2, 3]);
		const outside = series([4, 5], false, [30, 31]);
		const bottom = series([6, 7, 8]);
		expect(
			step([top, outside, bottom], { series: bottom, index: 1 }, 'ArrowUp', plot, windowOf(0, 2))
		).toEqual({
			series: top,
			index: 1
		});
	});

	it('lets ArrowDown skip a series with points on both sides and none inside', () => {
		const top = series([1, 2, 3]);
		const straddling = series([4, 5], false, [-5, 10]);
		const bottom = series([6, 7, 8]);
		expect(
			step([top, straddling, bottom], { series: top, index: 0 }, 'ArrowDown', plot, windowOf(0, 2))
				.series
		).toBe(bottom);
	});

	it('lets ArrowUp skip a series with points on both sides and none inside', () => {
		const top = series([1, 2, 3]);
		const straddling = series([4, 5], false, [-5, 10]);
		const bottom = series([6, 7, 8]);
		expect(
			step([top, straddling, bottom], { series: bottom, index: 0 }, 'ArrowUp', plot, windowOf(0, 2))
				.series
		).toBe(top);
	});

	it('finds no pointer point in a series with points on both sides and none inside', () => {
		const straddling = series([4, 5], false, [-5, 10]);
		expect(nearestPoint([straddling], [0, 4], plot, windowOf(0, 2))).toBeUndefined();
	});

	it('moves ArrowDown to the target point nearest in time inside the window when the nearest overall is outside', () => {
		const top = series(Array.from({ length: 25 }, (_, index) => index));
		const lower = series([1, 2, 3], false, [4, 7, 30]);
		expect(
			step([top, lower], { series: top, index: 5 }, 'ArrowDown', plot, windowOf(5, 15))
		).toEqual({
			series: lower,
			index: 1
		});
	});

	it('moves ArrowUp to the target point nearest in time inside the window when the nearest overall is outside', () => {
		const upper = series([1, 2, 3], false, [4, 7, 30]);
		const bottom = series(Array.from({ length: 25 }, (_, index) => index));
		expect(
			step([upper, bottom], { series: bottom, index: 5 }, 'ArrowUp', plot, windowOf(5, 15))
		).toEqual({
			series: upper,
			index: 1
		});
	});

	it('counts a point exactly on the window end as inside going to the end', () => {
		const line = series([1, 2, 3, 4]);
		expect(step([line], { series: line, index: 1 }, 'End', plot, windowOf(1, 2)).index).toBe(2);
	});

	it('counts a point exactly on the window start as inside going home', () => {
		const line = series([1, 2, 3, 4]);
		expect(step([line], { series: line, index: 2 }, 'Home', plot, windowOf(1, 2)).index).toBe(1);
	});

	it('keeps a point the window still contains', () => {
		const line = series([1, 2, 3]);
		expect(isAvailable([line], { series: line, index: 2 }, windowOf(0, 2)), 'on the end').toBe(
			true
		);
	});

	it('drops a point past the window end', () => {
		const line = series([1, 2, 3]);
		expect(isAvailable([line], { series: line, index: 2 }, windowOf(0, 1.5)), 'past the end').toBe(
			false
		);
	});

	it('drops a point before the window start', () => {
		const line = series([1, 2, 3]);
		expect(
			isAvailable([line], { series: line, index: 0 }, windowOf(0.5, 2)),
			'before the start'
		).toBe(false);
	});
});

describe('on either x scale direction', () => {
	const line = series([0, 0, 0, 0, 0]);
	const ordered = { x: (time: number) => time / MINUTE, y: (value: number) => value };
	const reversed = { x: (time: number) => 4 - time / MINUTE, y: (value: number) => value };

	it.each([
		[3, 1],
		[3.8, 0],
		[0.9, 3],
		[0.2, 4],
		[2.4, 2]
	] as const)(
		'picks the point under the pointer at %s on a reversed scale as %i',
		(pixel, index) => {
			expect(nearestPoint([line], [pixel, 0], reversed, windowOf(4, 0))).toEqual({
				series: line,
				index
			});
		}
	);

	it.each([
		[1, 1],
		[0.2, 0],
		[3.1, 3],
		[3.8, 4],
		[1.6, 2]
	] as const)(
		'picks the point under the pointer at %s on an ordered scale as %i',
		(pixel, index) => {
			expect(nearestPoint([line], [pixel, 0], ordered, windowOf(0, 4))).toEqual({
				series: line,
				index
			});
		}
	);

	it('skips gaps on a reversed scale', () => {
		const gapped = series([0, null, null, 3, 0]);
		expect(nearestPoint([gapped], [2.6, 0], reversed, windowOf(4, 0))).toEqual({
			series: gapped,
			index: 0
		});
	});

	it('stays inside a reversed window at its edge', () => {
		expect(nearestPoint([line], [3.8, 0], reversed, windowOf(3, 1))).toEqual({
			series: line,
			index: 1
		});
	});

	const long = series(Array.from({ length: 25 }, (_, index) => index));
	const reversedLong = { x: (time: number) => 24 - time / MINUTE, y: (value: number) => value };

	it.each([
		['ArrowRight', 10, 9],
		['ArrowLeft', 10, 11],
		['Home', 10, 24],
		['End', 10, 0],
		['PageDown', 10, 8],
		['PageUp', 10, 12],
		['ArrowRight', 0, 0],
		['ArrowLeft', 24, 24],
		['PageDown', 1, 0],
		['PageUp', 23, 24]
	] as const)('moves %s from %i to %i in screen order on a reversed scale', (key, from, to) => {
		expect(
			step([long], { series: long, index: from }, key, reversedLong, windowOf(24, 0)).index
		).toBe(to);
	});

	it.each([
		['reversed', reversedLong, windowOf(24, 0), 24],
		['ordered', plot, windowOf(0, 24), 0]
	] as const)(
		'starts first focus on the leftmost drawn point with the scale %s',
		(_direction, position, xWindow, index) => {
			expect(firstPoint([long], position, xWindow)).toEqual({ series: long, index });
		}
	);

	it('moves ArrowDown to the point nearest in time on a reversed scale', () => {
		const top = series([1, 2, 3, 4, 5]);
		const bottom = series([6, 7, 8], false, [0, 2.9, 4]);
		expect(
			step([top, bottom], { series: top, index: 3 }, 'ArrowDown', reversed, windowOf(4, 0))
		).toEqual({
			series: bottom,
			index: 1
		});
	});
});

describe('isNavigationKey', () => {
	it('accepts the navigation keys only', () => {
		const keys = ['ArrowUp', 'PageDown', 'Home', 'Escape', 'Enter', 'a', 'toString'];
		expect(keys.filter(isNavigationKey)).toEqual(['ArrowUp', 'PageDown', 'Home']);
	});
});
