import type { ChartPoint, ChartXValue } from './point.ts';
import { isInsideWindow, isPlaced, type XWindow } from './x-scales.ts';

export interface NavigationSeries {
	readonly hidden: boolean;
	readonly points: readonly ChartPoint<ChartXValue>[];
}

export interface ActivePoint<TSeries extends NavigationSeries = NavigationSeries> {
	readonly series: TSeries;
	readonly index: number;
}

// Maps an x on the scale's numbers and a value to plot-area pixels.
export interface PlotPosition {
	x: (value: number) => number;
	y: (value: number) => number;
}

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
	active: ActivePoint<TSeries>,
	xWindow: XWindow,
	direction: Direction
) => ActivePoint<TSeries>;

const PAGES_PER_SERIES = 10;

function isDrawable(point: ChartPoint<ChartXValue> | undefined, xWindow: XWindow): boolean {
	if (point === undefined || !isPlaced(point, xWindow.toNumber)) return false;
	return isInsideWindow(xWindow.toNumber(point.x), xWindow);
}

const drawableIndices = (points: readonly ChartPoint<ChartXValue>[], xWindow: XWindow): number[] =>
	points.flatMap((point, index) => (isDrawable(point, xWindow) ? [index] : []));

const hasPoint = (series: NavigationSeries, xWindow: XWindow): boolean =>
	!series.hidden && series.points.some((point) => isDrawable(point, xWindow));

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));

// Which way positions run as x rises. Pixels fall on a reversed domain, and on a reversed range.
type Direction = 1 | -1;

const ASCENDING: Direction = 1;
const DESCENDING: Direction = -1;

function pixelDirection(plot: PlotPosition, xWindow: XWindow): Direction {
	const [start, end] = xWindow.domain;
	return Math.sign(plot.x(end) - plot.x(start)) === Math.sign(end - start) ? ASCENDING : DESCENDING;
}

// Binary search, over the points whose x the scale can place, in x order, for the first not
// before `target` in `direction`, then a walk outward past gaps.
function nearestIndex(
	points: readonly ChartPoint<ChartXValue>[],
	target: number,
	position: (point: ChartPoint<ChartXValue>) => number,
	direction: Direction,
	xWindow: XWindow
): number | undefined {
	const placed = points.flatMap((point, index) =>
		Number.isFinite(xWindow.toNumber(point.x)) ? [index] : []
	);
	const isBeforeTarget = (index: number) => (position(points[index]) - target) * direction < 0;
	let low = 0;
	let high = placed.length;
	while (low < high) {
		const middle = (low + high) >>> 1;
		if (isBeforeTarget(placed[middle])) low = middle + 1;
		else high = middle;
	}
	const split = low < placed.length ? placed[low] : points.length;
	let before = split - 1;
	while (before >= 0 && !isDrawable(points[before], xWindow)) before -= 1;
	let after = split;
	while (after < points.length && !isDrawable(points[after], xWindow)) after += 1;

	const candidates = [before, after].filter((index) => index >= 0 && index < points.length);
	let best: number | undefined;
	for (const index of candidates) {
		const distance = Math.abs(position(points[index]) - target);
		if (best === undefined || distance < Math.abs(position(points[best]) - target)) best = index;
	}
	return best;
}

// Whether `active` still names a drawable point of a visible series in `series`.
export function isAvailable<TSeries extends NavigationSeries>(
	series: readonly TSeries[],
	active: ActivePoint<TSeries>,
	xWindow: XWindow
): boolean {
	return (
		series.includes(active.series) &&
		!active.series.hidden &&
		isDrawable(active.series.points[active.index], xWindow)
	);
}

// Left to right as drawn, so first focus and the horizontal keys follow the screen on either axis direction.
const inScreenOrder = (indices: number[], direction: Direction): number[] =>
	direction === ASCENDING ? indices : [...indices].reverse();

// The leftmost drawn point of the first visible series that has one, the point `Home` reaches.
export function firstPoint<TSeries extends NavigationSeries>(
	series: readonly TSeries[],
	plot: PlotPosition,
	xWindow: XWindow
): ActivePoint<TSeries> | undefined {
	const first = series.find((entry) => hasPoint(entry, xWindow));
	if (!first) return undefined;
	const drawable = drawableIndices(first.points, xWindow);
	return { series: first, index: inScreenOrder(drawable, pixelDirection(plot, xWindow))[0] };
}

// Each series contributes its point nearest in x, and the closest of those by pixel distance wins.
export function nearestPoint<TSeries extends NavigationSeries>(
	series: readonly TSeries[],
	[pointerX, pointerY]: readonly [number, number],
	plot: PlotPosition,
	xWindow: XWindow
): ActivePoint<TSeries> | undefined {
	if (!Number.isFinite(pointerX) || !Number.isFinite(pointerY)) return undefined;
	const direction = pixelDirection(plot, xWindow);
	let best: ActivePoint<TSeries> | undefined;
	let bestDistance = Infinity;
	for (const entry of series) {
		if (entry.hidden) continue;
		const index = nearestIndex(
			entry.points,
			pointerX,
			(point) => plot.x(xWindow.toNumber(point.x)),
			direction,
			xWindow
		);
		if (index === undefined) continue;
		const point = entry.points[index];
		const distance = Math.hypot(
			plot.x(xWindow.toNumber(point.x)) - pointerX,
			plot.y(point.y ?? Number.NaN) - pointerY
		);
		if (distance < bestDistance) {
			best = { series: entry, index };
			bestDistance = distance;
		}
	}
	return best;
}

const pageSize = (count: number) => Math.max(1, Math.floor(count / PAGES_PER_SERIES));

function along(offset: (position: number, count: number) => number): Step {
	return (_series, active, xWindow, direction) => {
		const drawable = inScreenOrder(drawableIndices(active.series.points, xWindow), direction);
		const position = drawable.indexOf(active.index);
		if (position < 0) return active;
		const next = clamp(offset(position, drawable.length), 0, drawable.length - 1);
		return { series: active.series, index: drawable[next] };
	};
}

function across(direction: -1 | 1): Step {
	return (series, active, xWindow) => {
		const visible = series.filter((entry) => hasPoint(entry, xWindow));
		const target = visible[visible.indexOf(active.series) + direction];
		const point = active.series.points[active.index];
		if (!target || !point) return active;
		const index = nearestIndex(
			target.points,
			xWindow.toNumber(point.x),
			(entry) => xWindow.toNumber(entry.x),
			ASCENDING,
			xWindow
		);
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

export const isNavigationKey = (key: string): key is NavigationKey => Object.hasOwn(STEPS, key);

export function step<TSeries extends NavigationSeries>(
	series: readonly TSeries[],
	active: ActivePoint<TSeries>,
	key: NavigationKey,
	plot: PlotPosition,
	xWindow: XWindow
): ActivePoint<TSeries> {
	return STEPS[key](series, active, xWindow, pixelDirection(plot, xWindow));
}
