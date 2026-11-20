<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import type { ChartPoint } from '../point.ts';
	import { Chart } from '../chart.ts';

	interface Series {
		name: string;
		points: ChartPoint[];
		color?: ComponentProps<typeof Chart.Line>['color'];
		hidden?: boolean;
	}

	let { series, width, height }: { series: Series[]; width: number; height: number } = $props();
</script>

<div style:width="{width}px" style:height="{height}px">
	<Chart aria-label="Readings">
		{#each series as entry (entry.name)}
			<Chart.Line
				name={entry.name}
				points={entry.points}
				color={entry.color}
				hidden={entry.hidden}
			/>
		{/each}
	</Chart>
</div>
