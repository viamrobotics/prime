<script lang="ts">
  import { Chart, type ChartPoint } from "@viamrobotics/prime-charts";

  const START_TIME = Date.UTC(2026, 0, 1);
  const HOUR = 60 * 60 * 1000;
  const COUNT = 24;

  const pointsFor = (base: number, swing: number, phase: number): ChartPoint[] =>
    Array.from({ length: COUNT }, (_, index) => ({
      x: new Date(START_TIME + index * HOUR),
      y: base + swing * Math.sin(index / 3 + phase),
    }));

  const temperature = pointsFor(40, 12, 0);
  const throughput = pointsFor(12000, 3000, 1.5);

  const formatDegrees = (value: number) => `${Math.round(value)}°`;
  const formatThroughput = (value: number) => `${Math.round(value).toLocaleString("en-US")} req/h`;
</script>

<div class="flex flex-col gap-4">
  <Chart aria-label="Temperature over a day">
    <Chart.Plot class="h-40">
      <Chart.Grid />
      <Chart.XAxis />
      <Chart.YAxis class="min-w-24" format={formatDegrees} />
      <Chart.Line name="temperature" points={temperature} />
      <Chart.Tooltip />
    </Chart.Plot>
  </Chart>
  <Chart aria-label="Throughput over a day">
    <Chart.Plot class="h-40">
      <Chart.Grid />
      <Chart.XAxis />
      <Chart.YAxis class="min-w-24" format={formatThroughput} />
      <Chart.Line name="throughput" points={throughput} />
      <Chart.Tooltip />
    </Chart.Plot>
  </Chart>
</div>
