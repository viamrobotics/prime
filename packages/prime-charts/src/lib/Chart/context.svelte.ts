import { createContext, untrack, type Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { ScaleLinear, ScaleTime } from 'd3-scale';
import { getLayerCakeContext } from 'layercake';
import type { ChartPoint, ChartXValue } from './point.ts';

export const PALETTE = [
	'--color-chart-series-1',
	'--color-chart-series-2',
	'--color-chart-series-3',
	'--color-chart-series-4',
	'--color-chart-series-5',
	'--color-chart-series-6',
	'--color-chart-series-7'
] as const;

export interface ChartPadding {
	top: number;
	right: number;
	bottom: number;
	left: number;
}

// What a `Chart.Line` registers. Every field is a getter over the line's live props, and
// `hidden` writes through to the line's bindable prop.
export interface SeriesInput {
	readonly name: string;
	readonly unit: string | undefined;
	readonly color: `--${string}` | undefined;
	readonly loading: boolean;
	hidden: boolean;
	readonly points: readonly ChartPoint<ChartXValue>[];
}

export interface ChartSeries extends Omit<SeriesInput, 'color'> {
	// Source order among the registered series, -1 until the line mounts.
	readonly index: number;
	// The resolved paint, `var(--...)`, from the override or the palette slot.
	readonly color: string;
}

// `svg` paints inside the plot's svg in registration order, `html` over the plot, and
// `below` under the plot, outside it. `padding` reserves room around the plot area.
// `isClippedToPlot` clips an `svg` layer to the plot area, for marks that a bound can cut.
export interface ChartLayer {
	readonly kind: 'svg' | 'html' | 'below';
	readonly draw: Snippet;
	readonly padding?: Partial<ChartPadding>;
	readonly isClippedToPlot?: boolean;
}

export interface AxisFormats {
	x: ((value: Date) => string) | undefined;
	y: ((value: number) => string) | undefined;
}

type PlotAttributes = () => HTMLAttributes<HTMLDivElement>;

export interface ChartContext {
	readonly series: readonly ChartSeries[];
	readonly visibleSeries: readonly ChartSeries[];
	readonly layers: readonly ChartLayer[];
	readonly axisFormats: Readonly<AxisFormats>;
	readonly plotAttributes: HTMLAttributes<HTMLDivElement>;
	// Each `add*` and `set*` registers during component initialization and drops the entry
	// when the calling component unmounts.
	addSeries: (input: SeriesInput) => ChartSeries;
	addLayer: (layer: ChartLayer) => void;
	setAxisFormat: <D extends keyof AxisFormats>(dimension: D, format: () => AxisFormats[D]) => void;
	setPlotAttributes: (attributes: PlotAttributes) => void;
}

const [getChart, setChart] = createContext<ChartContext>();

function registry<T>() {
	let entries = $state.raw<T[]>([]);
	return {
		get entries() {
			return entries;
		},
		register(entry: T) {
			$effect(() => {
				// Registration runs inside the caller's effect, which must not track the list it grows.
				untrack(() => {
					entries = [...entries, entry];
				});
				return () => {
					entries = entries.filter((current) => current !== entry);
				};
			});
		}
	};
}

export const provideChart = (): ChartContext => {
	const series = registry<ChartSeries>();
	const layers = registry<ChartLayer>();
	const plotAttributes = registry<PlotAttributes>();
	const xFormats = registry<() => AxisFormats['x']>();
	const yFormats = registry<() => AxisFormats['y']>();

	const context: ChartContext = {
		get series() {
			return series.entries;
		},
		get visibleSeries() {
			return series.entries.filter((entry) => !entry.hidden);
		},
		get layers() {
			return layers.entries;
		},
		get axisFormats() {
			return { x: xFormats.entries.at(-1)?.(), y: yFormats.entries.at(-1)?.() };
		},
		get plotAttributes() {
			return Object.assign({}, ...plotAttributes.entries.map((attributes) => attributes()));
		},
		addSeries: (input) => {
			const entry: ChartSeries = {
				get index() {
					return series.entries.indexOf(entry);
				},
				get color() {
					const slot = PALETTE[Math.max(0, entry.index) % PALETTE.length];
					return `var(${input.color ?? slot})`;
				},
				get name() {
					return input.name;
				},
				get unit() {
					return input.unit;
				},
				get loading() {
					return input.loading;
				},
				get hidden() {
					return input.hidden;
				},
				set hidden(value) {
					input.hidden = value;
				},
				get points() {
					return input.points;
				}
			};
			series.register(entry);
			return entry;
		},
		addLayer: (layer) => layers.register(layer),
		setAxisFormat: (dimension, format) => {
			if (dimension === 'x') xFormats.register(format as () => AxisFormats['x']);
			else yFormats.register(format as () => AxisFormats['y']);
		},
		setPlotAttributes: (attributes) => plotAttributes.register(attributes)
	};
	setChart(context);
	return context;
};

export const useChart = getChart;

// The plot's measured size, padding and scales. Parts render inside the root's LayerCake,
// so this is callable from any part's initialization.
export const usePlot = () =>
	getLayerCakeContext<{ x: ScaleTime<number, number>; y: ScaleLinear<number, number> }>();
