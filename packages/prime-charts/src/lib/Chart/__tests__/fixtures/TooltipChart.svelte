<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	import type { ChartPoint } from '../../point.ts';
	import { Chart } from '../../chart.ts';

	interface Series {
		name: string;
		points: ChartPoint[];
		unit?: string;
		hidden?: boolean;
	}

	interface Props {
		series: Series[];
		xFormat?: (value: Date) => string;
		yFormat?: (value: number) => string;
		axisXFormat?: (value: Date) => string;
		axisYFormat?: (value: number) => string;
		hasTooltip?: boolean;
		hasAxes?: boolean;
		hasLegend?: boolean;
		isLegendFirst?: boolean;
		xMin?: Date | number;
		xMax?: Date | number;
		plotClass?: ClassValue;
	}

	let {
		series,
		xFormat,
		yFormat,
		axisXFormat,
		axisYFormat,
		hasTooltip = true,
		hasAxes = false,
		hasLegend = false,
		isLegendFirst = false,
		xMin,
		xMax,
		plotClass
	}: Props = $props();
</script>

<button type="button">Before</button>
<div data-testid="frame" style:width="400px" style:height="240px">
	<Chart {xMin} {xMax} aria-label="Readings" class="flex size-full flex-col">
		{#if hasLegend && isLegendFirst}
			<Chart.Legend />
		{/if}
		<Chart.Plot class={['min-h-0 flex-1', plotClass]}>
			{#each series as entry (entry.name)}
				<Chart.Line
					name={entry.name}
					points={entry.points}
					unit={entry.unit}
					hidden={entry.hidden}
				/>
			{/each}
			{#if hasAxes}
				<Chart.XAxis format={axisXFormat} class="x-part" />
				<Chart.YAxis format={axisYFormat} class="y-part" />
			{/if}
			{#if hasTooltip}
				<Chart.Tooltip {xFormat} {yFormat} />
			{/if}
		</Chart.Plot>
		{#if hasLegend && !isLegendFirst}
			<Chart.Legend />
		{/if}
	</Chart>
</div>
<button type="button">After</button>
