<script lang="ts">
	import type { ChartPoint } from '../point.ts';
	import { Chart } from '../chart.ts';

	let { points, width, height }: { points: ChartPoint[]; width: number; height: number } = $props();
</script>

<div style:width="{width}px" style:height="{height}px">
	<Chart>
		<Chart.Line {points} />
	</Chart>
</div>
