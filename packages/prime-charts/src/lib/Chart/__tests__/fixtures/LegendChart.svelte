<script lang="ts">
	import { untrack } from 'svelte';
	import type { ChartPoint } from '../../point.ts';
	import { Chart } from '../../chart.ts';

	interface Series {
		name: string;
		points: ChartPoint[];
		unit?: string;
		loading?: boolean;
		hidden?: boolean;
	}

	let {
		series,
		isBound = false,
		isLegendFirst = false,
		legendProps = {}
	}: {
		series: Series[];
		isBound?: boolean;
		isLegendFirst?: boolean;
		legendProps?: Record<string, string>;
	} = $props();

	let hidden = $state(untrack(() => series.map((entry) => entry.hidden ?? false)));
</script>

<div style:width="400px" style:height="240px">
	<Chart aria-label="Readings" class="flex size-full flex-col">
		{#if isLegendFirst}
			<Chart.Legend {...legendProps} />
		{/if}
		<Chart.Plot class="min-h-0 flex-1">
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
		</Chart.Plot>
		{#if !isLegendFirst}
			<Chart.Legend {...legendProps} />
		{/if}
	</Chart>
</div>
<output data-testid="hidden">{hidden.join(',')}</output>
