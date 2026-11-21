<script lang="ts">
	import type { ChartPoint } from '../point.ts';
	import { Chart } from '../chart.ts';

	interface Props {
		points: ChartPoint[];
	}

	let { points }: Props = $props();
</script>

<div data-testid="frame" style:width="400px">
	<Chart aria-label="Readings">
		<Chart.Plot class="h-64 p-4">
			<Chart.Line name="Reading" {points} />
			<Chart.XAxis />
			<Chart.YAxis />
			<Chart.Tooltip xFormat={() => 'time'} />
		</Chart.Plot>
	</Chart>
</div>
