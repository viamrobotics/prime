<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	interface Props extends SVGAttributes<SVGElement> {
		/** Layers drawn in order, each a path `d` on a 24×24 viewBox with an optional opacity. */
		paths: { d: string; opacity?: number }[];
	}

	const { paths, class: extraClasses, ...restProps }: Props = $props();

	const isLabeled = $derived(Boolean(restProps['aria-label'] || restProps['aria-labelledby']));
</script>

<svg
	role={isLabeled ? 'img' : undefined}
	aria-hidden={isLabeled ? undefined : true}
	{...restProps}
	viewBox="0 0 24 24"
	focusable="false"
	fill="currentColor"
	class={extraClasses}
>
	{#each paths as { d, opacity } (d)}
		<path {d} {opacity} fill-rule="evenodd" />
	{/each}
</svg>
