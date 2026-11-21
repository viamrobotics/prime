<script lang="ts">
	import type { ChartPoint } from '../point.ts';
	import { Chart } from '../chart.ts';

	interface Props {
		series?: { name: string; unit?: string; points: ChartPoint[]; hidden?: boolean }[];
		xMin?: Date | number;
		xMax?: Date | number;
		yMin?: number;
		yMax?: number;
		describedby?: string;
		hasAxes?: boolean;
		xFormat?: (value: Date) => string;
		yFormat?: (value: number) => string;
	}

	let { series = [], describedby, hasAxes = false, xFormat, yFormat, ...bounds }: Props = $props();
</script>

<div style:width="400px" style:height="200px">
	<Chart aria-label="Readings" aria-describedby={describedby} {...bounds}>
		<Chart.Plot class="h-48">
			{#each series as entry (entry.name)}
				<Chart.Line
					name={entry.name}
					unit={entry.unit}
					points={entry.points}
					hidden={entry.hidden}
				/>
			{/each}
			{#if hasAxes}
				<Chart.XAxis format={xFormat} />
				<Chart.YAxis format={yFormat} />
			{/if}
		</Chart.Plot>
	</Chart>
	<p id="own">Own description</p>
</div>
