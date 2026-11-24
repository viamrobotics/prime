<script lang="ts">
	import { Chart } from '../../chart.ts';

	type Part = 'Line' | 'XAxis' | 'YAxis' | 'Grid' | 'Tooltip' | 'Legend' | 'Table';

	let { part, placement }: { part: Part; placement: 'no-chart' | 'chart' | 'plot' } = $props();
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
	{:else if part === 'Legend'}
		<Chart.Legend />
	{:else if part === 'Table'}
		<Chart.Table />
	{/if}
{/snippet}

{#if placement === 'no-chart'}
	{@render child()}
{:else if placement === 'chart'}
	<Chart aria-label="Readings">
		{@render child()}
	</Chart>
{:else}
	<Chart aria-label="Readings">
		<Chart.Plot>
			{@render child()}
		</Chart.Plot>
	</Chart>
{/if}
