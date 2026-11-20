<script lang="ts" generics="TXValue extends ChartXValue = Date">
	import type { ClassValue } from 'svelte/elements';
	import { line } from 'd3-shape';
	import { useChart, usePlot } from './context.svelte.ts';
	import { timeValue } from './domain.ts';
	import type { ChartPoint, ChartXValue } from './point.ts';

	interface Props {
		/** Labels the series in the legend and the tooltip. */
		name: string;
		/** The series to draw, in x order. A `null` `y` is a gap. */
		points: ChartPoint<TXValue>[];
		/** Shown after the series name in the legend, and after its value in the tooltip. */
		unit?: string;
		/** A CSS variable such as `'--color-chart-series-4'`. Defaults to the palette slot for the line's position. */
		color?: `--${string}`;
		/** Shows the series' loading mark in the legend. */
		loading?: boolean;
		/** Hides the series. The legend toggles it, and a hidden series keeps its color and position. */
		hidden?: boolean;
		class?: ClassValue;
	}

	let {
		name,
		points,
		unit,
		color,
		loading = false,
		hidden = $bindable(false),
		class: className
	}: Props = $props();

	const chart = useChart();
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
			return hidden;
		},
		set hidden(value) {
			hidden = value;
		},
		get points() {
			return points;
		}
	});

	chart.addLayer({ kind: 'svg', draw, isClippedToPlot: true });

	const DOT_RADIUS = 3;

	interface Placed {
		x: number;
		y: number;
	}

	// Runs of consecutive drawable points, so a gap ends one run and starts the next.
	const runs = $derived.by(() => {
		const result: Placed[][] = [];
		let current: Placed[] = [];
		for (const point of points) {
			const x = plot.xScale(timeValue(point.x));
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
