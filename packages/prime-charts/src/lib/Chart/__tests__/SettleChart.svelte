<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	import type { ChartPoint } from '../point.ts';
	import { Chart } from '../chart.ts';

	interface Props {
		points: ChartPoint[];
		width?: number;
		dir?: 'ltr' | 'rtl';
		hasYAxis?: boolean;
		xFormat?: (value: Date) => string;
		yClass?: ClassValue;
	}

	const HEIGHT = 200;

	let { points, width = 400, dir = 'ltr', hasYAxis = true, xFormat, yClass }: Props = $props();
</script>

<div data-testid="frame" {dir} style:width="{width}px" style:height="{HEIGHT}px">
	<Chart aria-label="Readings" class="flex size-full flex-col">
		<Chart.Plot class="min-h-0 flex-1">
			<Chart.Line name="Reading" {points} />
			<Chart.XAxis format={xFormat} class="x-part" />
			{#if hasYAxis}
				<Chart.YAxis class={['y-part', yClass]} />
			{/if}
		</Chart.Plot>
	</Chart>
</div>
