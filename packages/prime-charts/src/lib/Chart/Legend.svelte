<!--
@component
One toggle button per series, with its color, name, unit and loading mark. Pressing a button toggles the series' `hidden`, and `aria-pressed` is true while the series shows. Place it inside `Chart`, before or after [`Chart.Plot`](./Plot.svelte), in the layout you write.
-->
<script lang="ts">
	import type { ClassValue, HTMLAttributes } from 'svelte/elements';
	import { assertOutsidePlot, useChart } from './context.svelte.ts';
	import { seriesLabel } from './formats.ts';

	interface Props extends HTMLAttributes<HTMLUListElement> {
		/** Lands on the legend's list, a wrapping row of the series. */
		class?: ClassValue;
	}

	let { class: className, ...rest }: Props = $props();

	const loadingIdPrefix = $props.id();

	assertOutsidePlot('Chart.Legend');
	const chart = useChart('Chart.Legend');
</script>

<!-- role="list" restores list semantics that Safari drops under list-style: none. -->
<ul
	{...rest}
	role="list"
	data-part="legend"
	aria-label="Shown series"
	class={['flex flex-wrap gap-x-3', className]}
>
	{#each chart.series as series, index (series)}
		<li class="flex items-center">
			<button
				type="button"
				aria-pressed={!series.hidden}
				aria-describedby={series.loading ? `${loadingIdPrefix}-loading-${index}` : undefined}
				data-part="legend-item"
				class={[
					'inline-flex min-h-6 min-w-6 cursor-pointer items-center gap-1.5 rounded-sm px-1 text-xs focus-ring',
					series.hidden ? 'text-subtle-2 line-through' : 'text-default'
				]}
				onclick={() => (series.hidden = !series.hidden)}
			>
				<span
					data-part="legend-swatch"
					aria-hidden="true"
					class="size-3 shrink-0 rounded-sm border-2"
					style:border-color={series.color}
					style:background-color={series.hidden ? 'transparent' : series.color}
				></span>
				<span>{seriesLabel(series)}</span>
				{#if series.loading}
					<span
						data-part="legend-loading"
						aria-hidden="true"
						class="size-3 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
					></span>
				{/if}
			</button>
			{#if series.loading}
				<span id="{loadingIdPrefix}-loading-{index}" class="sr-only">Loading</span>
			{/if}
		</li>
	{/each}
</ul>
