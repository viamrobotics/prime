<script lang="ts">
	import { Chart } from '../chart.ts';

	let {
		mode,
		key = 0,
		isFirst = true
	}: { mode: 'key' | 'if'; key?: number; isFirst?: boolean } = $props();

	const points = [
		{ x: new Date('2026-01-01T00:00:00Z'), y: 2 },
		{ x: new Date('2026-01-01T00:01:00Z'), y: 8 }
	];
</script>

{#snippet plot()}
	<Chart.Plot class="h-40 w-80">
		<Chart.Line name="cell-01" {points} />
	</Chart.Plot>
{/snippet}

<Chart aria-label="Readings">
	{#if mode === 'key'}
		{#key key}
			{@render plot()}
		{/key}
	{:else if isFirst}
		{@render plot()}
	{:else}
		{@render plot()}
	{/if}
</Chart>
