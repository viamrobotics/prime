<script lang="ts">
  import { Chart, type ChartPoint } from "@viamrobotics/prime-charts";

  const START_TIME = Date.UTC(2026, 0, 1);
  const HOUR_IN_MILLISECONDS = 60 * 60 * 1000;
  const HOURS_IN_DAY = 24;

  const readingAt = (hour: number): number =>
    50 + 30 * Math.sin(hour / 3) + 8 * Math.cos(hour * 1.7);

  const points: ChartPoint[] = Array.from({ length: HOURS_IN_DAY }, (_, hour) => ({
    x: new Date(START_TIME + hour * HOUR_IN_MILLISECONDS),
    y: readingAt(hour),
  }));
</script>

<div class="h-64">
  <Chart aria-label="Hourly readings">
    <Chart.Line {points} />
  </Chart>
</div>
