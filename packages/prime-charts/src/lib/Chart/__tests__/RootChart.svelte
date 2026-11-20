<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ChartPoint } from '../point.ts';
	import { Chart } from '../chart.ts';

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
	}

	let { width = 400, height = 200, series = [], ...bounds }: Props = $props();
</script>

<div data-testid="frame" style:width="{width}px" style:height="{height}px">
	<Chart aria-label="Readings" {...bounds}>
		{#each series as entry (entry.name)}
			<Chart.Line name={entry.name} points={entry.points} hidden={entry.hidden} />
		{/each}
	</Chart>
</div>
