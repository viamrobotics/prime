import type { ChartPoint, ChartXValue } from './point.ts';
import { isInsideWindow, isPlaced, type XWindow } from './x-scales.ts';

interface TableRow {
	readonly time: number;
	readonly values: readonly (number | undefined)[];
}

interface TableSeries {
	readonly points: readonly ChartPoint<ChartXValue>[];
}

// Rows are the distinct placed x values inside the window, ascending. A series' first point at an x wins.
export function mergeSeriesRows(series: readonly TableSeries[], xWindow: XWindow): TableRow[] {
	const { toNumber } = xWindow;
	const byTime = new Map<number, (number | undefined)[]>();

	series.forEach((entry, seriesIndex) => {
		for (const point of entry.points) {
			if (point.y === null || !isPlaced(point, toNumber)) continue;
			const time = toNumber(point.x);
			if (!isInsideWindow(time, xWindow)) continue;
			const values =
				byTime.get(time) ?? new Array<number | undefined>(series.length).fill(undefined);
			byTime.set(time, values);
			values[seriesIndex] ??= point.y;
		}
	});

	return [...byTime.entries()]
		.sort(([first], [second]) => first - second)
		.map(([time, values]) => ({ time, values }));
}
