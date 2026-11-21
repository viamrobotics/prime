<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	import { useChart, usePlot, usePlotContext } from './context.svelte.ts';
	import { yTickCount } from './ticks.ts';

	interface Props {
		/** Formats each tick label. A consumer whose series share a unit adds it here. */
		format?: (value: number) => string;
		/** Lands on the label column. Its border box width, to the next whole pixel, plus the gap after the ticks, counts toward the plot's left gutter, and the gutter is the larger of that and what the other parts reserve. A margin does not count. */
		class?: ClassValue;
	}

	let { format, class: className }: Props = $props();

	const TICK_SIZE = 6;
	const TICK_LABEL_SPACE = 4;
	const LABEL_GAP = TICK_SIZE + TICK_LABEL_SPACE;

	const plotContext = usePlotContext('Chart.YAxis');
	const chart = useChart();
	const plot = usePlot();

	let column = $state<HTMLElement>();
	let columnBox = $state<readonly ResizeObserverSize[]>();
	const contentTop = $derived.by(() => {
		if (!column || !columnBox) return 0;
		const style = getComputedStyle(column);
		return parseFloat(style.paddingTop) + parseFloat(style.borderTopWidth);
	});
	const columnWidth = $derived(columnBox?.[0] ? Math.ceil(columnBox[0].inlineSize) + LABEL_GAP : 0);
	const halfLabel = $derived(columnBox?.[0] ? Math.ceil(columnBox[0].blockSize / 2) : 0);

	plotContext.addLayer({ kind: 'svg', draw: axis });
	plotContext.addLayer({
		kind: 'html',
		draw: labels,
		padding: {
			get left() {
				return columnWidth;
			},
			get top() {
				return halfLabel;
			},
			get bottom() {
				return halfLabel;
			}
		}
	});
	chart.setAxisFormat('y', () => format);

	const count = $derived(yTickCount(plot.height));
	const ticks = $derived(plot.yScale.ticks(count));
	const label = $derived(format ?? plot.yScale.tickFormat(count));
</script>

{#snippet axis()}
	<g>
		<line y1="0" y2={plot.height} class="stroke-chart-axis" />
		{#each ticks as tick (tick)}
			<line
				x2={-TICK_SIZE}
				y1={plot.yScale(tick)}
				y2={plot.yScale(tick)}
				class="stroke-chart-axis"
			/>
		{/each}
	</g>
{/snippet}

{#snippet labels()}
	<div
		class="absolute top-0 right-full w-max text-xs text-chart-axis-label"
		style:padding-right="{LABEL_GAP}px"
	>
		<div class={['grid', className]} bind:this={column} bind:borderBoxSize={columnBox}>
			{#each ticks as tick (tick)}
				<span
					class="col-start-1 row-start-1 [justify-self:right] whitespace-nowrap"
					style:transform="translateY(calc({plot.yScale(tick)}px - 50% - {contentTop}px))"
				>
					{label(tick)}
				</span>
			{/each}
		</div>
	</div>
{/snippet}
