<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { scaleLinear, scaleTime } from 'd3-scale';
	import { Html, LayerCake, Svg } from 'layercake';
	import { provideChart, type ChartLayer, type ChartPadding } from './context.svelte.ts';
	import {
		domainPoints,
		hasData,
		xDomain as computeXDomain,
		yDomain as computeYDomain
	} from './domain.ts';
	import type { ChartScale } from './scale.ts';
	import { yTickCount } from './ticks.ts';

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
		/** Lays an overlay on the plot and keeps the last lines drawn underneath. */
		loading?: boolean;
		/** Rendered in place of the plot when no series has a point. Defaults to the text "No data". */
		empty?: Snippet;
		/** The parts, such as `Chart.Line` and `Chart.XAxis`. */
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

	const X_SCALES = {
		time: scaleTime
	} satisfies Record<ChartScale, () => unknown>;

	const chart = provideChart();
	const xScale = $derived(X_SCALES[x]());
	const yScale = scaleLinear();
	const points = $derived(domainPoints(chart.series));
	const xDomain = $derived(computeXDomain(points, xMin, xMax));
	const isEmpty = $derived(!hasData(chart.series));

	const layersOf = (kind: ChartLayer['kind']) =>
		chart.layers.filter((layer) => layer.kind === kind);

	const maxPadding = (side: keyof ChartPadding) =>
		Math.max(0, ...chart.layers.map((layer) => layer.padding?.[side] ?? 0));

	const padding: ChartPadding = $derived({
		top: maxPadding('top'),
		right: maxPadding('right'),
		bottom: maxPadding('bottom'),
		left: maxPadding('left')
	});

	let plotWidth = $state(0);
	let plotHeight = $state(0);
	const yTicks = $derived(yTickCount(plotHeight - padding.top - padding.bottom));
	const yDomain = $derived(computeYDomain(points, yMin, yMax, yTicks));

	// Half the line stroke, so a line along a plot edge keeps its full width.
	const CLIP_OVERHANG = 1;
	const id = $props.id();
	const clipId = `${id}-plot`;
	const clipBox = $derived({
		width: Math.max(0, plotWidth - padding.left - padding.right) + 2 * CLIP_OVERHANG,
		height: Math.max(0, plotHeight - padding.top - padding.bottom) + 2 * CLIP_OVERHANG
	});

	// A focusable plot is a named widget of its own, so it carries the chart's accessible name.
	const plotName = $derived(
		chart.plotAttributes.role
			? { 'aria-label': rest['aria-label'], 'aria-labelledby': rest['aria-labelledby'] }
			: {}
	);
</script>

<div
	role="figure"
	{...rest}
	aria-busy={loading || undefined}
	class={['flex size-full flex-col', className]}
>
	<div
		class="relative min-h-0 flex-1 focus-ring"
		bind:clientWidth={plotWidth}
		bind:clientHeight={plotHeight}
		{...plotName}
		{...chart.plotAttributes}
	>
		<LayerCake {xScale} {yScale} {xDomain} {yDomain} {padding}>
			<Svg>
				{#snippet defs()}
					<clipPath id={clipId}>
						<rect
							x={-CLIP_OVERHANG}
							y={-CLIP_OVERHANG}
							width={clipBox.width}
							height={clipBox.height}
						/>
					</clipPath>
				{/snippet}
				{#if !isEmpty}
					{#each layersOf('svg') as layer (layer)}
						{#if layer.isClippedToPlot}
							<g clip-path="url(#{clipId})">{@render layer.draw()}</g>
						{:else}
							{@render layer.draw()}
						{/if}
					{/each}
				{/if}
			</Svg>
			<Html pointerEvents={false}>
				{#if !isEmpty}
					{#each layersOf('html') as layer (layer)}
						{@render layer.draw()}
					{/each}
				{/if}
			</Html>
			{@render children?.()}
		</LayerCake>
		{#if loading}
			<div data-part="loading" class="absolute inset-0 bg-white/60"></div>
		{:else if isEmpty}
			<div
				data-part="empty"
				class="absolute inset-0 flex items-center justify-center text-sm text-subtle-1"
			>
				{#if empty}
					{@render empty()}
				{:else}
					No data
				{/if}
			</div>
		{/if}
	</div>
	{#each layersOf('below') as layer (layer)}
		{@render layer.draw()}
	{/each}
</div>
