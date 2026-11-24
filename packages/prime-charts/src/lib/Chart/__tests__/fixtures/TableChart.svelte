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
		caption?: string;
		tableClass?: ClassValue;
		isLabelled?: boolean;
		hasAxes?: boolean;
		isTableFirst?: boolean;
		xFormat?: (value: Date) => string;
		yFormat?: (value: number) => string;
		xMin?: Date | number;
		xMax?: Date | number;
		tableProps?: Record<string, string>;
	}

	let {
		series,
		caption,
		tableClass,
		isLabelled = false,
		hasAxes = false,
		isTableFirst = false,
		xFormat,
		yFormat,
		tableProps = {},
		...bounds
	}: Props = $props();
</script>

<div style:width="400px" style:height="240px">
	{#snippet body()}
		{#if isTableFirst}<Chart.Table {caption} class={tableClass} {...tableProps} />{/if}
		<Chart.Plot class="h-40">
			{#each series as entry (entry.name)}
				<Chart.Line
					name={entry.name}
					points={entry.points}
					unit={entry.unit}
					hidden={entry.hidden}
				/>
			{/each}
			{#if hasAxes}
				<Chart.XAxis format={xFormat} />
				<Chart.YAxis format={yFormat} />
			{/if}
		</Chart.Plot>
		{#if !isTableFirst}<Chart.Table {caption} class={tableClass} {...tableProps} />{/if}
	{/snippet}
	{#if isLabelled}
		<span id="chart-title">Pump readings</span>
		<Chart aria-labelledby="chart-title" {...bounds}>{@render body()}</Chart>
	{:else}
		<Chart aria-label="Readings" {...bounds}>{@render body()}</Chart>
	{/if}
</div>
