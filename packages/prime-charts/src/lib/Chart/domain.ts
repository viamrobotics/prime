import { scaleLinear } from 'd3-scale';
import type { ChartPoint, ChartXValue } from './point.ts';

const EMPTY_DOMAIN: [number, number] = [0, 1];
const COLLAPSED_DOMAIN_PADDING = 1;

export const timeValue = (x: ChartXValue): number => new Date(x).getTime();

export function extent(values: Iterable<number>): [number, number] {
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

export const hasData = (series: readonly DomainSeries[]): boolean =>
	series.some((entry) => entry.points.some((point) => point.y !== null));

// A single value would collapse the scale, so it is widened to keep a lone point inside the plot.
function widen([min, max]: [number, number]): [number, number] {
	if (min === max) return [min - COLLAPSED_DOMAIN_PADDING, max + COLLAPSED_DOMAIN_PADDING];
	return [min, max];
}

export function xDomain(
	points: readonly ChartPoint<ChartXValue>[],
	min?: Date | number,
	max?: Date | number
): [number, number] {
	const [dataMin, dataMax] = extent(points.map((point) => timeValue(point.x)));
	const lower = min === undefined ? dataMin : timeValue(min);
	const upper = max === undefined ? dataMax : timeValue(max);
	return widen([lower, upper]);
}

// `tickCount` is the y axis's tick count, so a niced end lands on a drawn tick.
export function yDomain(
	points: readonly ChartPoint<ChartXValue>[],
	min?: number,
	max?: number,
	tickCount?: number
): [number, number] {
	const values = points.flatMap((point) => (point.y === null ? [] : [point.y]));
	const [dataMin, dataMax] = widen(extent(values));
	const [niceMin, niceMax] = scaleLinear().domain([dataMin, dataMax]).nice(tickCount).domain();
	return widen([min ?? niceMin, max ?? niceMax]);
}
