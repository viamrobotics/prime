<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ChartPoint } from '../../point.ts';
	import { Chart } from '../../chart.ts';

	interface Props {
		width?: number;
		height?: number;
		series?: { name: string; points: ChartPoint[]; hidden?: boolean }[];
		xMin?: Date | number;
		xMax?: Date | number;
		yMin?: number;
		yMax?: number;
		loading?: boolean;
		empty?: Snippet;
		hasLegendBeside?: boolean;
		isPlotAbsolute?: boolean;
		hasAxes?: boolean;
		xFormat?: (value: Date) => string;
		yFormat?: (value: number) => string;
	}

	let {
		width = 400,
		height = 200,
		series = [],
		hasLegendBeside = false,
		isPlotAbsolute = false,
		hasAxes = false,
		xFormat,
		yFormat,
		...bounds
	}: Props = $props();
</script>

<div data-testid="frame" style:width="{width}px" style:height="{height}px">
	<Chart
		aria-label="Readings"
		{...bounds}
		class={[
			'size-full',
			isPlotAbsolute ? 'relative' : 'flex',
			!isPlotAbsolute && !hasLegendBeside && 'flex-col'
		]}
	>
		{#if hasLegendBeside}
			<Chart.Legend class="w-24 shrink-0" />
		{/if}
		<Chart.Plot class={isPlotAbsolute ? 'absolute inset-0' : 'min-h-0 min-w-0 flex-1'}>
			{#each series as entry (entry.name)}
				<Chart.Line name={entry.name} points={entry.points} hidden={entry.hidden} />
			{/each}
			{#if hasAxes}
				<Chart.XAxis format={xFormat} class="x-part" />
				<Chart.YAxis format={yFormat} class="y-part" />
			{/if}
		</Chart.Plot>
	</Chart>
</div>
