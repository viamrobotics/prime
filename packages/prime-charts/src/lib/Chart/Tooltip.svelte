<script lang="ts">
	import type { ClassValue, HTMLAttributes } from 'svelte/elements';
	import { useChart, usePlot, type ChartSeries } from './context.svelte.ts';
	import { timeValue } from './domain.ts';
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
	const TIME_FORMAT = new Intl.DateTimeFormat(undefined, {
		dateStyle: 'medium',
		timeStyle: 'medium'
	});
	const VALUE_FORMAT = new Intl.NumberFormat();

	const chart = useChart();
	const plot = usePlot();
	const id = $props.id();
	const instructionsId = `${id}-instructions`;

	let chosen = $state.raw<ActivePoint<ChartSeries>>();
	let isShown = $state(false);
	let isAnnounced = $state(false);
	let readoutWidth = $state(0);
	let readoutHeight = $state(0);

	const active = $derived(chosen && isAvailable(chart.series, chosen) ? chosen : undefined);
	const isInteractive = $derived(firstPoint(chart.series) !== undefined);

	const formatTime = $derived(
		xFormat ?? chart.axisFormats.x ?? ((value: Date) => TIME_FORMAT.format(value))
	);
	const formatValue = $derived(
		yFormat ?? chart.axisFormats.y ?? ((value: number) => VALUE_FORMAT.format(value))
	);

	const reading = $derived.by(() => {
		const point = active?.series.points[active.index];
		if (!active || !point || point.y === null) return undefined;
		const time = timeValue(point.x);
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
		reading && isShown && isAnnounced
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
		show(active ? step(chart.series, active, event.key) : firstPoint(chart.series), true);
	};

	const onpointermove = (event: PointerEvent) => {
		const position = plot.pointer(event);
		show(nearestPoint(chart.series, position, { x: plot.xScale, y: plot.yScale }), false);
	};

	const attributes: HTMLAttributes<HTMLDivElement> = {
		role: 'application',
		tabindex: 0,
		'aria-describedby': instructionsId,
		onfocus: () => show(active ?? firstPoint(chart.series), true),
		onblur: hide,
		onkeydown,
		onpointermove,
		onpointerleave: hide
	};

	chart.setPlotAttributes(() => (isInteractive ? attributes : {}));
	chart.addLayer({ kind: 'html', draw: readout });
	chart.addLayer({ kind: 'below', draw: announcer });
</script>

{#snippet readout()}
	{#if isShown && reading && placement}
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

{#snippet announcer()}
	<div role="status" aria-live="polite" aria-atomic="true" class="sr-only">{announcement}</div>
	{#if isInteractive}
		<p id={instructionsId} class="sr-only">
			Left and right arrows move between points. Up and down arrows move between series. Home and
			End go to the first and last point. Page Up and Page Down move by a tenth of the series.
			Escape hides the tooltip.
		</p>
	{/if}
{/snippet}
