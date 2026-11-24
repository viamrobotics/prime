import { scaleTime } from 'd3-scale';
import type { ChartPoint, ChartXValue } from './point.ts';
import type { ChartScale } from './scale.ts';

// Places a point's x on its scale kind. An x the kind does not take is `NaN`, and drops like a gap.
export type XToNumber = (value: ChartXValue) => number;

// Typed without d3's types, so the published declarations never import an untyped d3 module.
interface XScaleKind {
	readonly scale: () => (value: number) => number;
	readonly toNumber: XToNumber;
}

const timeToNumber: XToNumber = (value) => {
	if (value instanceof Date) return value.getTime();
	if (typeof value === 'number') return value;
	return Number.NaN;
};

export const X_SCALES: Readonly<Record<ChartScale, XScaleKind>> = {
	time: { scale: scaleTime, toNumber: timeToNumber }
};

export const isPlaced = (point: ChartPoint<ChartXValue>, toNumber: XToNumber): boolean =>
	point.y !== null && Number.isFinite(point.y) && Number.isFinite(toNumber(point.x));

// The drawn x domain on the scale's numbers, in either order, and the converter onto them.
export interface XWindow {
	readonly domain: readonly [number, number];
	readonly toNumber: XToNumber;
}

// The domain may run either way, so its ends are ordered before the inclusive comparison.
export function isInsideWindow(x: number, xWindow: XWindow): boolean {
	const [start, end] = xWindow.domain;
	return x >= Math.min(start, end) && x <= Math.max(start, end);
}
