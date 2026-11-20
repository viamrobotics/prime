import { describe, expect, it } from 'vitest';
import { domainPoints, hasData, xDomain, yDomain } from '../domain.ts';

const point = (x: number, y: number | null) => ({ x: new Date(x), y });

describe('domains', () => {
	it('rounds the data y domain out to ticks', () => {
		expect(yDomain([point(0, 2.3), point(1, 7.1)])).toEqual([2, 7.5]);
	});

	it('uses a given y bound exactly and rounds only the data end', () => {
		expect(yDomain([point(0, 2.3), point(1, 7.1)], 0.5)).toEqual([0.5, 7.5]);
		expect(yDomain([point(0, 2.3), point(1, 7.1)], undefined, 7.7)).toEqual([2, 7.7]);
	});

	it('ignores a null y', () => {
		expect(yDomain([point(0, null), point(1, 4), point(2, 6)])).toEqual([4, 6]);
	});

	it('takes x exactly from the data and from bounds', () => {
		expect(xDomain([point(5, 1), point(9, 2)])).toEqual([5, 9]);
		expect(xDomain([point(5, 1), point(9, 2)], 0, new Date(20))).toEqual([0, 20]);
	});

	it('widens a single value and falls back for no points without NaN', () => {
		expect(yDomain([point(3, 5)])).toEqual([4, 6]);
		expect(xDomain([point(3, 5)])).toEqual([2, 4]);
		expect(xDomain([])).toEqual([0, 1]);
		expect(yDomain([])).toEqual([0, 1]);
		expect(yDomain([], 5, 5).some(Number.isNaN)).toBe(false);
	});

	it('reads every series when all are hidden', () => {
		const a = { hidden: true, points: [point(0, 1)] };
		const b = { hidden: false, points: [point(1, 2)] };
		expect(domainPoints([a, b])).toEqual(b.points);
		expect(domainPoints([{ ...b, hidden: true }, a])).toHaveLength(2);
	});

	it('has data only with a non-null point', () => {
		expect(hasData([])).toBe(false);
		expect(hasData([{ hidden: false, points: [point(0, null)] }])).toBe(false);
		expect(hasData([{ hidden: true, points: [point(0, 1)] }])).toBe(true);
	});
});
