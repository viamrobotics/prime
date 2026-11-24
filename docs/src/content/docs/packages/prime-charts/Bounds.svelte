<script lang="ts">
  import { Chart, type ChartPoint } from "@viamrobotics/prime-charts";

  const START_TIME = Date.UTC(2026, 0, 1);
  const HOUR = 60 * 60 * 1000;
  const COUNT = 24;

  const points: ChartPoint[] = Array.from({ length: COUNT }, (_, index) => ({
    x: new Date(START_TIME + index * HOUR),
    y: 40 + 12 * Math.sin(index / 3),
  }));

  const windowStart = new Date(START_TIME + 6 * HOUR);
  const windowEnd = new Date(START_TIME + 18 * HOUR);
</script>

<div class="flex flex-col gap-6">
  <Chart aria-label="Fixed bounds" yMin={0} yMax={100}>
    <Chart.Plot class="h-56">
      <Chart.Grid />
      <Chart.XAxis />
      <Chart.YAxis />
      <Chart.Line name="cell-01" unit="°" {points} />
      <Chart.Tooltip />
    </Chart.Plot>
  </Chart>

  <Chart aria-label="An x window and a y floor" xMin={windowStart} xMax={windowEnd} yMin={0}>
    <Chart.Plot class="h-56">
      <Chart.Grid />
      <Chart.XAxis />
      <Chart.YAxis />
      <Chart.Line name="cell-01" unit="°" {points} />
      <Chart.Tooltip />
    </Chart.Plot>
  </Chart>
</div>
