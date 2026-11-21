<script lang="ts">
	import type { ClassValue, HTMLAttributes } from 'svelte/elements';
	import { useChart, usePlot, usePlotContext, type ChartSeries } from './context.svelte.ts';
	import { defaultTimeFormat, defaultValueFormat } from './formats.ts';
	import {
		firstPoint,
		isAvailable,
		isNavigationKey,
		nearestPoint,
		step,
		type ActivePoint
	} from './navigation.ts';

	interface Props {
		/** Formats the time. Defaults to the x axis's `format`, then a full date and time with seconds. */
		xFormat?: (value: Date) => string;
		/** Formats the value. Defaults to the y axis's `format`, then `Intl.NumberFormat`. */
		yFormat?: (value: number) => string;
		/** Lands on the readout. */
		class?: ClassValue;
	}

	let { xFormat, yFormat, class: className }: Props = $props();

	const POINT_GAP = 12;

	const plotContext = usePlotContext('Chart.Tooltip');
	const chart = useChart();
	const plot = usePlot();
	const id = $props.id();
	const instructionsId = `${id}-instructions`;

	let chosen = $state.raw<ActivePoint<ChartSeries>>();
	let isShown = $state(false);
	let isAnnounced = $state(false);
	let readoutWidth = $state(0);
	let readoutHeight = $state(0);

	const active = $derived(
		chosen && isAvailable(chart.series, chosen, plotContext.xWindow) ? chosen : undefined
	);
	const isInteractive = $derived(firstPoint(chart.series, plotContext.xWindow) !== undefined);

	const isVisible = $derived(isShown && isInteractive);

	// Losing the tab stop also drops the blur and pointer-leave handlers that would hide the reading, so it is reset here.
	$effect(() => {
		if (!isInteractive) hide();
	});

	const formatTime = $derived(xFormat ?? chart.axisFormats.x ?? defaultTimeFormat);
	const formatValue = $derived(yFormat ?? chart.axisFormats.y ?? defaultValueFormat);

	const reading = $derived.by(() => {
		const point = active?.series.points[active.index];
		if (!active || !point || point.y === null) return undefined;
		const time = chart.xToNumber(point.x);
		const value = formatValue(point.y);
		return {
			series: active.series,
			x: plot.xScale(time),
			y: plot.yScale(point.y),
			time: formatTime(new Date(time)),
			value: active.series.unit ? `${value} ${active.series.unit}` : value
		};
	});

	const announcement = $derived(
		reading && isVisible && isAnnounced
			? `${reading.series.name}, ${reading.time}, ${reading.value}`
			: ''
	);

	const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));

	// Right of and above the point, flipped to the other side where it would leave the plot.
	const placement = $derived.by(() => {
		if (!reading) return undefined;
		const right = reading.x + POINT_GAP;
		const left = right + readoutWidth > plot.width ? reading.x - POINT_GAP - readoutWidth : right;
		const above = reading.y - POINT_GAP - readoutHeight;
		const top = above < 0 ? reading.y + POINT_GAP : above;
		return {
			left: clamp(left, 0, plot.width - readoutWidth),
			top: clamp(top, 0, plot.height - readoutHeight)
		};
	});

	const show = (point: ActivePoint<ChartSeries> | undefined, isFromKeyboard: boolean) => {
		if (!point) return;
		chosen = point;
		isShown = true;
		isAnnounced = isFromKeyboard;
	};

	const hide = () => {
		isShown = false;
		isAnnounced = false;
	};

	const onkeydown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			hide();
			return;
		}
		if (!isNavigationKey(event.key)) return;
		event.preventDefault();
		show(
			active
				? step(chart.series, active, event.key, plotContext.xWindow)
				: firstPoint(chart.series, plotContext.xWindow),
			true
		);
	};

	const onpointermove = (event: PointerEvent) => {
		const position = plot.pointer(event);
		show(
			nearestPoint(chart.series, position, { x: plot.xScale, y: plot.yScale }, plotContext.xWindow),
			false
		);
	};

	const attributes: HTMLAttributes<HTMLDivElement> = {
		role: 'application',
		tabindex: 0,
		'aria-describedby': instructionsId,
		onfocus: () => show(active ?? firstPoint(chart.series, plotContext.xWindow), true),
		onblur: hide,
		onkeydown,
		onpointermove,
		onpointerleave: hide
	};

	plotContext.setAttributes(() => (isInteractive ? attributes : {}));
	plotContext.addLayer({ kind: 'html', draw: readout });
</script>

{#snippet readout()}
	{#if isVisible && reading && placement}
		<span
			data-part="tooltip-marker"
			aria-hidden="true"
			class="absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
			style:left="{reading.x}px"
			style:top="{reading.y}px"
			style:background-color={reading.series.color}
		></span>
		<div
			data-part="tooltip"
			aria-hidden="true"
			bind:clientWidth={readoutWidth}
			bind:clientHeight={readoutHeight}
			class={['absolute w-max rounded-sm bg-gray-9 px-2 py-1 text-xs text-white', className]}
			style:left="{placement.left}px"
			style:top="{placement.top}px"
		>
			<div class="flex items-center gap-1.5">
				<span
					data-part="tooltip-swatch"
					class="size-2.5 shrink-0 rounded-sm"
					style:background-color={reading.series.color}
				></span>
				<span>{reading.series.name}</span>
			</div>
			<div>{reading.time}</div>
			<div class="font-semibold">{reading.value}</div>
		</div>
	{/if}
{/snippet}

<div role="status" aria-live="polite" aria-atomic="true" class="sr-only">{announcement}</div>
{#if isInteractive}
	<p id={instructionsId} class="sr-only">
		Left and right arrows move between points. Up and down arrows move between series. Home and End
		go to the first and last point. Page Up and Page Down move by a tenth of the series. Escape
		hides the tooltip.
	</p>
{/if}
