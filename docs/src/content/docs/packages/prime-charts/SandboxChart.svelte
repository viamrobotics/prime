<script lang="ts">
  import { Chart, type ChartPoint } from "@viamrobotics/prime-charts";

  const START_TIME = Date.UTC(2026, 0, 1);
  const MINUTE = 60 * 1000;
  const COUNT = 48;

  const series = [
    { name: "cell-01", unit: "°", base: 40, swing: 14, phase: 0 },
    { name: "cell-02", unit: "°", base: 55, swing: 10, phase: 1.5 },
    { name: "cell-03", unit: "°", base: 25, swing: 8, phase: 3 },
  ];

  const pointsFor = (base: number, swing: number, phase: number): ChartPoint[] =>
    Array.from({ length: COUNT }, (_, index) => ({
      x: new Date(START_TIME + index * 30 * MINUTE),
      y: base + swing * Math.sin(index / 5 + phase) + 3 * Math.cos(index * 1.3 + phase),
    }));

  const data = series.map((item) => ({ ...item, points: pointsFor(item.base, item.swing, item.phase) }));

  let { fixedBounds = false, loading = false }: { fixedBounds?: boolean; loading?: boolean } = $props();

</script>

<Chart
  aria-label="Cell temperatures"
  class="flex h-80 flex-col gap-2"
  yMin={fixedBounds ? 0 : undefined}
  yMax={fixedBounds ? 100 : undefined}
  {loading}
>
  <Chart.Plot class="min-h-0 flex-1">
    <Chart.Grid />
    <Chart.XAxis />
    <Chart.YAxis />
    {#each data as entry (entry.name)}
      <Chart.Line name={entry.name} unit={entry.unit} points={entry.points} />
    {/each}
    <Chart.Tooltip />
  </Chart.Plot>
  <Chart.Legend />
</Chart>
