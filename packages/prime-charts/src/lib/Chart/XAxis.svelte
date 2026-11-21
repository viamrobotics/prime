<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import type { ClassValue } from 'svelte/elements';
	import { SvelteMap } from 'svelte/reactivity';
	import { scaleTime } from 'd3-scale';
	import { useChart, usePlot, usePlotContext, type ChartLayer } from './context.svelte.ts';
	import { edgeOverhang, xTickCount } from './ticks.ts';

	interface Props {
		/** Formats each tick label. Defaults to the time scale's own format. */
		format?: (value: Date) => string;
		/** Lands on the label row. Its border box height, to the next whole pixel, plus the gap after the ticks, counts toward the plot's bottom gutter, and the gutter is the larger of that and what the other parts reserve. A margin does not count. */
		class?: ClassValue;
	}

	let { format, class: className }: Props = $props();

	const TICK_SIZE = 6;

	const plotContext = usePlotContext('Chart.XAxis');
	const chart = useChart();
	const plot = usePlot();

	let rowBox = $state<readonly ResizeObserverSize[]>();
	const labelWidths = new SvelteMap<number, number>();

	const rowHeight = $derived(rowBox?.[0] ? Math.ceil(rowBox[0].blockSize) + TICK_SIZE : 0);

	const labelLayer: ChartLayer = {
		kind: 'html',
		draw: labels,
		padding: {
			get bottom() {
				return rowHeight;
			},
			get left() {
				return overhang.left;
			},
			get right() {
				return overhang.right;
			}
		}
	};
	plotContext.addLayer({ kind: 'svg', draw: axis });
	plotContext.addLayer(labelLayer);
	chart.setAxisFormat('x', () => format);

	const otherPadding = (side: 'left' | 'right') =>
		Math.max(
			0,
			...plotContext.layers
				.filter((layer) => layer !== labelLayer)
				.map((layer) => layer.padding?.[side] ?? 0)
		);
	const otherLeft = $derived(otherPadding('left'));
	const otherRight = $derived(otherPadding('right'));

	// The ticks and their places come from the domain and the room the other parts leave, never
	// from the drawing width, which the overhang narrows.
	const count = $derived(xTickCount(plot.containerWidth - otherLeft - otherRight));
	const unitScale = $derived(scaleTime().domain(plotContext.xWindow.domain).range([0, 1]));
	const ticks = $derived(unitScale.ticks(count));
	const label = $derived(format ?? unitScale.tickFormat(count));

	const edgeLabel = (tick: Date) => ({
		fraction: unitScale(tick),
		width: labelWidths.get(tick.getTime()) ?? 0
	});

	const overhang = $derived.by(() => {
		const first = ticks[0];
		const last = ticks.at(-1);
		if (!first || !last) return { left: 0, right: 0 };
		return edgeOverhang({
			containerWidth: plot.containerWidth,
			left: otherLeft,
			right: otherRight,
			first: edgeLabel(first),
			last: edgeLabel(last)
		});
	});

	// Read once on attach as well, so a new edge label's width lands in the flush that adds it.
	const measureLabel =
		(time: number): Attachment<HTMLElement> =>
		(node) => {
			const record = () => labelWidths.set(time, node.getBoundingClientRect().width);
			record();
			const observer = new ResizeObserver(record);
			observer.observe(node);
			return () => {
				observer.disconnect();
				labelWidths.delete(time);
			};
		};
</script>

{#snippet axis()}
	<g transform="translate(0, {plot.height})">
		<line x1="0" x2={plot.width} class="stroke-chart-axis" />
		{#each ticks as tick (tick.getTime())}
			<line
				x1={plot.xScale(tick)}
				x2={plot.xScale(tick)}
				y2={TICK_SIZE}
				class="stroke-chart-axis"
			/>
		{/each}
	</g>
{/snippet}

{#snippet labels()}
	<!-- One level deeper than the y label column, so a y gutter change that resizes this row is
	delivered in the same ResizeObserver pass. -->
	<div class="contents text-xs text-chart-axis-label">
		<div class="absolute top-full left-0 w-max" style:padding-top="{TICK_SIZE}px">
			<div class={['grid', className]} bind:borderBoxSize={rowBox}>
				{#each ticks as tick (tick.getTime())}
					<span
						class="col-start-1 row-start-1 [justify-self:left] whitespace-nowrap"
						style:transform="translateX(calc({plot.xScale(tick)}px - 50%))"
						{@attach measureLabel(tick.getTime())}
					>
						{label(tick)}
					</span>
				{/each}
			</div>
		</div>
	</div>
{/snippet}
