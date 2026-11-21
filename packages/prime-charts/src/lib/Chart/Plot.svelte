<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ClassValue } from 'svelte/elements';
	import { scaleLinear } from 'd3-scale';
	import { Html, LayerCake, Svg } from 'layercake';
	import { providePlot, useChart, type ChartLayer, type ChartPadding } from './context.svelte.ts';
	import { domainPoints, hasData, yDomain as computeYDomain } from './domain.ts';
	import { X_SCALES } from './x-scales.ts';
	import { yTickCount } from './ticks.ts';

	interface Props {
		/** Lands on the plot's root element. The consumer sizes the plot through it, and the plot draws inside its content box. */
		class?: ClassValue;
		/** The drawing parts, such as `Chart.Line`, `Chart.XAxis` and `Chart.Tooltip`. */
		children?: Snippet;
	}

	let { class: className, children }: Props = $props();

	const chart = useChart();
	const plotContext = providePlot();
	const settings = chart.settings;

	const xScale = $derived(X_SCALES[settings.x].scale());
	const yScale = scaleLinear();
	const points = $derived(domainPoints(chart.series));
	const xDomain = $derived([...chart.xWindow.domain]);
	const isEmpty = $derived(!hasData(chart.series, chart.xToNumber));

	const layersOf = (kind: ChartLayer['kind']) =>
		plotContext.layers.filter((layer) => layer.kind === kind);

	const maxPadding = (side: keyof ChartPadding) =>
		Math.max(0, ...plotContext.layers.map((layer) => layer.padding?.[side] ?? 0));

	const padding: ChartPadding = $derived({
		top: maxPadding('top'),
		right: maxPadding('right'),
		bottom: maxPadding('bottom'),
		left: maxPadding('left')
	});

	let plotWidth = $state(0);
	let plotHeight = $state(0);
	const yTicks = $derived(yTickCount(plotHeight - padding.top - padding.bottom));
	const yDomain = $derived(
		computeYDomain(points, chart.xToNumber, settings.yMin, settings.yMax, yTicks)
	);

	// Half the line stroke, so a line along a plot edge keeps its full width.
	const CLIP_OVERHANG = 1;
	const id = $props.id();
	const clipId = `${id}-plot`;
	const clipBox = $derived({
		width: Math.max(0, plotWidth - padding.left - padding.right) + 2 * CLIP_OVERHANG,
		height: Math.max(0, plotHeight - padding.top - padding.bottom) + 2 * CLIP_OVERHANG
	});

	const attributes = $derived(plotContext.attributes);
	// A focusable plot is a named widget of its own, so it carries the chart's accessible name.
	const plotName = $derived(attributes.role ? settings.accessibleName : {});
</script>

<div data-part="plot" class={['focus-ring', className]} {...plotName} {...attributes}>
	<div class="relative size-full" bind:clientWidth={plotWidth} bind:clientHeight={plotHeight}>
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
		{#if settings.loading}
			<div data-part="loading" class="absolute inset-0 bg-white/60"></div>
		{:else if isEmpty}
			<div
				data-part="empty"
				class="absolute inset-0 flex items-center justify-center text-sm text-subtle-1"
			>
				{#if settings.empty}
					{@render settings.empty()}
				{:else}
					No data
				{/if}
			</div>
		{/if}
	</div>
</div>
