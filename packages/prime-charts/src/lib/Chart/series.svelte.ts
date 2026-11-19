import { createContext, untrack } from 'svelte';
import type { ChartPoint, ChartXValue } from './point.ts';

type SeriesPoints = () => readonly ChartPoint<ChartXValue>[];

interface ChartSeries {
	readonly points: readonly ChartPoint<ChartXValue>[];
	add: (points: SeriesPoints) => () => void;
}

const [getSeries, setSeries] = createContext<ChartSeries>();

export const provideSeries = (): ChartSeries => {
	let series = $state.raw<SeriesPoints[]>([]);
	const context: ChartSeries = {
		get points() {
			return series.flatMap((points) => points());
		},
		add: (points) => {
			// Registration runs inside the caller's effect, which must not track the list it grows.
			untrack(() => {
				series = [...series, points];
			});
			return () => {
				series = series.filter((entry) => entry !== points);
			};
		}
	};
	setSeries(context);
	return context;
};

export const useSeries = getSeries;
