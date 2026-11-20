<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	import { useChart, usePlot } from './context.svelte.ts';
	import { yTickCount } from './ticks.ts';

	interface Props {
		class?: ClassValue;
	}

	let { class: className }: Props = $props();

	const chart = useChart();
	const plot = usePlot();

	chart.addLayer({ kind: 'svg', draw });

	const ticks = $derived(plot.yScale.ticks(yTickCount(plot.height)));
</script>

{#snippet draw()}
	<g class={className}>
		{#each ticks as tick (tick)}
			<line
				x2={plot.width}
				y1={plot.yScale(tick)}
				y2={plot.yScale(tick)}
				class="stroke-chart-grid"
			/>
		{/each}
	</g>
{/snippet}
