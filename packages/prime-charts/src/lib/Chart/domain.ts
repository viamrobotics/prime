import { scaleLinear } from 'd3-scale';
import type { ChartPoint, ChartXValue } from './point.ts';
import { isPlaced, type XToNumber } from './x-scales.ts';

const EMPTY_DOMAIN: [number, number] = [0, 1];
const COLLAPSED_DOMAIN_PADDING = 1;

function extent(values: Iterable<number>): [number, number] {
	let min = Infinity;
	let max = -Infinity;
	for (const value of values) {
		if (!Number.isFinite(value)) continue;
		if (value < min) min = value;
		if (value > max) max = value;
	}
	if (min > max) return EMPTY_DOMAIN;
	return [min, max];
}

interface DomainSeries {
	readonly hidden: boolean;
	readonly points: readonly ChartPoint<ChartXValue>[];
}

// Hidden series keep the axes put, so with none visible the domain reads every series.
export function domainPoints(series: readonly DomainSeries[]): ChartPoint<ChartXValue>[] {
	const visible = series.filter((entry) => !entry.hidden);
	return (visible.length > 0 ? visible : series).flatMap((entry) => entry.points);
}

export const hasData = (series: readonly DomainSeries[], toNumber: XToNumber): boolean =>
	series.some((entry) => entry.points.some((point) => isPlaced(point, toNumber)));

// A single value would collapse the scale, so an end from the data is widened to keep a lone
// point inside the plot. A given end stays where it was given.
function widen(
	[min, max]: [number, number],
	isMinGiven = false,
	isMaxGiven = false
): [number, number] {
	if (min !== max) return [min, max];
	return [
		isMinGiven ? min : min - COLLAPSED_DOMAIN_PADDING,
		isMaxGiven ? max : max + COLLAPSED_DOMAIN_PADDING
	];
}

export function xDomain(
	points: readonly ChartPoint<ChartXValue>[],
	toNumber: XToNumber,
	min?: Date | number,
	max?: Date | number
): [number, number] {
	const [dataMin, dataMax] = extent(points.map((point) => toNumber(point.x)));
	const lower = min === undefined ? dataMin : toNumber(min);
	const upper = max === undefined ? dataMax : toNumber(max);
	return widen([lower, upper], min !== undefined, max !== undefined);
}

// `tickCount` is the y axis's tick count, so a niced end lands on a drawn tick.
export function yDomain(
	points: readonly ChartPoint<ChartXValue>[],
	toNumber: XToNumber,
	min?: number,
	max?: number,
	tickCount?: number
): [number, number] {
	const values = points.flatMap((point) =>
		point.y !== null && isPlaced(point, toNumber) ? [point.y] : []
	);
	const [dataMin, dataMax] = widen(extent(values));
	const [niceMin, niceMax] = scaleLinear().domain([dataMin, dataMax]).nice(tickCount).domain();
	return widen([min ?? niceMin, max ?? niceMax], min !== undefined, max !== undefined);
}
