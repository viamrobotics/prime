import { describe, expect, it } from 'vitest';
import type { ChartPoint, ChartXValue } from '../point.ts';
import { summarizeFigure } from '../summary.ts';
import { X_SCALES } from '../x-scales.ts';

const MINUTE = 60_000;
const toNumber = X_SCALES.time.toNumber;
const at = (minutes: number) => new Date(minutes * MINUTE);

interface SeriesInput {
	name: string;
	unit?: string;
	hidden?: boolean;
	points: ChartPoint<ChartXValue>[];
}

interface Bounds {
	xMin?: number;
	xMax?: number;
	yMin?: number;
	yMax?: number;
}

const temperature: SeriesInput = {
	name: 'Temperature',
	unit: '°',
	points: [
		{ x: at(0), y: 2 },
		{ x: at(1), y: 8 }
	]
};
const load: SeriesInput = {
	name: 'Load',
	points: [
		{ x: at(0), y: 4 },
		{ x: at(1), y: 6 }
	]
};

function summarize(series: SeriesInput[], window: [number, number], bounds: Bounds = {}) {
	return summarizeFigure({
		series: series.map((entry) => ({
			name: entry.name,
			unit: entry.unit,
			hidden: entry.hidden ?? false,
			points: entry.points
		})),
		xWindow: { domain: [window[0] * MINUTE, window[1] * MINUTE], toNumber },
		xMin: bounds.xMin === undefined ? undefined : bounds.xMin * MINUTE,
		xMax: bounds.xMax === undefined ? undefined : bounds.xMax * MINUTE,
		yMin: bounds.yMin,
		yMax: bounds.yMax,
		formatTime: (value) => `m${value.getTime() / MINUTE}`,
		formatValue: (value) => `${value} u`
	});
}

describe('summarizeFigure', () => {
	it('names the visible series with their units, the time range and the value range', () => {
		const text = summarize([temperature, load], [0, 1]);

		expect(text).toBe('Series: Temperature (°), Load. Time: m0 to m1. Values: 2 u to 8 u.');
	});

	it.each([
		{ kind: 'no series', series: [] },
		{ kind: 'only gaps', series: [{ name: 'Load', points: [{ x: at(0), y: null }] }] },
		{ kind: 'only string x values', series: [{ name: 'Load', points: [{ x: 'cell', y: 1 }] }] }
	])('says "No data." for $kind', ({ series }) => {
		const text = summarize(series, [0, 1]);

		expect(text).toBe('No data.');
	});

	it('says "Every series is hidden." when every series with data is hidden', () => {
		const text = summarize(
			[
				{ ...temperature, hidden: true },
				{ ...load, hidden: true }
			],
			[0, 1]
		);

		expect(text).toBe('Every series is hidden.');
	});

	it('leaves a hidden series out of the labels and both ranges', () => {
		const outlier = { name: 'Outlier', hidden: true, points: [{ x: at(5), y: 100 }] };

		const text = summarize([temperature, outlier], [0, 5]);

		expect(text).toBe('Series: Temperature (°). Time: m0 to m1. Values: 2 u to 8 u.');
	});

	it('leaves a gap out of the time range', () => {
		const withGap = { ...load, points: [...load.points, { x: at(3), y: null }] };

		const text = summarize([withGap], [0, 3]);

		expect(text).toBe('Series: Load. Time: m0 to m1. Values: 4 u to 6 u.');
	});

	it.each([
		{ bounds: { xMin: -1, xMax: 2 }, time: 'Time: m-1 to m2.' },
		{ bounds: { xMin: 0.5 }, time: 'Time: m0.5 to m1.' },
		{ bounds: { xMax: 3 }, time: 'Time: m0 to m3.' }
	])('takes each given x bound over the data in $time', ({ bounds, time }) => {
		const text = summarize([temperature], [-1, 3], bounds);

		expect(text).toBe(`Series: Temperature (°). ${time} Values: 2 u to 8 u.`);
	});

	it('reads the value range from the points inside the x window only', () => {
		const text = summarize([temperature, load], [0.5, 1], { xMin: 0.5, xMax: 1 });

		expect(text).toBe('Series: Temperature (°), Load. Time: m0.5 to m1. Values: 6 u to 8 u.');
	});

	it('drops the value range when no point is inside the x window', () => {
		const text = summarize([temperature], [0.25, 0.75], { xMin: 0.25, xMax: 0.75 });

		expect(text).toBe('Series: Temperature (°). Time: m0.25 to m0.75.');
	});

	it.each([
		{ bounds: { yMin: 0, yMax: 10 }, values: 'Values: 0 u to 10 u.' },
		{ bounds: { yMin: 0 }, values: 'Values: 0 u to 8 u.' },
		{ bounds: { yMax: 10 }, values: 'Values: 2 u to 10 u.' }
	])('takes each given y bound over the data in $values', ({ bounds, values }) => {
		const text = summarize([temperature], [0, 1], bounds);

		expect(text).toBe(`Series: Temperature (°). Time: m0 to m1. ${values}`);
	});
});
