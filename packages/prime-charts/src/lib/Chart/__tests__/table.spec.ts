import { describe, expect, it } from 'vitest';
import { mergeSeriesRows } from '../table.ts';
import { X_SCALES } from '../x-scales.ts';

const MINUTE = 60_000;
const toNumber = X_SCALES.time.toNumber;
const at = (minutes: number) => new Date(minutes * MINUTE);
const windowOf = (from: number, to: number) => ({
	domain: [from * MINUTE, to * MINUTE] as const,
	toNumber
});

describe('mergeSeriesRows', () => {
	it('merges the series on x and leaves undefined where a series has no point', () => {
		const series = [
			{
				points: [
					{ x: at(0), y: 1 },
					{ x: at(1), y: 2 }
				]
			},
			{
				points: [
					{ x: at(0), y: 10 },
					{ x: at(2), y: 30 }
				]
			}
		];

		const rows = mergeSeriesRows(series, windowOf(0, 2));

		expect(rows).toEqual([
			{ time: 0, values: [1, 10] },
			{ time: MINUTE, values: [2, undefined] },
			{ time: 2 * MINUTE, values: [undefined, 30] }
		]);
	});

	it('orders the rows by ascending x whatever the point order', () => {
		const series = [
			{
				points: [
					{ x: at(2), y: 3 },
					{ x: at(0), y: 1 }
				]
			}
		];

		const rows = mergeSeriesRows(series, windowOf(0, 2));

		expect(rows).toEqual([
			{ time: 0, values: [1] },
			{ time: 2 * MINUTE, values: [3] }
		]);
	});

	it('keeps the first point of a series at a repeated x', () => {
		const series = [
			{
				points: [
					{ x: at(0), y: 1 },
					{ x: at(0), y: 9 }
				]
			}
		];

		const rows = mergeSeriesRows(series, windowOf(0, 1));

		expect(rows).toEqual([{ time: 0, values: [1] }]);
	});

	it.each([
		{ kind: 'a gap', point: { x: at(1), y: null } },
		{ kind: 'a non-finite y', point: { x: at(1), y: Infinity } },
		{ kind: 'a string x', point: { x: 'cell', y: 2 } },
		{ kind: 'an invalid Date', point: { x: new Date(Number.NaN), y: 2 } }
	])('makes no row for $kind', ({ point }) => {
		const series = [{ points: [{ x: at(0), y: 1 }, point] }];

		const rows = mergeSeriesRows(series, windowOf(0, 2));

		expect(rows).toEqual([{ time: 0, values: [1] }]);
	});

	it.each([
		{ order: 'ascending', from: 1, to: 2 },
		{ order: 'descending', from: 2, to: 1 }
	])('keeps the points on an $order window bound and drops those outside', ({ from, to }) => {
		const series = [{ points: [0, 1, 2, 3].map((minute) => ({ x: at(minute), y: minute })) }];

		const rows = mergeSeriesRows(series, windowOf(from, to));

		expect(rows).toEqual([
			{ time: MINUTE, values: [1] },
			{ time: 2 * MINUTE, values: [2] }
		]);
	});

	it('gives no rows for no series', () => {
		const rows = mergeSeriesRows([], windowOf(0, 1));

		expect(rows).toEqual([]);
	});
});
