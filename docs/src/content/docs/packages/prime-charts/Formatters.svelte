<script lang="ts">
  import { Chart, type ChartPoint } from "@viamrobotics/prime-charts";

  const START_TIME = Date.UTC(2026, 0, 1);
  const HOUR = 60 * 60 * 1000;
  const COUNT = 24;

  const points: ChartPoint[] = Array.from({ length: COUNT }, (_, index) => ({
    x: new Date(START_TIME + index * HOUR),
    y: 40 + 12 * Math.sin(index / 3),
  }));

  const hourFormat = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    timeZone: "UTC",
  });
  const fullFormat = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  });

  const formatHour = (value: Date): string => hourFormat.format(value);
  const formatDegrees = (value: number): string => `${value.toFixed(0)}°`;
  const formatTime = (value: Date): string => fullFormat.format(value);
  const formatReading = (value: number): string => `${value.toFixed(2)} degrees`;
</script>

<Chart aria-label="Formatted readings">
  <Chart.Plot class="h-64">
    <Chart.Grid />
    <Chart.XAxis format={formatHour} />
    <Chart.YAxis format={formatDegrees} />
    <Chart.Line name="cell-01" points={points} />
    <Chart.Tooltip xFormat={formatTime} yFormat={formatReading} />
  </Chart.Plot>
</Chart>
