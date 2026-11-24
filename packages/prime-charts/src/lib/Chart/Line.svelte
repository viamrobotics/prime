<!--
@component
One series, drawn as a line clipped to the plot area. A `null` `y` breaks the line, and a point with no neighbor on either side draws as a dot. Its name, unit and color label it in the legend and the tooltip.
-->
<script lang="ts" generics="TXValue extends ChartXValue = Date">
	import type { ClassValue } from 'svelte/elements';
	import { line } from 'd3-shape';
	import { useChart, usePlot, usePlotContext } from './context.svelte.ts';
	import type { ChartPoint, ChartXValue } from './point.ts';

	interface Props {
		/** Labels the series in the legend and the tooltip. */
		name: string;
		/** The series to draw, in x order. A `null` `y` is a gap. */
		points: ChartPoint<TXValue>[];
		/** Shown after the series name in the legend, and after its value in the tooltip. */
		unit?: string;
		/** A CSS variable, such as `'--color-chart-series-4'`, drawn as `var(...)`. Defaults to `--color-chart-series-1` to `--color-chart-series-7` in the order the lines mount, wrapping after seven. */
		color?: `--${string}`;
		/** Shows the series' loading mark in the legend. */
		loading?: boolean;
		/** Hides the series, which keeps its color and its position. Bindable, and the legend toggles it. Unbound, the line keeps the state itself. */
		hidden?: boolean;
		/** Lands on the line's path and on the dot of each lone point. */
		class?: ClassValue;
	}

	let {
		name,
		points,
		unit,
		color,
		loading = false,
		hidden = $bindable(),
		class: className
	}: Props = $props();

	const plotContext = usePlotContext('Chart.Line');
	const chart = useChart('Chart.Line');
	const plot = usePlot();

	const series = chart.addSeries({
		get name() {
			return name;
		},
		get unit() {
			return unit;
		},
		get color() {
			return color;
		},
		get loading() {
			return loading;
		},
		get hidden() {
			return hidden ?? false;
		},
		set hidden(value) {
			hidden = value;
		},
		get points() {
			return points;
		}
	});

	plotContext.addLayer({ kind: 'svg', draw, isClippedToPlot: true });

	const DOT_RADIUS = 3;

	interface Placed {
		x: number;
		y: number;
	}

	// Runs of consecutive drawable points, so a gap ends one run and starts the next.
	const runs = $derived.by(() => {
		const result: Placed[][] = [];
		let current: Placed[] = [];
		const { toNumber } = chart.xWindow;
		for (const point of points) {
			const x = plot.xScale(toNumber(point.x));
			const y = point.y === null ? Number.NaN : plot.yScale(point.y);
			if (Number.isFinite(x) && Number.isFinite(y)) {
				current.push({ x, y });
				continue;
			}
			if (current.length > 0) result.push(current);
			current = [];
		}
		if (current.length > 0) result.push(current);
		return result;
	});

	const path = $derived.by(() => {
		const draw = line<Placed>()
			.x((point) => point.x)
			.y((point) => point.y);
		return runs
			.filter((run) => run.length > 1)
			.map((run) => draw(run))
			.join('');
	});

	const dots = $derived(runs.filter((run) => run.length === 1).map((run) => run[0]));
</script>

{#snippet draw()}
	{#if !hidden}
		{#if path}
			<path d={path} fill="none" style:stroke={series.color} class={['stroke-2', className]} />
		{/if}
		{#each dots as dot, index (index)}
			<circle cx={dot.x} cy={dot.y} r={DOT_RADIUS} style:fill={series.color} class={className} />
		{/each}
	{/if}
{/snippet}
