<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	import type { ChartPoint } from '../point.ts';
	import { Chart } from '../chart.ts';

	interface Props {
		points: ChartPoint[];
		yClass?: ClassValue;
	}

	let { points, yClass }: Props = $props();

	const charts = [
		{ name: 'narrow', format: (value: number) => `${value}` },
		{ name: 'wide', format: (value: number) => `${value} units` }
	];
</script>

<div class="flex w-[400px] flex-col">
	{#each charts as chart (chart.name)}
		<div data-testid={chart.name} class="h-40">
			<Chart aria-label="Readings" class="flex size-full flex-col">
				<Chart.Plot class="min-h-0 flex-1">
					<Chart.Line name="Reading" {points} />
					<Chart.XAxis />
					<Chart.YAxis format={chart.format} class={['y-part', yClass]} />
				</Chart.Plot>
			</Chart>
		</div>
	{/each}
</div>
