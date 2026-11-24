<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import type { ChartPoint } from '../../point.ts';
	import { Chart } from '../../chart.ts';

	interface Series {
		name: string;
		points: ChartPoint[];
		color?: ComponentProps<typeof Chart.Line>['color'];
		hidden?: boolean;
	}

	let {
		series,
		width,
		height,
		isHiddenBound = false
	}: { series: Series[]; width: number; height: number; isHiddenBound?: boolean } = $props();

	let boundHidden = $state<boolean | undefined>();
</script>

<div style:width="{width}px" style:height="{height}px" data-bound-hidden={String(boundHidden)}>
	<Chart aria-label="Readings" class="flex size-full flex-col">
		{#if isHiddenBound}
			<Chart.Legend />
		{/if}
		<Chart.Plot class="min-h-0 flex-1">
			{#each series as entry (entry.name)}
				{#if isHiddenBound}
					<Chart.Line name={entry.name} points={entry.points} bind:hidden={boundHidden} />
				{:else}
					<Chart.Line
						name={entry.name}
						points={entry.points}
						color={entry.color}
						hidden={entry.hidden}
					/>
				{/if}
			{/each}
		</Chart.Plot>
	</Chart>
</div>
