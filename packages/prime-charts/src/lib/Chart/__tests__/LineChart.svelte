<script lang="ts">
	import type { ChartPoint } from '../point.ts';
	import { Chart } from '../chart.ts';

	let { points, width, height }: { points: ChartPoint[]; width: number; height: number } = $props();
</script>

<div style:width="{width}px" style:height="{height}px">
	<Chart aria-label="Readings" class="flex size-full flex-col">
		<Chart.Plot class="min-h-0 flex-1">
			<Chart.Line name="Reading" {points} />
		</Chart.Plot>
	</Chart>
</div>
