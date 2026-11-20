<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	import { useChart, usePlot } from './context.svelte.ts';
	import { yTickCount } from './ticks.ts';

	interface Props {
		/** Formats each tick label. A consumer whose series share a unit adds it here. */
		format?: (value: number) => string;
		class?: ClassValue;
	}

	let { format, class: className }: Props = $props();

	const TICK_SIZE = 6;
	const LABEL_OFFSET = 10;
	// Centers a label on its tick line.
	const LABEL_BASELINE_SHIFT = '0.32em';
	const LEFT_PADDING = 44;

	const chart = useChart();
	const plot = usePlot();

	chart.addLayer({ kind: 'svg', draw, padding: { left: LEFT_PADDING } });
	chart.setAxisFormat('y', () => format);

	const count = $derived(yTickCount(plot.height));
	const ticks = $derived(plot.yScale.ticks(count));
	const label = $derived(format ?? plot.yScale.tickFormat(count));
</script>

{#snippet draw()}
	<g class={className}>
		<line y1="0" y2={plot.height} class="stroke-chart-axis" />
		{#each ticks as tick (tick)}
			<g transform="translate(0, {plot.yScale(tick)})">
				<line x2={-TICK_SIZE} class="stroke-chart-axis" />
				<text
					x={-LABEL_OFFSET}
					dy={LABEL_BASELINE_SHIFT}
					text-anchor="end"
					class="fill-chart-axis-label text-xs"
				>
					{label(tick)}
				</text>
			</g>
		{/each}
	</g>
{/snippet}
