<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	import type { ChartPoint } from '../../point.ts';
	import { Chart } from '../../chart.ts';

	interface Props {
		width?: number;
		height?: number;
		series?: { name: string; points: ChartPoint[]; hidden?: boolean }[];
		yMin?: number;
		yMax?: number;
		xFormat?: (value: Date) => string;
		yFormat?: (value: number) => string;
		hasAxes?: boolean;
		hasYAxis?: boolean;
		yClass?: ClassValue;
		xClass?: ClassValue;
		dir?: 'ltr' | 'rtl';
	}

	let {
		width = 400,
		height = 200,
		series = [],
		xFormat,
		yFormat,
		hasAxes = true,
		hasYAxis = true,
		yClass,
		xClass,
		dir = 'ltr',
		...bounds
	}: Props = $props();
</script>

<div data-testid="frame" {dir} style:width="{width}px" style:height="{height}px">
	<Chart aria-label="Readings" {...bounds} class="flex size-full flex-col">
		<Chart.Plot class="min-h-0 flex-1">
			{#each series as entry (entry.name)}
				<Chart.Line name={entry.name} points={entry.points} hidden={entry.hidden} />
			{/each}
			{#if hasAxes}
				<Chart.Grid class="grid-part" />
				<Chart.XAxis format={xFormat} class={['x-part', xClass]} />
				{#if hasYAxis}
					<Chart.YAxis format={yFormat} class={['y-part', yClass]} />
				{/if}
			{/if}
		</Chart.Plot>
	</Chart>
</div>
