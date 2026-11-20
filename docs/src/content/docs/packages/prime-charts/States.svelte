<script lang="ts">
  import { Chart, type ChartPoint } from "@viamrobotics/prime-charts";

  const START_TIME = Date.UTC(2026, 0, 1);
  const HOUR = 60 * 60 * 1000;
  const COUNT = 24;

  const points: ChartPoint[] = Array.from({ length: COUNT }, (_, index) => ({
    x: new Date(START_TIME + index * HOUR),
    y: 40 + 12 * Math.sin(index / 3),
  }));
</script>

<div class="flex flex-col gap-6">
  <div class="h-48">
    <Chart aria-label="Empty chart">
      <Chart.Grid />
      <Chart.XAxis />
      <Chart.YAxis />
      <Chart.Line name="cell-01" points={[]} />
      {#snippet empty()}
        <span>Nothing recorded for this range</span>
      {/snippet}
    </Chart>
  </div>

  <div class="h-48">
    <Chart aria-label="Loading chart" loading>
      <Chart.Grid />
      <Chart.XAxis />
      <Chart.YAxis />
      <Chart.Line name="cell-01" loading {points} />
      <Chart.Legend />
    </Chart>
  </div>
</div>
