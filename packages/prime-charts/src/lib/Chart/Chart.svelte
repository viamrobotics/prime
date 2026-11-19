<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { scaleLinear, scaleTime } from 'd3-scale';
	import { LayerCake, Svg } from 'layercake';
	import { extent, timeValue } from './domain.ts';
	import type { ChartScale } from './scale.ts';
	import { provideSeries } from './series.svelte.ts';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** The kind of x scale. Defaults to `'time'`. */
		x?: ChartScale;
		/** The parts to draw, such as `Chart.Line`. */
		children?: Snippet;
	}

	let { x = 'time', children, class: className, ...rest }: Props = $props();

	const X_SCALES = {
		time: scaleTime
	} satisfies Record<ChartScale, () => unknown>;

	const series = provideSeries();
	const xScale = $derived(X_SCALES[x]());
	const yScale = scaleLinear();
	const xDomain = $derived(extent(series.points.map((point) => timeValue(point.x))));
	const yDomain = $derived(extent(series.points.map((point) => point.y)));
</script>

<div role="figure" {...rest} class={['size-full', className]}>
	<LayerCake {xScale} {yScale} {xDomain} {yDomain}>
		<Svg>
			{@render children?.()}
		</Svg>
	</LayerCake>
</div>
