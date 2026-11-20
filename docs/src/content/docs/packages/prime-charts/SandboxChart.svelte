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

  const {
    fixedBounds = false,
    loading = false,
    hideCell01 = false,
    hideCell02 = false,
    hideCell03 = false,
  }: {
    fixedBounds?: boolean;
    loading?: boolean;
    hideCell01?: boolean;
    hideCell02?: boolean;
    hideCell03?: boolean;
  } = $props();

  let hiddenCell01 = $derived(hideCell01);
  let hiddenCell02 = $derived(hideCell02);
  let hiddenCell03 = $derived(hideCell03);
</script>

<div class="h-80">
  <Chart
    aria-label="Cell temperatures"
    yMin={fixedBounds ? 0 : undefined}
    yMax={fixedBounds ? 100 : undefined}
    {loading}
  >
    <Chart.Grid />
    <Chart.XAxis />
    <Chart.YAxis />
    <Chart.Line name="cell-01" unit="°" points={data[0]!.points} bind:hidden={hiddenCell01} />
    <Chart.Line name="cell-02" unit="°" points={data[1]!.points} bind:hidden={hiddenCell02} />
    <Chart.Line name="cell-03" unit="°" points={data[2]!.points} bind:hidden={hiddenCell03} />
    <Chart.Tooltip />
    <Chart.Legend />
  </Chart>
</div>
