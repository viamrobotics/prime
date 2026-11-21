<script lang="ts">
	import { Chart } from '../chart.ts';

	let { part, isInChart = true }: { part: string; isInChart?: boolean } = $props();
</script>

{#snippet child()}
	{#if part === 'Line'}
		<Chart.Line name="cell-01" points={[]} />
	{:else if part === 'XAxis'}
		<Chart.XAxis />
	{:else if part === 'YAxis'}
		<Chart.YAxis />
	{:else if part === 'Grid'}
		<Chart.Grid />
	{:else if part === 'Tooltip'}
		<Chart.Tooltip />
	{/if}
{/snippet}

{#if isInChart}
	<Chart aria-label="Readings">
		{@render child()}
	</Chart>
{:else}
	{@render child()}
{/if}
