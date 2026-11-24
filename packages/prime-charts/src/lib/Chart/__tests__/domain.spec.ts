import { describe, expect, it } from 'vitest';
import { domainPoints, hasData, xDomain, yDomain } from '../domain.ts';
import { X_SCALES } from '../x-scales.ts';

const toNumber = X_SCALES.time.toNumber;

const point = (x: number, y: number | null) => ({ x: new Date(x), y });

const ISO_X = '2026-01-01T00:00:00Z';
const isoPoint = (y: number) => ({ x: ISO_X, y });

describe('xDomain', () => {
	it('takes x exactly from the data', () => {
		expect(xDomain([point(5, 1), point(9, 2)], toNumber)).toEqual([5, 9]);
	});

	it('takes x exactly from bounds', () => {
		expect(xDomain([point(5, 1), point(9, 2)], toNumber, 0, new Date(20))).toEqual([0, 20]);
	});

	it('gives a parseable string x no x domain contribution on the time scale', () => {
		const points = [point(5, 1), { x: ISO_X, y: 2 }, point(9, 3)];

		expect(xDomain(points, toNumber)).toEqual([5, 9]);
	});

	it('converts a Date and epoch milliseconds alike in data', () => {
		const points = [
			{ x: 4, y: 1 },
			{ x: new Date(8), y: 2 }
		];

		expect(xDomain(points, toNumber)).toEqual([4, 8]);
	});

	it('converts a Date and epoch milliseconds alike in bounds', () => {
		expect(xDomain([point(5, 1), point(9, 2)], toNumber, new Date(1), 12)).toEqual([1, 12]);
	});

	it('widens a single x value', () => {
		expect(xDomain([point(3, 5)], toNumber)).toEqual([2, 4]);
	});

	it('keeps a given x pair with equal ends as given', () => {
		expect(xDomain([point(4, 1), point(5, 1), point(6, 1)], toNumber, 5, 5)).toEqual([5, 5]);
	});

	it.each([
		['minimum', new Date(5), undefined, [5, 6]],
		['maximum', undefined, new Date(5), [4, 5]]
	] as const)(
		'widens only the data end when a given %s equals it',
		(_bound, min, max, expected) => {
			expect(xDomain([point(5, 1)], toNumber, min, max)).toEqual(expected);
		}
	);

	it('falls back to the unit domain for no points', () => {
		expect(xDomain([], toNumber)).toEqual([0, 1]);
	});
});

describe('yDomain', () => {
	it('rounds the data y domain out to ticks', () => {
		expect(yDomain([point(0, 2.3), point(1, 7.1)], toNumber)).toEqual([2, 7.5]);
	});

	it('uses a given y minimum exactly and rounds only the data end', () => {
		expect(yDomain([point(0, 2.3), point(1, 7.1)], toNumber, 0.5)).toEqual([0.5, 7.5]);
	});

	it('uses a given y maximum exactly and rounds only the data end', () => {
		expect(yDomain([point(0, 2.3), point(1, 7.1)], toNumber, undefined, 7.7)).toEqual([2, 7.7]);
	});

	it('ignores a null y', () => {
		expect(yDomain([point(0, null), point(1, 4), point(2, 6)], toNumber)).toEqual([4, 6]);
	});

	it('ignores an infinite y', () => {
		const points = [point(0, Number.POSITIVE_INFINITY), point(1, 4), point(2, 6)];

		expect(yDomain(points, toNumber)).toEqual([4, 6]);
	});

	it('widens a single y value', () => {
		expect(yDomain([point(3, 5)], toNumber)).toEqual([4, 6]);
	});

	it('keeps a given y pair with equal ends as given', () => {
		expect(yDomain([], toNumber, 5, 5)).toEqual([5, 5]);
	});

	it.each([
		['minimum', 6, undefined, [6, 7]],
		['maximum', undefined, 4, [3, 4]]
	] as const)(
		'widens only the data end when a given %s equals it',
		(_bound, min, max, expected) => {
			expect(yDomain([point(0, 5)], toNumber, min, max)).toEqual(expected);
		}
	);

	it('falls back to the unit domain for no points', () => {
		expect(yDomain([], toNumber)).toEqual([0, 1]);
	});

	it('does not stretch the y domain for a point with a parseable string x', () => {
		expect(yDomain([point(0, 2), point(1, 6), isoPoint(900)], toNumber)).toEqual([2, 6]);
	});

	it('does not stretch the y domain for a point with an invalid Date x', () => {
		const invalid = { x: new Date(Number.NaN), y: 900 };

		expect(yDomain([point(0, 2), point(1, 6), invalid], toNumber)).toEqual([2, 6]);
	});
});

describe('domainPoints', () => {
	it('reads only visible series', () => {
		const a = { hidden: true, points: [point(0, 1)] };
		const b = { hidden: false, points: [point(1, 2)] };

		expect(domainPoints([a, b])).toEqual([point(1, 2)]);
	});

	it('reads every series in order when all are hidden', () => {
		const a = { hidden: true, points: [point(0, 1)] };
		const b = { hidden: true, points: [point(1, 2)] };

		expect(domainPoints([b, a])).toEqual([point(1, 2), point(0, 1)]);
	});
});

describe('hasData', () => {
	it('is false for no series', () => {
		expect(hasData([], toNumber), 'no series means no data').toBe(false);
	});

	it('is false for a series of only null y values', () => {
		const gaps = [{ hidden: false, points: [point(0, null)] }];

		expect(hasData(gaps, toNumber), 'a gap is not data').toBe(false);
	});

	it.each([Number.NaN, Number.POSITIVE_INFINITY])(
		'is false for a series of only y values of %s',
		(yValue) => {
			const unplaced = [{ hidden: false, points: [point(0, yValue)] }];

			expect(hasData(unplaced, toNumber), 'a non-finite y is not data').toBe(false);
		}
	);

	it('is true for a hidden series with a point', () => {
		const hidden = [{ hidden: true, points: [point(0, 1)] }];

		expect(hasData(hidden, toNumber), 'a hidden series still holds data').toBe(true);
	});

	it('is false for a series whose every x is a parseable string', () => {
		const strings = [{ hidden: false, points: [isoPoint(1), isoPoint(2)] }];

		expect(hasData(strings, toNumber), 'the time scale places no string x').toBe(false);
	});

	it('is true for a series with one placed point among string x points', () => {
		const mixed = [{ hidden: false, points: [isoPoint(1), point(0, 2)] }];

		expect(hasData(mixed, toNumber), 'one placed point is data').toBe(true);
	});
});
