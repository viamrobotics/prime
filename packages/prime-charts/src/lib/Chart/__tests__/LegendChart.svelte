<script lang="ts">
	import { untrack } from 'svelte';
	import type { ChartPoint } from '../point.ts';
	import { Chart } from '../chart.ts';

	interface Series {
		name: string;
		points: ChartPoint[];
		unit?: string;
		loading?: boolean;
		hidden?: boolean;
	}

	let { series, isBound = false }: { series: Series[]; isBound?: boolean } = $props();

	let hidden = $state(untrack(() => series.map((entry) => entry.hidden ?? false)));
</script>

<div style:width="400px" style:height="240px">
	<Chart aria-label="Readings">
		{#each series as entry, index (entry.name)}
			{#if isBound}
				<Chart.Line
					name={entry.name}
					points={entry.points}
					unit={entry.unit}
					loading={entry.loading}
					bind:hidden={hidden[index]}
				/>
			{:else}
				<Chart.Line
					name={entry.name}
					points={entry.points}
					unit={entry.unit}
					loading={entry.loading}
					hidden={entry.hidden}
				/>
			{/if}
		{/each}
		<Chart.Legend />
	</Chart>
</div>
<output data-testid="hidden">{hidden.join(',')}</output>
