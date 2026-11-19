import type { ChartXValue } from './point.ts';

const EMPTY_DOMAIN: [number, number] = [0, 1];

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
