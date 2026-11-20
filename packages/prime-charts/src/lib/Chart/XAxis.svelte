<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	import { useChart, usePlot } from './context.svelte.ts';
	import { xTickCount } from './ticks.ts';

	interface Props {
		/** Formats each tick label. Defaults to the time scale's own format. */
		format?: (value: Date) => string;
		class?: ClassValue;
	}

	let { format, class: className }: Props = $props();

	const TICK_SIZE = 6;
	const LABEL_OFFSET = 18;
	const BOTTOM_PADDING = 28;

	const chart = useChart();
	const plot = usePlot();

	chart.addLayer({ kind: 'svg', draw, padding: { bottom: BOTTOM_PADDING } });
	chart.setAxisFormat('x', () => format);

	const count = $derived(xTickCount(plot.width));
	const ticks = $derived(plot.xScale.ticks(count));
	const label = $derived(format ?? plot.xScale.tickFormat(count));
</script>

{#snippet draw()}
	<g transform="translate(0, {plot.height})" class={className}>
		<line x1="0" x2={plot.width} class="stroke-chart-axis" />
		{#each ticks as tick (tick.getTime())}
			<g transform="translate({plot.xScale(tick)}, 0)">
				<line y2={TICK_SIZE} class="stroke-chart-axis" />
				<text y={LABEL_OFFSET} text-anchor="middle" class="fill-chart-axis-label text-xs">
					{label(tick)}
				</text>
			</g>
		{/each}
	</g>
{/snippet}
