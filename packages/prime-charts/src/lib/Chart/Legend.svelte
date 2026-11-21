<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	import { assertOutsidePlot, useChart } from './context.svelte.ts';
	import { seriesLabel } from './formats.ts';

	interface Props {
		/** Lands on the legend's outer element. */
		class?: ClassValue;
	}

	let { class: className }: Props = $props();

	assertOutsidePlot('Chart.Legend');
	const chart = useChart();
</script>

<!-- role="list" restores list semantics that Safari drops under list-style: none. -->
<ul role="list" data-part="legend" class={['flex flex-wrap gap-x-3', className]}>
	{#each chart.series as series (series)}
		<li class="flex items-center">
			<button
				type="button"
				aria-pressed={!series.hidden}
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
				<span class="sr-only">Loading</span>
			{/if}
		</li>
	{/each}
</ul>
