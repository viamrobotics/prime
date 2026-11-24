import { createContext, getContext, setContext, untrack, type Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { ScaleLinear, ScaleTime } from 'd3-scale';
import { getLayerCakeContext } from 'layercake';
import { domainPoints, xDomain } from './domain.ts';
import type { ChartPoint, ChartXValue } from './point.ts';
import type { ChartScale } from './scale.ts';
import { X_SCALES, type XWindow } from './x-scales.ts';

const PALETTE = [
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
	// The order the lines mounted in among the registered series, -1 until the line mounts.
	readonly index: number;
	// The resolved paint, `var(--...)`, from the override or the palette slot.
	readonly color: string;
}

export interface ChartLayer {
	// `svg` paints inside the plot's svg in registration order, and `html` over the plot.
	readonly kind: 'svg' | 'html';
	readonly draw: Snippet;
	// Room reserved around the plot area. The plot reads it live, so a measuring part passes a getter.
	readonly padding?: Partial<ChartPadding>;
	// Clips an `svg` layer to the plot area, for marks that a bound can cut.
	readonly isClippedToPlot?: boolean;
}

export interface AxisFormats {
	x: ((value: Date) => string) | undefined;
	y: ((value: number) => string) | undefined;
}

export interface ChartAccessibleName {
	readonly 'aria-label'?: string;
	readonly 'aria-labelledby'?: string;
}

// The root's props that `Chart.Plot` draws with.
export interface ChartSettings {
	readonly x: ChartScale;
	readonly xMin: Date | number | undefined;
	readonly xMax: Date | number | undefined;
	readonly yMin: number | undefined;
	readonly yMax: number | undefined;
	readonly loading: boolean;
	readonly empty: Snippet | undefined;
	readonly accessibleName: ChartAccessibleName;
}

type PlotAttributes = () => HTMLAttributes<HTMLDivElement>;

// Each `add*` and `set*` below registers during component initialization and drops the entry
// when the calling component unmounts.
export interface ChartContext {
	readonly settings: ChartSettings;
	readonly series: readonly ChartSeries[];
	readonly visibleSeries: readonly ChartSeries[];
	readonly axisFormats: Readonly<AxisFormats>;
	// The drawn x window, from the bounds and the series the domain reads.
	readonly xWindow: XWindow;
	addSeries: (input: SeriesInput) => ChartSeries;
	setAxisFormat: <TDimension extends keyof AxisFormats>(
		dimension: TDimension,
		format: () => AxisFormats[TDimension]
	) => void;
}

export interface PlotContext {
	readonly layers: readonly ChartLayer[];
	readonly attributes: HTMLAttributes<HTMLDivElement>;
	addLayer: (layer: ChartLayer) => void;
	setAttributes: (attributes: PlotAttributes) => void;
}

const [getChart, setChart] = createContext<ChartContext>();

function registry<TEntry>() {
	let entries = $state.raw<TEntry[]>([]);
	return {
		get entries() {
			return entries;
		},
		register(entry: TEntry) {
			$effect(() => {
				// Untracked, so the effect never reruns, and registers the entry again, when the list changes.
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

export type ChartOptions = { readonly [TKey in keyof ChartSettings]: () => ChartSettings[TKey] };

export const provideChart = (options: ChartOptions): ChartContext => {
	const settings: ChartSettings = {
		get x() {
			return options.x();
		},
		get xMin() {
			return options.xMin();
		},
		get xMax() {
			return options.xMax();
		},
		get yMin() {
			return options.yMin();
		},
		get yMax() {
			return options.yMax();
		},
		get loading() {
			return options.loading();
		},
		get empty() {
			return options.empty();
		},
		get accessibleName() {
			return options.accessibleName();
		}
	};
	const series = registry<ChartSeries>();
	const xFormats = registry<() => AxisFormats['x']>();
	const yFormats = registry<() => AxisFormats['y']>();
	const toNumber = $derived(X_SCALES[settings.x].toNumber);
	const windowDomain = $derived(
		xDomain(domainPoints(series.entries), toNumber, settings.xMin, settings.xMax)
	);

	const context: ChartContext = {
		settings,
		get series() {
			return series.entries;
		},
		get visibleSeries() {
			return series.entries.filter((entry) => !entry.hidden);
		},
		get axisFormats() {
			return { x: xFormats.entries.at(-1)?.(), y: yFormats.entries.at(-1)?.() };
		},
		get xWindow() {
			return { domain: windowDomain, toNumber };
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
		setAxisFormat: (dimension, format) => {
			if (dimension === 'x') xFormats.register(format as () => AxisFormats['x']);
			else yFormats.register(format as () => AxisFormats['y']);
		}
	};
	setChart(context);
	return context;
};

export const useChart = getChart;

// A Symbol key rather than `createContext`, so a missing plot can be detected and named.
const PLOT_KEY = Symbol('Chart.Plot');
const chartsWithPlot = new WeakSet<ChartContext>();

export const providePlot = (): PlotContext => {
	const chart = useChart();
	// Checked in an effect, after a `{#key}` or `{#if}` swap has torn the outgoing plot down.
	$effect(() => {
		if (chartsWithPlot.has(chart)) throw new Error('A Chart takes one Chart.Plot.');
		chartsWithPlot.add(chart);
		return () => {
			chartsWithPlot.delete(chart);
		};
	});

	const layers = registry<ChartLayer>();
	const attributes = registry<PlotAttributes>();
	const context: PlotContext = {
		get layers() {
			return layers.entries;
		},
		get attributes() {
			return Object.assign({}, ...attributes.entries.map((entry) => entry()));
		},
		addLayer: (layer) => layers.register(layer),
		setAttributes: (entry) => attributes.register(entry)
	};
	setContext(PLOT_KEY, context);
	return context;
};

export const usePlotContext = (part: string): PlotContext => {
	const context = getContext<PlotContext | undefined>(PLOT_KEY);
	if (!context) throw new Error(`${part} must be placed inside Chart.Plot.`);
	return context;
};

export const assertOutsidePlot = (part: string): void => {
	if (getContext(PLOT_KEY)) throw new Error(`${part} must be placed outside Chart.Plot.`);
};

// The plot's measured size, padding and scales. Parts render inside the plot's LayerCake,
// so this is callable from any part's initialization once `usePlotContext` has passed.
export const usePlot = () =>
	getLayerCakeContext<{ x: ScaleTime<number, number>; y: ScaleLinear<number, number> }>();
