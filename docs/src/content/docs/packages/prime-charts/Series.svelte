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

  const cell01 = pointsFor(40, 12, 0);
  const cell02 = pointsFor(55, 8, 1.5);
  const pressure = pointsFor(30, 5, 3);
</script>

<div class="h-64">
  <Chart aria-label="Cell readings">
    <Chart.Grid />
    <Chart.XAxis />
    <Chart.YAxis />
    <Chart.Line name="cell-01" unit="°" points={cell01} />
    <Chart.Line name="cell-02" unit="°" points={cell02} />
    <Chart.Line name="pressure" unit="kPa" color="--color-chart-series-5" points={pressure} />
    <Chart.Tooltip />
    <Chart.Legend />
  </Chart>
</div>
