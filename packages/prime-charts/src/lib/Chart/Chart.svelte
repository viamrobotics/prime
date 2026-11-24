<!--
@component
A cartesian chart with an x and a y axis. Place [`Chart.Plot`](./Plot.svelte), which holds the drawing parts, and [`Chart.Legend`](./Legend.svelte) and [`Chart.Table`](./Table.svelte) around it, in the layout you write.

The root has the `figure` role and no layout of its own. It requires an `aria-label` or an `aria-labelledby`, and a visually hidden summary of the series, the time and the values describes it unless you pass your own `aria-describedby`. Every other attribute of a `div` passes through to it.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { provideChart } from './context.svelte.ts';
	import { defaultTimeFormat, defaultValueFormat } from './formats.ts';
	import { summarizeFigure } from './summary.ts';
	import type { ChartScale } from './scale.ts';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** The kind of x scale. Defaults to `'time'`. */
		x?: ChartScale;
		/** The lower x bound. Left out, it comes from the data. */
		xMin?: Date | number;
		/** The upper x bound. Left out, it comes from the data. */
		xMax?: Date | number;
		/** The lower y bound, used exactly. Left out, it comes from the data, rounded out to the next tick. */
		yMin?: number;
		/** The upper y bound, used exactly. Left out, it comes from the data, rounded out to the next tick. */
		yMax?: number;
		/** Lays an overlay on the plot and keeps the last lines drawn underneath. Loading wins over the empty state. */
		loading?: boolean;
		/** Rendered in place of the plot when no series has a point. Defaults to the text "No data". */
		empty?: Snippet;
		/** `Chart.Plot`, with `Chart.Legend` and `Chart.Table` around it, in the layout the consumer writes. */
		children?: Snippet;
	}

	type AccessibleName = { 'aria-label': string } | { 'aria-labelledby': string };

	let {
		x = 'time',
		xMin,
		xMax,
		yMin,
		yMax,
		loading = false,
		empty,
		children,
		class: className,
		...rest
	}: Props & AccessibleName = $props();

	const figureId = $props.id();
	const summaryId = `${figureId}-summary`;

	const chart = provideChart({
		x: () => x,
		xMin: () => xMin,
		xMax: () => xMax,
		yMin: () => yMin,
		yMax: () => yMax,
		loading: () => loading,
		empty: () => empty,
		accessibleName: () => ({
			'aria-label': rest['aria-label'] ?? undefined,
			'aria-labelledby': rest['aria-labelledby'] ?? undefined
		})
	});

	const hasOwnDescription = $derived(rest['aria-describedby'] !== undefined);
	const summary = $derived(
		summarizeFigure({
			series: chart.series,
			xWindow: chart.xWindow,
			xMin,
			xMax,
			yMin,
			yMax,
			formatTime: chart.axisFormats.x ?? defaultTimeFormat,
			formatValue: chart.axisFormats.y ?? defaultValueFormat
		})
	);
</script>

<div
	role="figure"
	{...rest}
	aria-describedby={hasOwnDescription ? rest['aria-describedby'] : summaryId}
	aria-busy={loading || undefined}
	class={className}
>
	{#if !hasOwnDescription}
		<p id={summaryId} data-part="summary" class="sr-only">{summary}</p>
	{/if}
	{@render children?.()}
</div>
