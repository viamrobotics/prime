<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import type { ChartPoint } from '../../point.ts';
	import { Chart } from '../../chart.ts';

	interface Series {
		name: string;
		points: ChartPoint[];
		color?: ComponentProps<typeof Chart.Line>['color'];
		hidden?: boolean;
	}

	let { series, width, height }: { series: Series[]; width: number; height: number } = $props();
</script>

<div style:width="{width}px" style:height="{height}px">
	<Chart aria-label="Readings" class="flex size-full flex-col">
		<Chart.Plot class="min-h-0 flex-1">
			{#each series as entry (entry.name)}
				<Chart.Line
					name={entry.name}
					points={entry.points}
					color={entry.color}
					hidden={entry.hidden}
				/>
			{/each}
		</Chart.Plot>
	</Chart>
</div>
