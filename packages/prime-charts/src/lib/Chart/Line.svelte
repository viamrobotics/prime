<script lang="ts" generics="TXValue extends ChartXValue = Date">
	import type { ClassValue } from 'svelte/elements';
	import type { ScaleLinear, ScaleTime } from 'd3-scale';
	import { line } from 'd3-shape';
	import { getLayerCakeContext } from 'layercake';
	import { timeValue } from './domain.ts';
	import type { ChartPoint, ChartXValue } from './point.ts';
	import { useSeries } from './series.svelte.ts';

	interface Props {
		/** The series to draw, in x order. */
		points: ChartPoint<TXValue>[];
		class?: ClassValue;
	}

	let { points, class: className }: Props = $props();

	const series = useSeries();
	const layerCake = getLayerCakeContext<{
		x: ScaleTime<number, number>;
		y: ScaleLinear<number, number>;
	}>();

	$effect(() => series.add(() => points));

	const path = $derived.by(() => {
		if (points.length === 0) return undefined;
		const draw = line<ChartPoint<TXValue>>()
			.defined((point) => Number.isFinite(timeValue(point.x)) && Number.isFinite(point.y))
			.x((point) => layerCake.xScale(timeValue(point.x)))
			.y((point) => layerCake.yScale(point.y));
		return draw(points) ?? undefined;
	});
</script>

{#if path}
	<path d={path} fill="none" class={['stroke-info-dark stroke-2', className]} />
{/if}
