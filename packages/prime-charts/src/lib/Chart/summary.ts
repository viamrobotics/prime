import { hasData } from './domain.ts';
import { seriesLabel } from './formats.ts';
import type { ChartPoint, ChartXValue } from './point.ts';
import { isInsideWindow, isPlaced, type XToNumber, type XWindow } from './x-scales.ts';

interface SummarySeries {
	readonly name: string;
	readonly unit: string | undefined;
	readonly hidden: boolean;
	readonly points: readonly ChartPoint<ChartXValue>[];
}

interface SummaryInput {
	readonly series: readonly SummarySeries[];
	readonly xWindow: XWindow;
	readonly xMin: Date | number | undefined;
	readonly xMax: Date | number | undefined;
	readonly yMin: number | undefined;
	readonly yMax: number | undefined;
	readonly formatTime: (value: Date) => string;
	readonly formatValue: (value: number) => string;
}

const range = (values: readonly number[]): [number | undefined, number | undefined] => {
	let min: number | undefined;
	let max: number | undefined;
	for (const value of values) {
		if (min === undefined || value < min) min = value;
		if (max === undefined || value > max) max = value;
	}
	return [min, max];
};

const placedXs = (series: readonly SummarySeries[], toNumber: XToNumber): number[] =>
	series.flatMap((entry) =>
		entry.points.filter((point) => isPlaced(point, toNumber)).map((point) => toNumber(point.x))
	);

const windowedYs = (
	series: readonly SummarySeries[],
	toNumber: XToNumber,
	xWindow: XWindow
): number[] =>
	series.flatMap((entry) =>
		entry.points.flatMap((point) =>
			isPlaced(point, toNumber) && isInsideWindow(toNumber(point.x), xWindow) && point.y !== null
				? [point.y]
				: []
		)
	);

// Describes the figure for a screen reader: the visible series, the time range and the value range.
export function summarizeFigure(input: SummaryInput): string {
	const { series, xWindow, formatTime, formatValue } = input;
	const { toNumber } = xWindow;
	if (!hasData(series, toNumber)) return 'No data.';
	const visible = series.filter((entry) => !entry.hidden);
	if (visible.length === 0) return 'Every series is hidden.';

	const [dataXFrom, dataXTo] = range(placedXs(visible, toNumber));
	const xFrom = input.xMin === undefined ? dataXFrom : toNumber(input.xMin);
	const xTo = input.xMax === undefined ? dataXTo : toNumber(input.xMax);
	const [dataYFrom, dataYTo] = range(windowedYs(visible, toNumber, xWindow));
	const yFrom = input.yMin ?? dataYFrom;
	const yTo = input.yMax ?? dataYTo;

	const labels = visible.map(seriesLabel).join(', ');
	const parts = [`Series: ${labels}.`];
	if (xFrom !== undefined && xTo !== undefined) {
		parts.push(`Time: ${formatTime(new Date(xFrom))} to ${formatTime(new Date(xTo))}.`);
	}
	if (yFrom !== undefined && yTo !== undefined) {
		parts.push(`Values: ${formatValue(yFrom)} to ${formatValue(yTo)}.`);
	}
	return parts.join(' ');
}
