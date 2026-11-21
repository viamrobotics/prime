<script lang="ts">
  import { Chart, type ChartPoint } from "@viamrobotics/prime-charts";

  const START_TIME = Date.UTC(2026, 0, 1);
  const HOUR = 60 * 60 * 1000;
  const COUNT = 6;

  const cpu: ChartPoint[] = Array.from({ length: COUNT }, (_, index) => ({
    x: new Date(START_TIME + index * HOUR),
    y: 40 + 12 * Math.sin(index / 2),
  }));

  const memory: ChartPoint[] = Array.from({ length: COUNT }, (_, index) => ({
    x: new Date(START_TIME + index * HOUR),
    y: index === 3 ? null : 60 + 8 * Math.cos(index / 2),
  }));
</script>

<Chart aria-label="Resource use" class="flex flex-col gap-4">
  <Chart.Plot class="h-48">
    <Chart.Grid />
    <Chart.XAxis />
    <Chart.YAxis />
    <Chart.Line name="CPU" unit="%" points={cpu} />
    <Chart.Line name="Memory" unit="%" points={memory} />
    <Chart.Tooltip />
  </Chart.Plot>
  <Chart.Legend />
  <Chart.Table class="w-full" />
</Chart>
