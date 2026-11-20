import { timeValue } from './domain.ts';
import type { ChartPoint, ChartXValue } from './point.ts';

/** A series as point search and key steps read it. */
export interface NavigationSeries {
	readonly hidden: boolean;
	readonly points: readonly ChartPoint<ChartXValue>[];
}

/** One point of one series: the series and the point's index in its `points`. */
export interface ActivePoint<TSeries extends NavigationSeries = NavigationSeries> {
	readonly series: TSeries;
	readonly index: number;
}

/** Maps a time in epoch milliseconds and a value to plot-area pixels. */
export interface PlotPosition {
	x: (time: number) => number;
	y: (value: number) => number;
}

/** A key that moves the active point. */
export type NavigationKey =
	| 'ArrowLeft'
	| 'ArrowRight'
	| 'ArrowUp'
	| 'ArrowDown'
	| 'Home'
	| 'End'
	| 'PageUp'
	| 'PageDown';

type Step = <TSeries extends NavigationSeries>(
	series: readonly TSeries[],
	active: ActivePoint<TSeries>
) => ActivePoint<TSeries>;

const PAGE_FRACTION = 10;

const isDrawable = (point: ChartPoint<ChartXValue> | undefined): boolean =>
	point !== undefined &&
	point.y !== null &&
	Number.isFinite(point.y) &&
	Number.isFinite(timeValue(point.x));

const drawableIndices = (points: readonly ChartPoint<ChartXValue>[]): number[] =>
	points.flatMap((point, index) => (isDrawable(point) ? [index] : []));

const hasPoint = (series: NavigationSeries): boolean =>
	!series.hidden && series.points.some((point) => isDrawable(point));

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));

// Binary search for the first point at or after `target`, then a walk outward past gaps.
function nearestIndex(
	points: readonly ChartPoint<ChartXValue>[],
	target: number,
	position: (point: ChartPoint<ChartXValue>) => number
): number | undefined {
	let low = 0;
	let high = points.length;
	while (low < high) {
		const middle = (low + high) >>> 1;
		if (position(points[middle]) < target) low = middle + 1;
		else high = middle;
	}
	let before = low - 1;
	while (before >= 0 && !isDrawable(points[before])) before -= 1;
	let after = low;
	while (after < points.length && !isDrawable(points[after])) after += 1;

	const candidates = [before, after].filter((index) => index >= 0 && index < points.length);
	let best: number | undefined;
	for (const index of candidates) {
		const distance = Math.abs(position(points[index]) - target);
		if (best === undefined || distance < Math.abs(position(points[best]) - target)) best = index;
	}
	return best;
}

/** Whether `active` still names a drawable point of a visible series in `series`. */
export function isAvailable<TSeries extends NavigationSeries>(
	series: readonly TSeries[],
	active: ActivePoint<TSeries>
): boolean {
	return (
		series.includes(active.series) &&
		!active.series.hidden &&
		isDrawable(active.series.points[active.index])
	);
}

/** The first drawable point of the first visible series that has one. */
export function firstPoint<TSeries extends NavigationSeries>(
	series: readonly TSeries[]
): ActivePoint<TSeries> | undefined {
	const first = series.find(hasPoint);
	if (!first) return undefined;
	return { series: first, index: drawableIndices(first.points)[0] };
}

/**
 * The visible point nearest a plot-area pointer position. Each series contributes its point
 * nearest in x, and the closest of those by pixel distance wins. Gaps and hidden series are skipped.
 */
export function nearestPoint<TSeries extends NavigationSeries>(
	series: readonly TSeries[],
	[pointerX, pointerY]: readonly [number, number],
	plot: PlotPosition
): ActivePoint<TSeries> | undefined {
	if (!Number.isFinite(pointerX) || !Number.isFinite(pointerY)) return undefined;
	let best: ActivePoint<TSeries> | undefined;
	let bestDistance = Infinity;
	for (const entry of series) {
		if (entry.hidden) continue;
		const index = nearestIndex(entry.points, pointerX, (point) => plot.x(timeValue(point.x)));
		if (index === undefined) continue;
		const point = entry.points[index];
		const distance = Math.hypot(
			plot.x(timeValue(point.x)) - pointerX,
			plot.y(point.y ?? Number.NaN) - pointerY
		);
		if (distance < bestDistance) {
			best = { series: entry, index };
			bestDistance = distance;
		}
	}
	return best;
}

const pageSize = (count: number) => Math.max(1, Math.floor(count / PAGE_FRACTION));

function along(offset: (position: number, count: number) => number): Step {
	return (_series, active) => {
		const drawable = drawableIndices(active.series.points);
		const position = drawable.indexOf(active.index);
		if (position < 0) return active;
		const next = clamp(offset(position, drawable.length), 0, drawable.length - 1);
		return { series: active.series, index: drawable[next] };
	};
}

function across(direction: -1 | 1): Step {
	return (series, active) => {
		const visible = series.filter(hasPoint);
		const target = visible[visible.indexOf(active.series) + direction];
		const point = active.series.points[active.index];
		if (!target || !point) return active;
		const index = nearestIndex(target.points, timeValue(point.x), (entry) => timeValue(entry.x));
		if (index === undefined) return active;
		return { series: target, index };
	};
}

const STEPS: Record<NavigationKey, Step> = {
	ArrowLeft: along((position) => position - 1),
	ArrowRight: along((position) => position + 1),
	Home: along(() => 0),
	End: along((_position, count) => count - 1),
	PageUp: along((position, count) => position - pageSize(count)),
	PageDown: along((position, count) => position + pageSize(count)),
	ArrowUp: across(-1),
	ArrowDown: across(1)
};

/** Whether `key` is a `KeyboardEvent.key` that moves the active point. */
export const isNavigationKey = (key: string): key is NavigationKey => Object.hasOwn(STEPS, key);

/**
 * The point `key` moves to from `active`. Left and right step one point, Home and End go to
 * the ends of the series, and PageUp and PageDown step a tenth of the series, at least one.
 * Up and down go to the previous or next visible series, at its point nearest in time.
 * Gaps and hidden series are skipped. At an end, the point stays.
 */
export function step<TSeries extends NavigationSeries>(
	series: readonly TSeries[],
	active: ActivePoint<TSeries>,
	key: NavigationKey
): ActivePoint<TSeries> {
	return STEPS[key](series, active);
}
