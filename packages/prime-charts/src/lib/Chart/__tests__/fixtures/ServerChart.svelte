<script lang="ts">
	import { Chart } from '../../chart.ts';

	const start = Date.UTC(2026, 0, 1);
	const minute = 60_000;
	const pointsOf = (values: number[]) =>
		values.map((y, index) => ({ x: new Date(start + index * minute), y }));

	const pressure = pointsOf([3, 5, 4, 6]);
	const flow = pointsOf([1, 2, 2, 3]);
</script>

<Chart aria-label="Readings">
	<Chart.Legend />
	<Chart.Plot class="h-40">
		<Chart.Line name="Pressure" points={pressure} unit="kPa" />
		<Chart.Line name="Flow" points={flow} />
		<Chart.XAxis />
		<Chart.YAxis />
		<Chart.Grid />
		<Chart.Tooltip />
	</Chart.Plot>
	<Chart.Table />
</Chart>
