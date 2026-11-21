import { describe, expect, it } from 'vitest';
import { domainPoints, hasData, xDomain, yDomain } from '../domain.ts';
import { X_SCALES } from '../x-scales.ts';

const toNumber = X_SCALES.time.toNumber;

const point = (x: number, y: number | null) => ({ x: new Date(x), y });

const ISO_X = '2026-01-01T00:00:00Z';
const isoPoint = (y: number) => ({ x: ISO_X, y });

describe('domains', () => {
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

	it('widens a single y value', () => {
		expect(yDomain([point(3, 5)], toNumber)).toEqual([4, 6]);
	});

	it('keeps a given x pair with equal ends as given', () => {
		expect(xDomain([point(4, 1), point(5, 1), point(6, 1)], toNumber, 5, 5)).toEqual([5, 5]);
	});

	it('widens only the data end of x when a given bound equals it', () => {
		expect(xDomain([point(5, 1)], toNumber, new Date(5))).toEqual([5, 6]);
		expect(xDomain([point(5, 1)], toNumber, undefined, new Date(5))).toEqual([4, 5]);
	});

	it('keeps a given y pair with equal ends as given', () => {
		expect(yDomain([], toNumber, 5, 5)).toEqual([5, 5]);
	});

	it('widens only the data end of y when a given bound equals it', () => {
		expect(yDomain([point(0, 5)], toNumber, 6)).toEqual([6, 7]);
		expect(yDomain([point(0, 5)], toNumber, undefined, 4)).toEqual([3, 4]);
	});

	it('falls back to the unit domain for no points', () => {
		expect(xDomain([], toNumber)).toEqual([0, 1]);
		expect(yDomain([], toNumber)).toEqual([0, 1]);
	});

	it('gives no NaN for equal y bounds with no points', () => {
		expect(yDomain([], toNumber, 5, 5).some(Number.isNaN)).toBe(false);
	});

	it('does not stretch the y domain for a point with a parseable string x', () => {
		expect(yDomain([point(0, 2), point(1, 6), isoPoint(900)], toNumber)).toEqual([2, 6]);
	});

	it('does not stretch the y domain for a point with an invalid Date x', () => {
		const invalid = { x: new Date(Number.NaN), y: 900 };
		expect(yDomain([point(0, 2), point(1, 6), invalid], toNumber)).toEqual([2, 6]);
	});

	it('reads only visible series for the domain points', () => {
		const a = { hidden: true, points: [point(0, 1)] };
		const b = { hidden: false, points: [point(1, 2)] };
		expect(domainPoints([a, b])).toEqual(b.points);
	});

	it('reads every series for the domain points when all are hidden', () => {
		const a = { hidden: true, points: [point(0, 1)] };
		const b = { hidden: true, points: [point(1, 2)] };
		expect(domainPoints([b, a])).toHaveLength(2);
	});
});

describe('hasData', () => {
	it('is false for no series', () => {
		expect(hasData([], toNumber)).toBe(false);
	});

	it('is false for a series of only null y values', () => {
		expect(hasData([{ hidden: false, points: [point(0, null)] }], toNumber)).toBe(false);
	});

	it('is true for a hidden series with a point', () => {
		expect(hasData([{ hidden: true, points: [point(0, 1)] }], toNumber)).toBe(true);
	});

	it('is false for a series whose every x is a parseable string', () => {
		expect(hasData([{ hidden: false, points: [isoPoint(1), isoPoint(2)] }], toNumber)).toBe(false);
	});

	it('is true for a series with one placed point among string x points', () => {
		expect(hasData([{ hidden: false, points: [isoPoint(1), point(0, 2)] }], toNumber)).toBe(true);
	});
});
